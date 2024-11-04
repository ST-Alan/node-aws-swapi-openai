import { Body, Controller, HttpException, HttpStatus, Post, Res } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBody, ApiResponse } from '@nestjs/swagger';
import { NewFilmService } from './new-film.service';
import { SwapiDataDto, TextToAudioDto } from './dtos';
import { Response } from 'express';

@ApiTags('New Film')  
@Controller('new-film')
export class NewFilmController {
  constructor(private readonly newFilmService: NewFilmService) {}

  @Post('new-film-with-swapi-data')
  @ApiOperation({ summary: 'Genera un resumen de película con datos de SWAPI' }) 
  @ApiBody({ type: SwapiDataDto }) 
  @ApiResponse({ status: 201, description: 'Resumen creado con éxito.' }) 
  @ApiResponse({ status: 400, description: 'Solicitud inválida.' }) 
  @ApiResponse({ status: 500, description: 'Error interno del servidor.' }) 
  async getSwapiData(
    @Body() swapiDataDto: SwapiDataDto,
  ) {
    // Lista de IDs no disponibles en la API
    const restrictedVehicleIds = ['1', '2', '3', '9', '10', '11', '12'];
    const restrictedStarshipIds = ['1','4','6'];
    if (swapiDataDto.idFilm < 1 || swapiDataDto.idFilm > 7) {
      return {
        success: false,
        message: `El ID de la película ${swapiDataDto.idFilm} no está disponible en la API. Solo se permiten idFilm con IDs entre 1 y 7.`,
      };
    }
    // Validar que el id no esté en la lista restringida
    if (restrictedVehicleIds.includes(swapiDataDto.idVehicle)) {
      return {
        success: false,
        message: `El ID del vehículo ${swapiDataDto.idVehicle} no está disponible en la API. Intenta con otro número de ID en idVehicle.`,
      };
    }
    if (restrictedStarshipIds.includes(swapiDataDto.idStarship)) {
      return {
        success: false,
        message: `El ID del starship ${swapiDataDto.idStarship} no está disponible en la API. Intenta con otro número de id en idStarship.`,
      };
    }

    try {
      const data = await this.newFilmService.createMessageOpenAiWithData(swapiDataDto);
      return { success: true, data };
    } catch (error) {
      throw new HttpException(
        {
          success: false,
          message: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post('text-to-audio')
  @ApiOperation({ summary: 'Genera un archivo de audio a partir de un texto relacionado con películas de SWAPI',
  description: 'Este endpoint toma un texto y lo convierte en un archivo de audio, utilizando datos de la API de SWAPI. El archivo de audio resultante se puede descargar y reproducir.' }) 
  @ApiBody({ type: TextToAudioDto }) 
  @ApiResponse({ status: 201, description: 'Resumen creado con éxito.' }) 
  @ApiResponse({ status: 400, description: 'Solicitud inválida.' }) 
  @ApiResponse({ status: 500, description: 'Error interno del servidor.' }) 
  async texToAudio(
    @Body() textToAudioDto:TextToAudioDto,
    @Res() res:Response //Se usara la respuesta de express para trabajar con el audio
    ){
      const restrictedVehicleIds = ['1', '2', '3', '9', '10', '11', '12'];
      const restrictedStarshipIds = ['1','4','6'];
      if (textToAudioDto.idFilm < 1 || textToAudioDto.idFilm > 7) {
      return {
          success: false,
          message: `El ID de la película ${textToAudioDto.idFilm} no está disponible en la API. Solo se permiten idFilm con IDs entre 1 y 7.`,
        };
      }
      // Validar que el id no esté en la lista restringida
      if (restrictedVehicleIds.includes(textToAudioDto.idVehicle)) {
      return {
          success: false,
          message: `El ID del vehículo ${textToAudioDto.idVehicle} no está disponible en la API. Intenta con otro número de ID en idVehicle.`,
        };
      }
      if (restrictedStarshipIds.includes(textToAudioDto.idStarship)) {
        return {
          success: false,
          message: `El ID del starship ${textToAudioDto.idStarship} no está disponible en la API. Intenta con otro número de id en idStarship.`,
        };
      }
      try {
        const nuevaSagaEscrita = await this.newFilmService.createMessageOpenAiWithData(textToAudioDto);
        const filePath = await this.newFilmService.texToAudio(nuevaSagaEscrita.nuevoFilm,textToAudioDto.selectedVoice);
        res.setHeader('Content-Type','audio/mp3');
        res.status(HttpStatus.OK);
        res.sendFile(filePath);
      } catch (error) {
        throw new HttpException(
          {
            success: false,
            message: error.message,
          },
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
}