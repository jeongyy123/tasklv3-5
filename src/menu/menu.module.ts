import { Module } from '@nestjs/common';
import { MenuController } from './menu.controller';
import { MenuService } from './menu.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Menu } from './menu.entity';
import { CategoryRepository } from 'src/category/category.repository';
import { Category } from 'src/category/category.entity';
import { MenuRepository } from './menu.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Menu, Category])],
  controllers: [MenuController],
  providers: [MenuService, MenuRepository, CategoryRepository],
})
export class MenuModule {}
