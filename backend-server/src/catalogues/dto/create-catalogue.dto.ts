import { IsString, IsNumber } from 'class-validator';
export class CreateCatalogueDto {
  @IsString()
  item: string;

  @IsString()
  supplier: string;

  @IsString()
  date: string;

  @IsNumber()
  amount: number;
}
