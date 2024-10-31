import { HttpException, HttpStatus } from "@nestjs/common";
import { PlanetDto } from "../dtos";
import { axiosGetPlanet } from "../plugins";


export const getPlanetUseCase = async (planetDto:PlanetDto)=>{
    try {
        const planet = await axiosGetPlanet(planetDto)
        if (planetDto.id) {
            return {
              nombre: planet.name,
              diametro: planet.diameter,
              periodo_rotacion: planet.rotation_period,
              periodo_orbital: planet.orbital_period,
              gravedad: planet.gravity,
              poblacion: planet.population,
              clima: planet.climate,
              terreno: planet.terrain,
              superficie_agua: planet.surface_water,
              residentes: planet.residents,
              peliculas: planet.films,
              url: planet.url,
              creado: planet.created,
              editado: planet.edited,
            };
          } else {
            return {
              conteo: planet.count,
              siguiente: planet.next,
              anterior: planet.previous,
              resultados: planet.results.map((planetItem: any) => ({
                nombre: planetItem.name,
                diametro: planetItem.diameter,
                periodo_rotacion: planetItem.rotation_period,
                periodo_orbital: planetItem.orbital_period,
                gravedad: planetItem.gravity,
                poblacion: planetItem.population,
                clima: planetItem.climate,
                terreno: planetItem.terrain,
                superficie_agua: planetItem.surface_water,
                residentes: planetItem.residents,
                peliculas: planetItem.films,
                url: planetItem.url,
                creado: planetItem.created,
                editado: planetItem.edited,
              })),
            };
          }
    } catch (error) {
        console.error('Error en getFilmsUseCase:', error);
        throw new HttpException('Error al obtener los datos de películas',HttpStatus.INTERNAL_SERVER_ERROR);
    }
    
    

}