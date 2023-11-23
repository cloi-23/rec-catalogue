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

  async search(
    item: string,
    page: number = 1,
    limit: number = 10,
  ): Promise<any> {
    const searchTerm = item !== 'null' ? item : null;
    const regex = searchTerm
      ? new RegExp(`^${searchTerm}|${searchTerm}`, 'i')
      : null;

    const catalogues = await this.catalogueModel
      .find(searchTerm ? { 'items.name': { $regex: regex } } : {})
      .sort({ updatedAt: -1 })
      .exec();

    let allItems = catalogues.flatMap((catalogue) =>
      catalogue.items.map((item) => ({
        catalogueID: catalogue._id,
        itemID: item._id,
        name: item.name.toUpperCase(),
        supplier: catalogue.supplier.toUpperCase(),
        cost: this.formatMoney(item.cost),
        date: this.formatDate(catalogue.date.toISOString()),
      })),
    );

    if (searchTerm) allItems = allItems.filter((item) => regex.test(item.name));
    const paginatedItems = allItems.slice((page - 1) * limit, page * limit);
    return paginatedItems;
  }

  formatDate(dateString: string) {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      timeZone: 'Asia/Manila',
    };
    return new Intl.DateTimeFormat('default', options).format(date);
  }

  formatMoney(moneyInPesos: number) {
    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'PHP',
    });
    const formatted = formatter.format(moneyInPesos);
    return formatted.replace('₱', '₱ ');
  }

  async removeItem(catalogueID: string, itemID: string): Promise<Catalogue> {
    const updatedCatalogue = await this.catalogueModel
      .findByIdAndUpdate(
        catalogueID,
        { $pull: { items: { _id: itemID } } },
        { new: true },
      )
      .exec();

    if (!updatedCatalogue) {
      throw new Error('Catalogue not found');
    }

    return updatedCatalogue;
  }
}
