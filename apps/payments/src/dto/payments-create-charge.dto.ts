import { CreateChargeDTO } from '@app/common/dto';
import { IsEmail } from 'class-validator';

export class PaymentsCreateChargeDTO extends CreateChargeDTO {
  @IsEmail()
  email: string;
}
