import {
  CanActivate,
  ExecutionContext,
  Injectable,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PERMISSIONS_KEY } from './roles.decorator';
import { User } from 'src/users/users.model';

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredPermissions = this.reflector.get<string[]>(
      PERMISSIONS_KEY,
      context.getHandler(),
    );

    if (!requiredPermissions || requiredPermissions.length === 0) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user: User = request.user;

    if (!user || (!user.permissions && user.role == 'admin')) {
      throw new ForbiddenException(
        "Sizda bu amalni bajarish uchun ruxsat yo'q!",
      );
    }

    const hasPermission = requiredPermissions.every((permission) =>
      user.permissions.includes(permission),
    );

    if (!hasPermission && user.role == 'admin') {
      throw new ForbiddenException(
        'Sizda ushbu amalni bajarish uchun ruxsat yo‘q!',
      );
    }

    return true;
  }
}
