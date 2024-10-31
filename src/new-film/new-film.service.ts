import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { SwapiService } from 'src/swapi/swapi.service';
import { SwapiDataDto } from './dtos';
import { createNewFilmOpenAiUseCase } from './use-cases/index'
import { NewFilmEntity } from './entity';

import OpenAI from 'openai';

interface Options {
  prompt: string;
  filmName: string;
  personaName: string;
  planetaName: string;
  specieName: string;
  starshipName: string;
  vehiculoName: string;
  emocion: string;
}

@Injectable()
export class NewFilmService {

    private openai: OpenAI;

    constructor(private readonly swapiService: SwapiService,
      @InjectRepository(NewFilmEntity)
      private readonly newFilmRepository: Repository<NewFilmEntity>) {
        this.openai = new OpenAI({
            apiKey: process.env.OPENAI_API_KEY,
        });
    }



    async getSwapiData(swapiDataDto: SwapiDataDto) {
      const { idFilm, idPerson, idPlanet, idSpecies, idStarship, idVehicle, emocion } = swapiDataDto;
        try {
          const film =  idFilm ? await this.swapiService.getFilms({ id: idFilm }) : null;
          const person = idPerson ? await this.swapiService.getPeople({ id: idPerson }) : null;
          const planet = idPlanet ? await this.swapiService.getPlanet({ id: idPlanet }) : null;
          const species = idSpecies ? await this.swapiService.getSpecies({ id: idSpecies }) : null;
          const starship = idStarship ? await this.swapiService.getStarShips({ id: idStarship }) : null;
          const vehicle = idVehicle ? await this.swapiService.getVehicles({ id: idVehicle }) : null;
          const emocionFilm = emocion
    
          return {
            film,
            person,
            planet,
            species,
            starship,
            vehicle,
            emocionFilm
          };
        } catch (error) {
          console.error('getSwapiData - Error:', error);
          throw new HttpException('getSwapiData', HttpStatus.INTERNAL_SERVER_ERROR);
        }
      }


    async createMessageOpenAiWithData(swapiDataDto: SwapiDataDto) {
      try {
        const swapiData = await this.getSwapiData(swapiDataDto);
    
        const prompt = `
          Eres un asistente que debe crear un resumen muy breve de una película usando datos de la API SWAPI. A continuación, recibirás información sobre un personaje, un planeta, una especie, un vehículo y una emoción. Tu tarea es construir un breve resumen de una película que incluya estos elementos.
      
          Datos recibidos:
          - Trama del fim: ${JSON.stringify(swapiData.film)}
          - Personaje: ${JSON.stringify(swapiData.person)}
          - Planeta: ${JSON.stringify(swapiData.planet)}
          - Especie: ${JSON.stringify(swapiData.species)}
          - Starship: ${JSON.stringify(swapiData.starship)} 
          - Vehículo: ${JSON.stringify(swapiData.vehicle)}
          - Emoción: ${swapiData.emocionFilm}
          
          Genera un resumen de la película que incluya estos elementos, enfatizando la emoción indicada. Describe cómo se desarrolla la historia, los conflictos, y cómo se relacionan los personajes con la emoción que se les ha asignado.
          
          Sin inventar ningún dato, siempre con los datos que tienes.
        `;
        const options: Options = {
          prompt,
          filmName: swapiData.film?.titulo || 'Título desconocido',
          personaName: swapiData.person?.nombre || 'Nombre desconocido',
          planetaName: swapiData.planet?.nombre || 'Planeta desconocido',
          specieName: swapiData.species?.nombre || 'Especie desconocida',
          starshipName: swapiData.starship?.nombre || 'Nave desconocida',
          vehiculoName: swapiData.vehicle?.nombre || 'Vehículo desconocido',
          emocion: swapiData.emocionFilm || 'Emoción desconocida',
        };
      
        return await createNewFilmOpenAiUseCase(this.openai, options,this.newFilmRepository);
      } catch (error) {
          console.error('createMessageOpenAiWithData - Error:', error);
          throw new HttpException('createMessageOpenAiWithData', HttpStatus.INTERNAL_SERVER_ERROR);
      }

    }


}

