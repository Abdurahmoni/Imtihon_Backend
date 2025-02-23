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
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { RoleGuard } from 'src/common/guard/role.guard';
import { PermissionGuard } from 'src/common/guard/permission.guard';
import { Roles } from 'src/common/guard/roles.decorator';
import { Permissions } from 'src/common/guard/roles.decorator';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @UseGuards(RoleGuard, PermissionGuard)
  @Roles('superadmin', 'admin', 'seller', 'customer')
  @Permissions('OrderPost')
  @Post()
  create(@Body() createOrderDto: CreateOrderDto, @Req() req) {
    createOrderDto.customer_id = req.user.id;
    console.log('\n\n\n\n\n\n\n', createOrderDto);

    return this.ordersService.create(createOrderDto);
  }

  @UseGuards(RoleGuard, PermissionGuard)
  @Roles('superadmin', 'admin', 'seller', 'customer')
  @Permissions('OrderGetAll')
  @Get()
  findAll() {
    return this.ordersService.findAll();
  }

  @UseGuards(RoleGuard, PermissionGuard)
  @Roles('superadmin', 'admin', 'seller', 'customer')
  @Permissions('OrderGetOne')
  @Get('getme')
  findOne(@Req() req) {
    return this.ordersService.findOne(req.user.id);
  }

  @UseGuards(RoleGuard, PermissionGuard)
  @Roles('superadmin', 'admin', 'seller', 'customer')
  @Permissions('OrderUpdate')
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.ordersService.update(+id, updateOrderDto);
  }

  @UseGuards(RoleGuard, PermissionGuard)
  @Roles('superadmin', 'admin', 'seller', 'customer')
  @Permissions('OrderDelete')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ordersService.remove(+id);
  }
}
