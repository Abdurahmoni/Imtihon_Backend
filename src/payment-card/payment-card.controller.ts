import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { PaymentCardService } from './payment-card.service';
import { CreatePaymentCardDto } from './dto/create-payment-card.dto';
import { UpdatePaymentCardDto } from './dto/update-payment-card.dto';
import { RoleGuard } from 'src/common/guard/role.guard';
import { PermissionGuard } from 'src/common/guard/permission.guard';
import { Roles } from 'src/common/guard/roles.decorator';
import { Permissions } from 'src/common/guard/roles.decorator';

@Controller('payment-card')
export class PaymentCardController {
  constructor(private readonly paymentCardService: PaymentCardService) {}

  @UseGuards(RoleGuard, PermissionGuard)
  @Roles('superadmin', 'admin', 'seller', 'customer')
  @Permissions('PaymentCardPost')
  @Post()
  create(@Body() createPaymentCardDto: CreatePaymentCardDto) {
    return this.paymentCardService.create(createPaymentCardDto);
  }

  @UseGuards(RoleGuard, PermissionGuard)
  @Roles('superadmin', 'admin', 'seller', 'customer')
  @Permissions('PaymentCardGetAll')
  @Get()
  findAll() {
    return this.paymentCardService.findAll();
  }

  @UseGuards(RoleGuard, PermissionGuard)
  @Roles('superadmin', 'admin', 'seller', 'customer')
  @Permissions('PaymentCardGetOne')
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.paymentCardService.findOne(+id);
  }

  @UseGuards(RoleGuard, PermissionGuard)
  @Roles('superadmin', 'admin', 'seller', 'customer')
  @Permissions('PaymentCardUpdate')
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePaymentCardDto: UpdatePaymentCardDto,
  ) {
    return this.paymentCardService.update(+id, updatePaymentCardDto);
  }

  @UseGuards(RoleGuard, PermissionGuard)
  @Roles('superadmin', 'admin', 'seller', 'customer')
  @Permissions('PaymentCardDelete')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.paymentCardService.remove(+id);
  }
}
