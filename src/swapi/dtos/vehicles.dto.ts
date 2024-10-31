import { IsOptional, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class VehiclesDto {
  @ApiPropertyOptional({ description: 'ID del vehículo', example: '1' })
  @IsString()
  @IsOptional()
  readonly id: string;
}