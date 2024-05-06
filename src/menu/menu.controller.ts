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
import { UpdateMenuDto } from 'src/dto/update-menu.dto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { CreateMenuDto } from 'src/dto/create-menu.dto';

@ApiTags('menu')
@Controller('menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Post('/:categoryId')
  @ApiBearerAuth('accessToken')
  @ApiOperation({
    summary: '메뉴 생성',
  })
  @ApiBody({ type: CreateMenuDto })
  @ApiCreatedResponse({ description: '메뉴를 등록하였습니다.' })
  @ApiUnauthorizedResponse({
    description: '사장님만 사용할 수 있는 API입니다.',
  })
  @ApiNotFoundResponse({ description: '해당 카테고리는 존재하지않습니다.' })
  @ApiConflictResponse({ description: '해당 메뉴는 이미 존재합니다.' })
  createMenu(
    @Req() req: Request,
    @Param('categoryId') categoryId: number,
    @Body() data: CreateMenuDto,
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
  @ApiOperation({
    summary: '카테고리별 메뉴 조회',
  })
  @ApiNotFoundResponse({ description: '해당 카테고리는 존재하지않습니다.' })
  getMenuByCategoryId(@Param('categoryId') categoryId: number) {
    return this.menuService.getMenuByCategoryId(categoryId);
  }

  @Get('/:categoryId/:menuId')
  @ApiOperation({
    summary: '카테고리별 메뉴 상세 조회',
  })
  @ApiNotFoundResponse({ description: '해당 카테고리는 존재하지않습니다.' })
  async getMenuByMenuId(
    @Param('categoryId') categoryId: number,
    @Param('menuId') menuId: number,
  ) {
    return await this.menuService.getMenuByMenuId(categoryId, menuId);
  }

  @Patch('/:categoryId/:menuId')
  @ApiBearerAuth('accessToken')
  @ApiOperation({ summary: '메뉴 수정' })
  @ApiBody({ type: UpdateMenuDto })
  @ApiOkResponse({ description: '메뉴가 수정되었습니다.' })
  @ApiUnauthorizedResponse({
    description: '사장님만 사용할 수 있는 API입니다.',
  })
  @ApiNotFoundResponse({ description: '해당 카테고리는 존재하지않습니다.' })
  @ApiConflictResponse({ description: '해당 메뉴는 이미 존재합니다.' })
  updateMenu(
    @Req() req: Request,
    @Param() paramData,
    @Body() bodyData: UpdateMenuDto,
  ) {
    return this.menuService.updateMenu(
      req,
      paramData.categoryId,
      paramData.menuId,
      bodyData.name,
      bodyData.description,
      bodyData.price,
      bodyData.menuOrder,
      bodyData.status,
    );
  }

  @Delete('/:categoryId/:menuId')
  @ApiBearerAuth('accessToken')
  @ApiOperation({ summary: '메뉴 삭제' })
  @ApiOkResponse({ description: '메뉴가 삭제되었습니다.' })
  @ApiUnauthorizedResponse({
    description: '사장님만 사용할 수 있는 API입니다.',
  })
  @ApiNotFoundResponse({ description: '해당 카테고리는 존재하지않습니다.' })
  @ApiConflictResponse({ description: '해당 메뉴는 이미 존재합니다.' })
  deleteMenu(
    @Req() req: Request,
    @Param('categoryId') categoryId: number,
    @Param('menuId') menuId: number,
  ) {
    return this.menuService.deleteMenu(req, categoryId, menuId);
  }
}
