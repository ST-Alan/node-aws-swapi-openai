import { Controller, Get, HttpException, HttpStatus, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { SwapiService } from './swapi.service';
import { FilmsDto, PeopleDto, PlanetDto, SpeciesDto, StarShipsDto, VehiclesDto } from './dtos';

@ApiTags('SWAPI')  // Agrupa los endpoints de este controlador bajo la etiqueta "SWAPI" en Swagger
@Controller('swapi')
export class SwapiController {
  constructor(private readonly swapiService: SwapiService) {}

  @Get('get-films')
  @ApiOperation({ summary: 'Obtener información de películas' })
  @ApiQuery({ type: FilmsDto })
  @ApiResponse({ status: 200, description: 'Información de películas obtenida con éxito.' })
  @ApiResponse({ status: 500, description: 'Error interno del servidor.' })
  async getFilms(@Query() filmsDto: FilmsDto) {
    if (filmsDto.id < 1 || filmsDto.id  > 7) {
      return {
        success: false,
        message: `El ID de la película ${ filmsDto.id } no está disponible en la API. Solo se permiten idFilm con IDs entre 1 y 7.`,
      };
    }
    try {
      const getFilms = await this.swapiService.getFilms(filmsDto);
      return getFilms;
    } catch (error) {
      console.log('getFilmsError', error);
      throw new HttpException('getFilmsError', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('get-people')
  @ApiOperation({ summary: 'Obtener información de personas' })
  @ApiQuery({ type: PeopleDto })
  @ApiResponse({ status: 200, description: 'Información de personajes obtenida con éxito.' })
  @ApiResponse({ status: 500, description: 'Error interno del servidor.' })
  async getPeople(@Query() peopleDto: PeopleDto) {
    try {
      const getPeople = await this.swapiService.getPeople(peopleDto);
      return getPeople;
    } catch (error) {
      console.log('getPeopleError', error);
      throw new HttpException('getPeopleError', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('get-planet')
  @ApiOperation({ summary: 'Obtener información de planetas' })
  @ApiQuery({ type: PlanetDto })
  @ApiResponse({ status: 200, description: 'Información de planetas obtenida con éxito.' })
  @ApiResponse({ status: 500, description: 'Error interno del servidor.' })
  async getPlanet(@Query() planetDto: PlanetDto) {
    try {
      const getPlanet = await this.swapiService.getPlanet(planetDto);
      return getPlanet;
    } catch (error) {
      console.log('getPlanetError', error);
      throw new HttpException('getPlanetError', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('get-species')
  @ApiOperation({ summary: 'Obtener información de especies' })
  @ApiQuery({ type: SpeciesDto })
  @ApiResponse({ status: 200, description: 'Información de especies obtenida con éxito.' })
  @ApiResponse({ status: 500, description: 'Error interno del servidor.' })
  async getSpecies(@Query() speciesDto: SpeciesDto) {
    try {
      const getSpecies = await this.swapiService.getSpecies(speciesDto);
      return getSpecies;
    } catch (error) {
      console.log('getSpeciesError', error);
      throw new HttpException('getSpeciesError', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('get-starships')
  @ApiOperation({ summary: 'Obtener información de naves estelares' })
  @ApiQuery({ type: StarShipsDto })
  @ApiResponse({ status: 200, description: 'Información de naves estelares obtenida con éxito.' })
  @ApiResponse({ status: 500, description: 'Error interno del servidor.' })
  async getStarShips(@Query() starshipsDto: StarShipsDto) {
    try {
      const getStarShips = await this.swapiService.getStarShips(starshipsDto);
      return getStarShips;
    } catch (error) {
      console.log('getStarShipsError', error);
      throw new HttpException('getStarShipsError', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('get-vehicles')
  @ApiOperation({ summary: 'Obtener información de vehículos' })
  @ApiQuery({ type: VehiclesDto })
  @ApiResponse({ status: 200, description: 'Información de vehículos obtenida con éxito.' })
  @ApiResponse({ status: 500, description: 'Error interno del servidor.' })
  async getVehicles(@Query() vehiclesDto: VehiclesDto) {
    try {
      const getVehicles = await this.swapiService.getVehicles(vehiclesDto);
      return getVehicles;
    } catch (error) {
      console.log('getVehiclesError', error);
      throw new HttpException('getVehiclesError', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('films')
  @ApiOperation({ summary: 'Obtener todas las películas almacenada en base de datos' })
  @ApiResponse({ status: 200, description: 'Lista de todas las películas obtenida con éxito.' })
  @ApiResponse({ status: 500, description: 'Error interno del servidor.' })
  async getAllFilms() {
    try {
      const films = await this.swapiService.getAllFilms();
      return films;
    } catch (error) {
      console.error('Error fetching films:', error);
      throw new HttpException('Error fetching films', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}