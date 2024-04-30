import { BadRequestException, PipeTransform } from '@nestjs/common';
import { MenuStatus } from 'src/menu/menu-status.enum';

export class ProductStatusValidationPipe implements PipeTransform {
  readonly StatusOptions = [MenuStatus.FOR_SALE, MenuStatus.SOLD_OUT];

  transform(value: any) {
    value = value.toUpperCase();

    if (!this.isStatusValid(value)) {
      throw new BadRequestException(`${value} 올바른 옵션이 아닙니다.`);
    }

    return value;
  }
  private isStatusValid(status: any) {
    const index = this.StatusOptions.indexOf(status);
    return index !== -1;
  }
}
