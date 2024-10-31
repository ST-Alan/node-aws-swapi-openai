import { IsOptional, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class PlanetDto {
  @ApiPropertyOptional({ description: 'ID del planeta', example: '1' })
  @IsString()
  @IsOptional()
  readonly id: string;
}