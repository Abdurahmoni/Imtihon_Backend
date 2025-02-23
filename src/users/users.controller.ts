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
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { RoleGuard } from 'src/common/guard/role.guard';
import { PermissionGuard } from 'src/common/guard/permission.guard';
import { Roles } from 'src/common/guard/roles.decorator';
import { Permissions } from 'src/common/guard/roles.decorator';
import { LoginUserDto } from './dto/login-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Post('login')
  login(@Body() createUserDto: LoginUserDto) {
    return this.usersService.login(createUserDto.email, createUserDto.password);
  }

  @UseGuards(RoleGuard, PermissionGuard)
  @Roles('superadmin', 'admin')
  @Permissions('UserGetAll')
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @UseGuards(RoleGuard, PermissionGuard)
  @Roles('superadmin', 'admin')
  @Permissions('UserGetAll')
  @Get('role/:role')
  findAdmin(@Param('role') role: string) {
    return this.usersService.findAdmin(role);
  }

  @UseGuards(RoleGuard, PermissionGuard)
  @Roles('superadmin', 'admin', 'seller', 'customer')
  @Permissions('UserGetOne')
  @Get('getme')
  findOne(@Req() req) {
    return this.usersService.findOne(req.user.id);
  }

  @UseGuards(RoleGuard, PermissionGuard)
  @Roles('superadmin', 'admin', 'seller', 'customer')
  @Permissions('UserUpdate')
  @Patch()
  update(
    // @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @Req() req,
  ) {
    return this.usersService.update(req.user.id, updateUserDto);
  }

  @UseGuards(RoleGuard, PermissionGuard)
  @Roles('superadmin', 'admin', 'seller', 'customer')
  @Permissions('UserUpdate')
  @Patch(':id')
  updateAdmin(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @UseGuards(RoleGuard, PermissionGuard)
  @Roles('superadmin', 'admin', 'seller', 'customer')
  @Permissions('UserDelete')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
