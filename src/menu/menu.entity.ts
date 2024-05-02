import { Category } from 'src/category/category.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { MenuStatus } from './menu-status.enum';
import { Order } from 'src/order/order.entity';
import { User } from 'src/user/user.entity';

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
  menuOrder: number;

  @Column()
  status: MenuStatus;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date | null;

  //category 연결
  @ManyToOne(() => Category, (category) => category.menus)
  @JoinColumn({ name: 'categoryId', referencedColumnName: 'categoryId' })
  category: Category;

  //order 연결
  @OneToMany(() => Order, (order) => order.menu)
  orders: Order[];

  //user 연결
  @ManyToOne(() => User, (user) => user.menus)
  @JoinColumn({ name: 'userId', referencedColumnName: 'userId' })
  user: User;
}
