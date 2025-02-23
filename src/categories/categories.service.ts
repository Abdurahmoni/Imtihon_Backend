import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Category } from './categories.model';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel(Category) private readonly categoryModel: typeof Category,
  ) {}
  create(createCategoryDto: CreateCategoryDto) {
    return this.categoryModel.create({ ...createCategoryDto });
  }

  findAll() {
    return this.categoryModel.findAll({ include: { all: true } });
  }

  findOne(id: number) {
    return this.categoryModel.findByPk(id, { include: { all: true } });
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return this.categoryModel.update(updateCategoryDto, {
      where: { id },
      returning: true,
    });
  }

  remove(id: number) {
    return this.categoryModel.destroy({ where: { id } });
  }
}
