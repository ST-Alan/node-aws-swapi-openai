import { Injectable } from '@nestjs/common';
import { FilmsDto, PeopleDto, PlanetDto, SpeciesDto, StarShipsDto, VehiclesDto } from './dtos';
import { getFilmsUseCase, getPeopleUseCase, getPlanetUseCase, getSpeciesUseCase, getStarShipsUseCase, getVehiclesUseCase } from './use-cases';
import { InjectRepository } from '@nestjs/typeorm';
import { NewFilmEntity } from 'src/new-film/entity';
import { Repository } from 'typeorm';

@Injectable()
export class SwapiService {

    constructor(
        @InjectRepository(NewFilmEntity)
        private readonly newFilmRepository: Repository<NewFilmEntity>, // Por buenas prácticas inyectar el repositorio en el servicio
    ) {}
    
    async getFilms(filmsDto: FilmsDto){
        return getFilmsUseCase(filmsDto)
    }

    async getPeople(peopleDto:PeopleDto){
        return getPeopleUseCase(peopleDto)
    }

    async getPlanet(planetDto:PlanetDto){
        return getPlanetUseCase(planetDto)
    }
    
    async getSpecies(speciesDto:SpeciesDto){
        return getSpeciesUseCase(speciesDto)
    }
    
    async getStarShips(starshipsDto:StarShipsDto){
        return getStarShipsUseCase(starshipsDto)
    }

    async getVehicles(vehiclesDto:VehiclesDto){
        return getVehiclesUseCase(vehiclesDto)
    }

    // Método para obtener todos los films de la base de datos
    async getAllFilms() {
        return this.newFilmRepository.find(); 
    }

}
