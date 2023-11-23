import { Model } from 'mongoose';
import { Catalogue } from '../entities/catalogue.entity';
import { cataloguesSeedData } from './catalogue.data';
import { InjectModel } from '@nestjs/mongoose';

export class CatalogueSeeder {
  constructor(
    @InjectModel(Catalogue.name)
    private readonly Catalogue: Model<Catalogue>,
  ) {}

  async plant() {
    try {
      console.log('purging catalogue..');
      await this.Catalogue.deleteMany({});
      console.log('seeding catalogue..');
      await this.Catalogue.insertMany(cataloguesSeedData);
      console.log('seeding catalogue done.');
    } catch (error) {
      console.error('Error seeding data:');
    }
  }
}
