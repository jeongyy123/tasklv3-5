import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
} from '@nestjs/common';
import { MenuService } from './menu.service';

@Controller('menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Post('/:categoryId')
  createMenu(
    @Req() req: Request,
    @Param('categoryId') categoryId: number,
    @Body() data,
  ) {
    return this.menuService.createMenu(
      req,
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
  updateMenu(@Req() req: Request, @Param() paramData, @Body() bodyData) {
    return this.menuService.updateMenu(
      req,
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
    @Req() req: Request,
    @Param('categoryId') categoryId: number,
    @Param('menuId') menuId: number,
  ) {
    return this.menuService.deleteMenu(req, categoryId, menuId);
  }
}
