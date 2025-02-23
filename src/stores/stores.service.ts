import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';
import { Store } from './stores.model';
import path from 'path';
import fs from 'fs';

@Injectable()
export class StoresService {
  constructor(@InjectModel(Store) private readonly storeModel: typeof Store) {}

  async create(createStoreDto: CreateStoreDto) {
    const store = await this.storeModel.create(createStoreDto);
    return store;
  }

  async findAll() {
    return this.storeModel.findAll({
      include: { all: true },
    });
  }

  async findOne(id: number) {
    const store = await this.storeModel.findOne({
      where: { id },
    });
    return store;
  }

  async findBySellerId(sellerId: number) {
    const store = await this.storeModel.findAll({
      where: { seller_id: sellerId },
      include: { all: true },
    });
    return store;
  }
  async update(id: number, updateStoreDto: UpdateStoreDto) {
    const store = await this.storeModel.findOne({
      where: { id },
    });

    if (store) {
      await store.update(updateStoreDto);
      return store;
    }

    return null;
  }

  async remove(id: number) {
    const store = await this.storeModel.findOne({
      where: { id },
    });

    if (store) {
      await store.destroy();
      return { message: 'Store deleted successfully' };
    }

    return { message: 'Store not found' };
  }

  async removeImage(id: number) {
    const store = await this.storeModel.findOne({ where: { id } });
    if (!store) return { message: 'Store not found' };

    if (store.logo) {
      const imagePath = path.join(
        __dirname,
        '..',
        '..',
        'uploads',
        'stores',
        path.basename(store.logo),
      );

      if (fs.existsSync(imagePath)) {
        try {
          fs.unlinkSync(imagePath);
        } catch (err) {
          console.error(`Failed to delete logo: ${imagePath}`, err);
        }
      }
    }

    await store.update({ logo: null });

    return { message: 'Logo deleted successfully' };
  }
}
