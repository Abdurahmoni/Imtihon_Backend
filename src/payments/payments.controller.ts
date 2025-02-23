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
import { PaymentsService } from './payments.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { RoleGuard } from 'src/common/guard/role.guard';
import { PermissionGuard } from 'src/common/guard/permission.guard';
import { Roles } from 'src/common/guard/roles.decorator';
import { Permissions } from 'src/common/guard/roles.decorator';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @UseGuards(RoleGuard, PermissionGuard)
  @Roles('superadmin', 'admin', 'seller', 'customer')
  @Permissions('PaymentPost')
  @Post()
  create(@Body() createPaymentDto: CreatePaymentDto, @Req() req) {
    createPaymentDto.user_id = req.user.id;
    return this.paymentsService.create(createPaymentDto);
  }

  @UseGuards(RoleGuard, PermissionGuard)
  @Roles('superadmin', 'admin', 'seller')
  @Permissions('PaymentGetAll')
  @Get()
  findAll() {
    return this.paymentsService.findAll();
  }

  @UseGuards(RoleGuard, PermissionGuard)
  @Roles('superadmin', 'admin', 'seller')
  @Permissions('PaymentGetOne')
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.paymentsService.findOne(+id);
  }

  @UseGuards(RoleGuard, PermissionGuard)
  @Roles('superadmin', 'admin', 'seller', 'customer')
  @Permissions('PaymentUpdate')
  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePaymentDto: UpdatePaymentDto) {
    return this.paymentsService.update(+id, updatePaymentDto);
  }

  @UseGuards(RoleGuard, PermissionGuard)
  @Roles('superadmin', 'admin', 'seller', 'customer')
  @Permissions('PaymentDelete')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.paymentsService.remove(+id);
  }
}
