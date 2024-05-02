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
import { OrderType } from './order-type.enum';
import { User } from 'src/user/user.entity';
import { Menu } from 'src/menu/menu.entity';

@Entity({ schema: 'restaurant', name: 'order' })
export class Order {
  @PrimaryGeneratedColumn({ type: 'int', name: 'orderId' })
  orderId: number;

  @Column('int')
  quantity: number;

  @Column()
  orderType: OrderType;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date | null;

  //userId 연결
  @ManyToOne(() => User, (user) => user.orders)
  @JoinColumn({ name: 'userId', referencedColumnName: 'userId' })
  user: User;

  //menuId 연결
  @ManyToOne(() => Menu, (menu) => menu.orders)
  @JoinColumn({ name: 'menuId', referencedColumnName: 'menuId' })
  menu: Menu;
  totalPrice: number;
}
