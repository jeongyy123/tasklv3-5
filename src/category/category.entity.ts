import { Menu } from 'src/menu/menu.entity';
import { User } from 'src/user/user.entity';
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

@Entity({ schema: 'restaurant', name: 'category' })
export class Category {
  @PrimaryGeneratedColumn({ type: 'int', name: 'categoryId' })
  categoryId: number;

  @Column('varchar', { length: 10 })
  name: string;

  @Column('int')
  categoryOrder: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date | null;

  //menu 연결
  @OneToMany(() => Menu, (menu) => menu.category)
  menus: Menu[];

  //user 연결
  @ManyToOne(() => User, (user) => user.categories)
  @JoinColumn({ name: 'userId', referencedColumnName: 'userId' })
  user: User;
}
