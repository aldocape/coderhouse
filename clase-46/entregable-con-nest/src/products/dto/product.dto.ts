import { IsNotEmpty, IsNumber, IsString, Length, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ProductDTO {
  @ApiProperty({ example: '6395b0eeb49bd60cefce5121' })
  @IsNotEmpty()
  @IsString()
  _id: string;

  @ApiProperty({ example: 'Bicicleta Mountain Bike Rodado 26' })
  @IsNotEmpty()
  @IsString()
  @Length(3, 90)
  nombre: string;

  @ApiProperty({
    example:
      'Es una bicicleta ideal para personas que se inician en este apasionante deporte, muy bien equipada sin descuidar el presupuesto del usuario.',
  })
  @IsString()
  descripcion: string;

  @ApiProperty({
    example: '78849280827',
  })
  @IsNotEmpty()
  @IsString()
  codigo: string;

  @ApiProperty({
    example:
      'https://http2.mlstatic.com/D_NQ_NP_708965-MLA53856285905_022023-O.webp',
  })
  @IsNotEmpty()
  @IsString()
  foto: string;

  @ApiProperty({ example: 65000 })
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  precio: number;

  @ApiProperty({ example: 50 })
  @IsNumber()
  @Min(0)
  stock: number;
}
