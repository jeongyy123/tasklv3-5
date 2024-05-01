import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './category.entity';
import { CategoryRepository } from './category.repository';
import { JwtService } from '@nestjs/jwt';
import { UserType } from 'src/user/user-type.enum';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: CategoryRepository,
    private jwtService: JwtService,
  ) {}

  /* 카테고리 등록 */
  async createCategory(req: Request, name: string) {
    if (req['user'].userType !== UserType.OWNER) {
      throw new UnauthorizedException(`사장님만 사용할 수 있는 API입니다.`);
    }

    const findCategoryByName = await this.categoryRepository.findOne({
      where: { name },
    });

    if (findCategoryByName) {
      throw new ConflictException(`${name} 카테고리가 이미 있습니다.`);
    }

    const category = new Category();
    category.name = name;

    const foundCategory = await this.categoryRepository.findOne({
      where: { deletedAt: null },
      order: { order: 'DESC' },
    });

    if (!foundCategory) {
      category.order = 1;
    } else {
      category.order = foundCategory.order + 1;
    }

    await this.categoryRepository.save(category);

    return { message: '카테고리를 등록하였습니다.' };
  }

  /* 카테고리 목록 조회 */
  getCategory() {
    return this.categoryRepository.find();
  }

  /* 카테고리 정보 변경 */
  async updateCategory(
    req: Request,
    categoryId: number,
    name: string,
    order: number,
  ) {
    if (req['user'].userType !== UserType.OWNER) {
      throw new UnauthorizedException(`사장님만 사용할 수 있는 API입니다.`);
    }

    const category = await this.categoryRepository.findOne({
      where: { categoryId, deletedAt: null },
    });

    if (!category) {
      throw new NotFoundException(`해당 카테고리가 존재하지않습니다.`);
    }

    const categoryByName = await this.categoryRepository.findOne({
      where: { name, deletedAt: null },
    });

    if (categoryByName) {
      throw new ConflictException(`${name}를 가진 카테고리가 이미 존재합니다.`);
    }

    await this.categoryRepository.update(categoryId, { name, order });

    return { message: '카테고리 정보를 수정하였습니다.' };
  }

  /* 카테고리 삭제 */
  async deleteCategory(req: Request, categoryId: number) {
    if (req['user'].userType !== UserType.OWNER) {
      throw new UnauthorizedException(`사장님만 사용할 수 있는 API입니다.`);
    }

    const category = await this.categoryRepository.findOne({
      where: { categoryId },
    });

    if (!category) {
      throw new NotFoundException(`해당 카테고리가 존재하지않습니다.`);
    }

    await this.categoryRepository.softDelete(categoryId);

    return { message: '카테고리 정보를 삭제하였습니다.' };
  }
}
