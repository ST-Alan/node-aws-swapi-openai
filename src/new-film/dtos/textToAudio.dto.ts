import { IsInt, IsOptional, IsString } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class TextToAudioDto{
  @ApiProperty({ description: 'ID de la película', example: 1 })
  @IsInt()
  idFilm: number;

  @ApiProperty({ description: 'ID del personaje', example: '1' })
  @IsString()
  idPerson: string;

  @ApiProperty({ description: 'ID del planeta', example: '1' })
  @IsString()
  idPlanet: string;

  @ApiProperty({ description: 'ID de la especie', example: '1' })
  @IsString()
  idSpecies: string;

  @ApiProperty({ description: 'ID de la nave estelar', example: '1', required: false })
  @IsString()
  @IsOptional()
  idStarship: string;

  @ApiProperty({ description: 'ID del vehículo', example: '1' })
  @IsString()
  idVehicle: string;

  @ApiProperty({ description: 'Emoción asociada con la película', example: 'alegría' })
  @IsString()
  emocion: string;

  @ApiProperty({ description: 'El tipo de voz que va a leer el resumen de la nueva saga de la película' })
  @IsString()
  @IsOptional()
  readonly selectedVoice:string;


}