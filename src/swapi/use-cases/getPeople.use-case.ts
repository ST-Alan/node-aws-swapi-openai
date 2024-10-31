import { HttpException, HttpStatus } from "@nestjs/common";
import { PeopleDto } from "../dtos";
import { axiosGetPeople } from "../plugins";

export const getPeopleUseCase = async (peopleDto:PeopleDto)=>{
    try {
        const people = await axiosGetPeople(peopleDto)
        if (peopleDto.id) {
            return {
              nombre: people.name,
              anio_nacimiento: people.birth_year,
              color_ojos: people.eye_color,
              genero: people.gender,
              color_cabello: people.hair_color,
              altura: people.height,
              peso: people.mass,
              color_piel: people.skin_color,
              mundo_natal: people.homeworld,
              peliculas: people.films,
              especies: people.species,
              naves: people.starships,
              vehiculos: people.vehicles,
              url: people.url,
              creado: people.created,
              editado: people.edited,
            };
          } else {
            return {
              conteo: people.count,
              siguiente: people.next,
              anterior: people.previous,
              resultados: people.results.map((person: any) => ({
                nombre: person.name,
                anio_nacimiento: person.birth_year,
                color_ojos: person.eye_color,
                genero: person.gender,
                color_cabello: person.hair_color,
                altura: person.height,
                peso: person.mass,
                color_piel: person.skin_color,
                mundo_natal: person.homeworld,
                peliculas: person.films,
                especies: person.species,
                naves: person.starships,
                vehiculos: person.vehicles,
                url: person.url,
                creado: person.created,
                editado: person.edited,
              })),
            };
          }
        
    } catch (error) {
        console.error('Error en getFilmsUseCase:', error);
        throw new HttpException('Error al obtener los datos de películas',HttpStatus.INTERNAL_SERVER_ERROR);
    }
    
    

}