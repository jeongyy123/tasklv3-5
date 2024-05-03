import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderRepository } from './order.repository';
import { Order } from './order.entity';
import { UserType } from 'src/user/user-type.enum';
import { MenuRepository } from 'src/menu/menu.repository';
import { OrderType } from './order-type.enum';
import { UserRepository } from 'src/user/user.repository';
import { getRepository } from 'typeorm';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: OrderRepository,
    private readonly menuRepository: MenuRepository,
    private readonly userRepository: UserRepository,
  ) {}

  /* 메뉴 주문 */
  async createOrder(req: Request, menuId: number, quantity: number) {
    const menu = await this.menuRepository.findOne({
      where: { menuId, deletedAt: null },
    });

    if (!menu) {
      throw new NotFoundException(`해당 메뉴는 존재하지않습니다.`);
    }

    if (req['user'].userType !== UserType.CUSTOMER) {
      throw new UnauthorizedException(`사용자만 이용할 수 있습니다.`);
    }

    const userId = req['user'].id;
    const user = await this.userRepository.findOne({ where: { userId } });

    await this.orderRepository.save({
      user,
      menu,
      quantity,
      orderType: OrderType.PENDING,
    });

    return { message: '메뉴 주문에 성공하였습니다. ' };
  }

  /* 사용자 주문 내역 조회 */
  async getOrderByCustomer(req: Request) {
    const userType = req['user'].userType;
    const userId = req['user'].id;

    if (userType !== UserType.CUSTOMER) {
      throw new UnauthorizedException(`사용자만 이용할 수 있습니다.`);
    }

    const orders = await this.orderRepository
      .createQueryBuilder('order')
      .select([
        'menu.name',
        'menu.price',
        'order.quantity',
        'order.orderType',
        'order.createdAt',
      ])
      .leftJoin('order.user', 'user')
      .leftJoin('order.menu', 'menu')
      .where('user.userId = :userId', { userId })
      .addOrderBy('order.createdAt', 'DESC')
      .getMany();

    const totalPrice = await this.orderRepository
      .createQueryBuilder('order')
      .select(`SUM(order.quantity * menu.price)`, 'totalPrice')
      .leftJoin('order.menu', 'menu')
      .where('order.userId = :userId', { userId })
      .getRawOne();

    return { totalPrice, orders };
  }

  /* 사장님 주문 내역 조회 */
  async getOrderByOwner(req: Request) {
    //사장인지 확인
    if (req['user'].userType !== UserType.OWNER) {
      throw new UnauthorizedException(`사장님만 이용할 수 있습니다.`);
    }

    const orders = await this.orderRepository
      .createQueryBuilder('order')
      .select([
        'user.nickname',
        'menu.name',
        'menu.price',
        'order.quantity',
        'order.createdAt',
      ])
      .leftJoin('order.user', 'user')
      .leftJoin('order.menu', 'menu')
      .addOrderBy('order.createdAt', 'DESC')
      .getMany();

    const totalPrice = await this.orderRepository
      .createQueryBuilder('order')
      .select(`SUM(order.quantity * menu.price)`, 'totalPrice')
      .leftJoin('order.menu', 'menu')
      .getRawOne();

    return { totalPrice, orders };
  }

  /* 주문 상태 변경 */
  async updateOrderType(req: Request, orderId: number, orderType: OrderType) {
    if (req['user'].userType !== UserType.OWNER) {
      throw new UnauthorizedException(`사장님만 이용할 수 있습니다.`);
    }

    await this.orderRepository.update({ orderId }, { orderType });

    return { message: '주문 상태가 변경되었습니다.' };
  }
}
