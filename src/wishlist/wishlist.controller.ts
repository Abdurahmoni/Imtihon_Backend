import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  UseGuards,
  Req,
} from '@nestjs/common';
import { WishlistService } from './wishlist.service';
import { Roles } from 'src/common/guard/roles.decorator';
import { RoleGuard } from 'src/common/guard/role.guard';
import { PermissionGuard } from 'src/common/guard/permission.guard';
import { Permissions } from 'src/common/guard/roles.decorator';

@Controller('wishlist')
export class WishlistController {
  constructor(private readonly wishlistService: WishlistService) {}

  @UseGuards(RoleGuard, PermissionGuard)
  @Roles('superadmin', 'admin', 'seller', 'customer')
  @Permissions('WishlistPost')
  @Post(':productId')
  async addToWishlist(
    // @Param('userId') userId: number,
    @Param('productId') productId: number,
    @Req() req,
  ) {
    return this.wishlistService.addToWishlist(req.user.id, productId);
  }
  @UseGuards(RoleGuard, PermissionGuard)
  @Roles('superadmin', 'admin', 'seller', 'customer')
  @Permissions('WishlistGetOne')
  @Get(':userId')
  async getUserWishlist(@Param('userId') userId: number, @Req() req) {
    // if (req.user.id != userId) {
    //   return {
    //     statusCode: 403,
    //     message: 'Sizga ruxsat yoqilmadi',
    //   };
    // }

    return this.wishlistService.getUserWishlist(userId);
  }

  @UseGuards(RoleGuard, PermissionGuard)
  @Roles('superadmin', 'admin', 'seller', 'customer')
  @Permissions('WishlistGetOne')
  @Get()
  async getAllWishlist(@Req() req) {
    return this.wishlistService.getUserWishlist(req.user.id);
  }

  @UseGuards(RoleGuard, PermissionGuard)
  @Roles('superadmin', 'admin', 'seller', 'customer')
  @Permissions('WishlistDelete')
  @Delete(':productId')
  async removeFromWishlist(
    // @Param('userId') userId: number,
    @Param('productId') productId: number,
    @Req() req,
  ) {
    return this.wishlistService.removeFromWishlist(req.user.id, productId);
  }
}
