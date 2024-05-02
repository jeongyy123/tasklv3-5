import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserType } from './user-type.enum';
import { Order } from 'src/order/order.entity';
import { Category } from 'src/category/category.entity';
import { Menu } from 'src/menu/menu.entity';

@Entity({ schema: 'restaurant', name: 'user' })
export class User {
  @PrimaryGeneratedColumn({ type: 'int', name: 'userId' })
  userId: number;

  @Column('varchar', { length: 50 })
  nickname: string;

  @Column('varchar', { length: 100 })
  password: string;

  @Column()
  userType: UserType;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date | null;

  //order 연결
  @OneToMany(() => Order, (order) => order.user)
  orders: Order[];

  // category 연결
  @OneToMany(() => Category, (category) => category.user)
  categories: Category[];

  //menu 연결
  @OneToMany(() => Menu, (menu) => menu.user)
  menus: Menu[];
}
