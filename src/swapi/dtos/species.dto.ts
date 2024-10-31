import { IsOptional, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class SpeciesDto {
  @ApiPropertyOptional({ description: 'ID de la especie', example: '1' })
  @IsString()
  @IsOptional()
  readonly id: string;
}