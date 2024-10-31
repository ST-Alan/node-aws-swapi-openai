import { IsOptional, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class FilmsDto {
  @ApiPropertyOptional({ description: 'ID de la película', example: '1' })
  @IsOptional()
  readonly id: number; 
}