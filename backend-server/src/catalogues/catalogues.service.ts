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
    const searchTerm = item !== 'null' ? item : false;
    const regex = searchTerm ? new RegExp(`^${searchTerm}`, 'i') : null;

    // Fetch all catalogues matching the query (without pagination)
    const catalogues = await this.catalogueModel
      .find(searchTerm ? { 'items.name': { $regex: regex } } : {})
      .sort({ updatedAt: -1 })
      .exec();

    // Consolidate and filter items from all catalogues
    let allItems = catalogues.flatMap((catalogue) =>
      catalogue.items.map((item) => ({
        catalogueID: catalogue._id,
        name: item.name,
        supplier: catalogue.supplier,
        cost: item.cost,
        date: catalogue.date,
      })),
    );

    if (searchTerm) {
      allItems = allItems.filter((item) => regex.test(item.name));
    }

    // Apply pagination to the consolidated list of items
    const paginatedItems = allItems.slice((page - 1) * limit, page * limit);

    return paginatedItems;
  }
}
