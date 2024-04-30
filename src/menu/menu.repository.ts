import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Menu } from './menu.entity';

@Injectable()
export class MenuRepository extends Repository<Menu> {
  constructor(private dataSource: DataSource) {
    super(Menu, dataSource.createEntityManager());
  }
}
