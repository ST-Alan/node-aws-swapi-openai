import { HttpException, HttpStatus } from "@nestjs/common";
import { FilmsDto } from "../dtos";
import { axiosGetFilms } from "../plugins";


export const getFilmsUseCase = async (filmsDto: FilmsDto)=>{
    try {
        
        const films = await axiosGetFilms(filmsDto);
    if (filmsDto.id) {
        return {
          titulo: films.title,
          episodio: films.episode_id,
          texto_apertura: films.opening_crawl,
          director: films.director,
          productor: films.producer,
          fecha_estreno: films.release_date,
          personajes: films.characters,
          planetas: films.planets,
          naves_estelares: films.starships,
          vehiculos: films.vehicles,
          especies: films.species,
          url: films.url,
          creado: films.created,
          editado: films.edited,
        };
      } else {
        return {
          conteo: films.count,
          siguiente: films.next,
          anterior: films.previous,
          resultados: films.results.map((film: any) => ({
            titulo: film.title,
            episodio: film.episode_id,
            texto_apertura: film.opening_crawl,
            director: film.director,
            productor: film.producer,
            fecha_estreno: film.release_date,
            personajes: film.characters,
            planetas: film.planets,
            naves_estelares: film.starships,
            vehiculos: film.vehicles,
            especies: film.species,
            url: film.url,
            creado: film.created,
            editado: film.edited,
          })),
        };
      }


    } catch (error) {
        console.error('Error en getFilmsUseCase:', error);
        throw new HttpException('Error al obtener los datos de películas',HttpStatus.INTERNAL_SERVER_ERROR);
    }
    
    
}