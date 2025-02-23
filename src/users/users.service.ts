import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './users.model';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private userModel: typeof User,
    private readonly configService: ConfigService,
  ) {}

  async onModuleInit() {
    const superAdminEmail = 'superAdmin@gmail.com';

    // Bazada super admin borligini tekshirish
    const superAdminExists = await this.userModel.findOne({
      where: { email: superAdminEmail },
    });

    if (!superAdminExists) {
      console.log('Super Admin yaratilyapti...');

      const hashedPassword = await bcrypt.hash('123456', 10);
      const superAdmin = await this.userModel.create({
        first_name: 'superAdmin',
        last_name: 'superAdmin',
        email: superAdminEmail,
        password: hashedPassword,
        phone: '+998944477646',
        role: 'superadmin',
        is_active: true,
      });

      console.log('✅ Super Admin yaratildi!', superAdmin.toJSON());
    } else {
      console.log('⚡ Super Admin allaqachon mavjud.');
    }
  }

  async create(createUserDto: CreateUserDto) {
    createUserDto.password = await bcrypt.hash(createUserDto.password, 10);
    if (createUserDto.role === 'admin') {
      createUserDto.is_active = true;
      createUserDto.permissions = [
        'UserPost',
        'UserGetOne',
        'UserGetAll',
        'UserUpdate',
        'UserDelete',
        'BannerPost',
        'BannerGetOne',
        'BannerGetAll',
        'BannerUpdate',
        'BannerDelete',
      ];
    }
    const user = await this.userModel.create(createUserDto);
    console.log('admin', user.dataValues);

    const accsess = await this.accsessToken(user.dataValues);
    const refresh = await this.refreshToken(user.dataValues);

    const token = { accsess, refresh };

    return { user, token };
  }

  async login(email: string, password: string) {
    const user = await this.userModel.findOne({ where: { email } });
    if (!user) {
      throw new NotFoundException(`Foydalanuvchi topilmadi!`);
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new NotFoundException(`Parol yoki email noto'g'ri`);
    }
    const accsess = await this.accsessToken(user.dataValues);
    const refresh = await this.refreshToken(user.dataValues);

    const token = { accsess, refresh };

    return { user, token };
  }

  async findAll() {
    return this.userModel.findAll({ include: { all: true } });
  }

  async findAdmin( role: string) {
    return this.userModel.findAll({
      where: { role: role },
      include: { all: true },
    });
  }

  async findOne(id) {
    const user = await this.userModel.findByPk(id, { include: { all: true } });
    if (!user) {
      throw new NotFoundException(`Foydalanuvchi topilmadi!`);
    }
    return user;
  }

  async findByEmail(email) {
    return this.userModel.findOne({ where: { email }, include: { all: true } });
  }

  async update(id, updateUserDto: UpdateUserDto) {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException(`Foydalanuvchi topilmadi!`);
    }

    if (updateUserDto.password) {
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
    }

    await user.update(updateUserDto);
    return user;
  }

  async remove(id) {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException(`Foydalanuvchi topilmadi!`);
    }
    await user.destroy();
    return { message: 'Foydalanuvchi o‘chirildi' };
  }

  async accsessToken(user: any) {
    return await jwt.sign(user, this.configService.get('JWT_ACCCES_SECRET'), {
      expiresIn: '8h',
    });
  }
  async refreshToken(user: any) {
    return await jwt.sign(user, this.configService.get('JWT_REFRESH_SECRET'), {
      expiresIn: '1d',
    });
  }
}
