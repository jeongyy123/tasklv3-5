import { Category } from 'src/category/category.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { MenuStatus } from './menu-status.enum';

@Entity({ schema: 'restaurant', name: 'menu' })
export class Menu {
  @PrimaryGeneratedColumn({ type: 'int', name: 'menuId' })
  menuId: number;

  @Column('varchar', { length: 50 })
  name: string;

  @Column('varchar', { length: 100 })
  description: string;

  @Column('varchar', { length: 300 })
  image: string;

  @Column('int')
  price: number;

  @Column('int')
  order: number;

  @Column()
  status: MenuStatus;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date | null;

  @ManyToOne(() => Category, (category) => category.menus)
  @JoinColumn({ name: 'categoryId', referencedColumnName: 'categoryId' })
  category: Category;
}
