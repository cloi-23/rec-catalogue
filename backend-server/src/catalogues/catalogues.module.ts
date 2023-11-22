import { Module } from '@nestjs/common';
import { CataloguesService } from './catalogues.service';
import { CataloguesController } from './catalogues.controller';
import { Catalogue, CatalogueSchema } from './entities/catalogue.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { CatalogueSeeder } from './seeder/catalogue.seeder';

@Module({
  imports: [MongooseModule.forFeature([{ name: Catalogue.name, schema: CatalogueSchema }])],
  controllers: [CataloguesController],
  providers: [CataloguesService, CatalogueSeeder],
})
export class CataloguesModule {}
