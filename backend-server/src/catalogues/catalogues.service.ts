import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCatalogueDto } from './dto/create-catalogue.dto';
import { UpdateCatalogueDto } from './dto/update-catalogue.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Catalogue } from './entities/catalogue.entity';
import { CatalogueSeeder } from './seeder/catalogue.seeder';

@Injectable()
export class CataloguesService {
  constructor(
    @InjectModel(Catalogue.name)
    private readonly catalogueModel: Model<Catalogue>,
    protected readonly catalogueSeeder: CatalogueSeeder,
  ) {}

  async create(createCatalogueDto: CreateCatalogueDto): Promise<Catalogue> {
    const createdCatalogue = new this.catalogueModel(createCatalogueDto);
    return createdCatalogue.save();
  }

  async findAll(): Promise<Catalogue[]> {
    return this.catalogueModel.find().exec();
  }

  async findOne(id: string): Promise<Catalogue | null> {
    const catalogue = await this.catalogueModel.findById(id).exec();
    if (!catalogue) {
      throw new NotFoundException(`Catalogue with ID ${id} not found`);
    }
    return catalogue;
  }

  async update(
    id: string,
    updateCatalogueDto: UpdateCatalogueDto,
  ): Promise<Catalogue | null> {
    const updatedCatalogue = await this.catalogueModel
      .findByIdAndUpdate(id, updateCatalogueDto, { new: true })
      .exec();
    if (!updatedCatalogue) {
      throw new NotFoundException(`Catalogue with ID ${id} not found`);
    }
    return updatedCatalogue;
  }

  async remove(id: string): Promise<Catalogue | null> {
    const deletedCatalogue = await this.catalogueModel
      .findByIdAndRemove(id)
      .exec();
    if (!deletedCatalogue) {
      throw new NotFoundException(`Catalogue with ID ${id} not found`);
    }
    return deletedCatalogue;
  }

  async seeder(): Promise<any> {
    try {
      await this.catalogueSeeder.plant();
      return { message: 'Seeding completed successfully' };
    } catch (error) {
      console.error('Error seeding data :', error);
      throw new Error('Seeding failed');
    }
  }

  async search(item: any, page: number = 1, limit: number = 10): Promise<any> {
    const skip = (page - 1) * limit;
    const searchTerm =
      typeof item === 'object' && item !== '' ? item.name : false;

    const regex = new RegExp(`^${searchTerm}|${searchTerm}`, 'i');
    const query = searchTerm ? { 'items.name': { $regex: regex } } : {};
    console.log('query', query);

    const catalogues = await this.catalogueModel
      .find(query)
      .skip(skip)
      .limit(limit)
      .sort({ updatedAt: 1 })
      .exec();

    const results = searchTerm
      ? catalogues.flatMap((catalogue) =>
          catalogue.items
            .filter((item) => regex.test(item.name))
            .map((item) => ({
              catalogueID: catalogue._id,
              name: item.name,
              supplier: catalogue.supplier,
              cost: item.cost,
              date: catalogue.date,
            })),
        )
      : catalogues.flatMap((catalogue) =>
          catalogue.items.map((item) => ({
            catalogueID: catalogue._id,
            name: item.name,
            supplier: catalogue.supplier,
            cost: item.cost,
            date: catalogue.date,
          })),
        );

    return results;
  }
}
