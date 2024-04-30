import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { MenuService } from './menu.service';

@Controller('menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Post('/:categoryId')
  createMenu(@Param('categoryId') categoryId: number, @Body() data) {
    this.menuService.createMenu(
      categoryId,
      data.name,
      data.description,
      data.image,
      data.price,
    );
  }

  @Get('/:categoryId')
  getMenuByCategoryId(@Param('categoryId') categoryId: number) {
    return this.menuService.getMenuByCategoryId(categoryId);
  }

  @Get('/:categoryId/:menuId')
  async getMenuByMenuId(
    @Param('categoryId') categoryId: number,
    @Param('menuId') menuId: number,
  ) {
    return await this.menuService.getMenuByMenuId(categoryId, menuId);
  }

  @Patch('/:categoryId/:menuId')
  updateMenu(@Param() paramData, @Body() bodyData) {
    return this.menuService.updateMenu(
      paramData.categoryId,
      paramData.menuId,
      bodyData.name,
      bodyData.description,
      bodyData.price,
      bodyData.order,
      bodyData.status,
    );
  }

  @Delete('/:categoryId/:menuId')
  deleteMenu(
    @Param('categoryId') categoryId: number,
    @Param('menuId') menuId: number,
  ) {
    return this.menuService.deleteMenu(categoryId, menuId);
  }
}
