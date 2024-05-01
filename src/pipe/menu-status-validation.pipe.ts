import {
  BadRequestException,
  NotFoundException,
  PipeTransform,
} from '@nestjs/common';
import { MenuStatus } from 'src/menu/menu-status.enum';

export class MenuStatueValidationPipe implements PipeTransform {
  readonly StatusOptions = [MenuStatus.FOR_SALE, MenuStatus.SOLD_OUT];

  // transform(value: any) {
  //   value = value['status'];
  //   console.log('값', value)
  //   if (value === undefined) {
  //     throw new NotFoundException(`status를 입력하세요`);
  //   }

  //   if (!this.isStatusValid(value)) {
  //     throw new BadRequestException(`${value} 올바른 옵션이 아닙니다.`);
  //   }

  //   // const capitalStatus = value.toUpperCase();
  //   const capitalStatus = value;

  //   if (
  //     capitalStatus !== MenuStatus.FOR_SALE &&
  //     capitalStatus !== MenuStatus.SOLD_OUT
  //   ) {
  //     console.log(capitalStatus)
  //     throw new NotFoundException(
  //       `${MenuStatus.FOR_SALE} 나 ${MenuStatus.SOLD_OUT} 만 작성해주세요.`,
  //     );
  //   }

  //   return value;
  // }

  transform(value: any) {
    console.log('으하하', value);
    if (!value || !value.status) {
      // value가 없거나 status 속성이 없는 경우
      throw new NotFoundException(`status를 입력하세요`);
    }

    const status = value.status; // status 속성의 값 가져오기
    console.log('값', status);

    if (status !== MenuStatus.FOR_SALE && status !== MenuStatus.SOLD_OUT) {
      console.log(status);
      throw new NotFoundException(
        `${MenuStatus.FOR_SALE} 나 ${MenuStatus.SOLD_OUT} 만 작성해주세요.`,
      );
    }

    if (!this.isStatusValid(status)) {
      throw new BadRequestException(`${status} 올바른 옵션이 아닙니다.`);
    }

    return status;
  }
  private isStatusValid(status: any) {
    const index = this.StatusOptions.indexOf(status);
    return index !== -1;
  }
}
