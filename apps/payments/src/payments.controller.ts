import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { PaymentsService } from './payments.service';
import { CreateChargeDTO } from '@app/common/dto';

@Controller()
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}
  @MessagePattern('create_charge')
  async createCharge(@Payload() data: CreateChargeDTO) {
    return this.paymentsService.createCharge(data);
  }
}
