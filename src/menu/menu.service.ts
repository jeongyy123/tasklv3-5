import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Menu } from './menu.entity';
import { MenuRepository } from './menu.repository';
import { CategoryRepository } from 'src/category/category.repository';
import { MenuStatus } from './menu-status.enum';
import { UserType } from 'src/user/user-type.enum';

@Injectable()
export class MenuService {
  constructor(
    @InjectRepository(Menu)
    private readonly menuReposioty: MenuRepository,
    private readonly categoryRepository: CategoryRepository,
  ) {}

  /* 메뉴 등록 */
  async createMenu(
    req: Request,
    categoryId: number,
    name: string,
    description: string,
    image: string,
    price: number,
  ) {
    if (req['user'].userType !== UserType.OWNER) {
      throw new UnauthorizedException(`사장님만 사용할 수 있는 API입니다.`);
    }

    const category = await this.checkCategory(categoryId);

    await this.checkMenu(name);

    const menu = new Menu();
    menu.category = category;
    menu.name = name;
    menu.description = description;
    menu.image = image;
    menu.price = price;
    menu.status = MenuStatus.FOR_SALE;

    const foundMenu = await this.menuReposioty.findOne({
      where: { deletedAt: null },
      order: { menuOrder: 'DESC' },
    });

    if (!foundMenu) {
      menu.menuOrder = 1;
    } else {
      menu.menuOrder = foundMenu.menuOrder + 1;
    }

    await this.menuReposioty.save(menu);

    return { message: '메뉴를 등록하였습니다.' };
  }

  /* 카테고리별 메뉴 조회 */
  async getMenuByCategoryId(categoryId: number) {
    await this.checkCategory(categoryId);

    return this.menuReposioty.find({
      where: { category: { categoryId }, deletedAt: null },
    });
  }

  /* 메뉴 상세 조회*/
  async getMenuByMenuId(categoryId: number, menuId: number) {
    await this.checkCategory(categoryId);

    return await this.menuReposioty.findOne({
      where: { category: { categoryId }, menuId, deletedAt: null },
    });
  }

  /* 메뉴 수정*/
  async updateMenu(
    req: Request,
    categoryId: number,
    menuId: number,
    name: string,
    description: string,
    price: number,
    menuOrder: number,
    status: MenuStatus,
  ) {
    if (req['user'].userType !== UserType.OWNER) {
      throw new UnauthorizedException(`사장님만 사용할 수 있는 API입니다.`);
    }

    await this.checkCategory(categoryId);

    await this.checkMenu(name);

    const capitalStatus = status.toUpperCase();
    if (
      capitalStatus !== MenuStatus.FOR_SALE &&
      capitalStatus !== MenuStatus.SOLD_OUT
    ) {
      throw new NotFoundException(
        `${MenuStatus.FOR_SALE} 나 ${MenuStatus.SOLD_OUT} 만 작성해주세요.`,
      );
    }

    await this.menuReposioty.update(menuId, {
      name,
      description,
      price,
      menuOrder,
      status: capitalStatus,
    });
    return { message: '메뉴가 수정되었습니다.' };
  }

  /* 메뉴 삭제*/
  async deleteMenu(req: Request, categoryId: number, menuId: number) {
    if (req['user'].userType !== UserType.OWNER) {
      throw new UnauthorizedException(`사장님만 사용할 수 있는 API입니다.`);
    }

    await this.checkCategory(categoryId);

    await this.menuReposioty.softDelete(menuId);

    return { message: '메뉴가 삭제되었습니다.' };
  }

  private async checkCategory(categoryId: number) {
    const category = await this.categoryRepository.findOne({
      where: { categoryId, deletedAt: null },
    });

    if (!category) {
      throw new NotFoundException(`해당 카테고리는 존재하지않습니다.`);
    }

    return category;
  }

  private async checkMenu(menuId) {
    const menu = await this.menuReposioty.findOne({
      where: { menuId, deletedAt: null },
    });

    if (menu) {
      throw new ConflictException(`해당 메뉴는 이미 존재합니다.`);
    }

    return menu;
  }
}
