import { Menu } from 'src/menu/menu.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ schema: 'restaurant', name: 'category' })
export class Category {
  @PrimaryGeneratedColumn({ type: 'int', name: 'categoryId' })
  categoryId: number;

  @Column('varchar', { length: 10 })
  name: string;

  @Column('int')
  order: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date | null;

  @OneToMany(() => Menu, (menu) => menu.category)
  menus: Menu[];
}
