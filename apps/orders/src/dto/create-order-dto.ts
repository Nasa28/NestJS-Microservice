import {
  IsString,
  IsPhoneNumber,
  IsNotEmpty,
  IsPositive,
} from 'class-validator';
export class CreateOrderDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsPositive()
  @IsNotEmpty()
  price: number;

  @IsPhoneNumber()
  @IsString()
  phoneNumber: string;

  @IsPositive()
  @IsNotEmpty()
  quantity: number;
}
