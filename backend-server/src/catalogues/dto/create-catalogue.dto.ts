import { Type } from 'class-transformer';
import { IsString, IsNumber, ValidateNested, IsArray } from 'class-validator';
export class CreateCatalogueDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Item)
  items: Item[];

  @IsString()
  supplier: string;

  @IsString()
  date: string;
}

class Item {
  @IsString()
  name: string;

  @IsNumber()
  cost: number;
}
