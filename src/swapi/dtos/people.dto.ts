import { IsOptional, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class PeopleDto {
  @ApiPropertyOptional({ description: 'ID de la persona', example: '1' })
  @IsString()
  @IsOptional()
  readonly id: string;
}