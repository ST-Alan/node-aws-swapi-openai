import { IsOptional, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class StarShipsDto {
  @ApiPropertyOptional({ description: 'ID de la nave estelar', example: '1' })
  @IsString()
  @IsOptional()
  readonly id: string;
}