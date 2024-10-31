import { HttpException, HttpStatus } from "@nestjs/common";
import { StarShipsDto } from "../dtos";
import { axiosGetStarShips } from "../plugins";


export const getStarShipsUseCase = async (starshipsDto:StarShipsDto)=>{
try {
    const starShips = await axiosGetStarShips(starshipsDto)
    if (starshipsDto.id) {
        return {
          nombre: starShips.name,
          modelo: starShips.model,
          clase_nave: starShips.starship_class,
          fabricante: starShips.manufacturer,
          costo_creditos: starShips.cost_in_credits,
          longitud: starShips.length,
          tripulacion: starShips.crew,
          pasajeros: starShips.passengers,
          velocidad_maxima_atmosfera: starShips.max_atmosphering_speed,
          hiperimpulsor_clase: starShips.hyperdrive_rating,
          MGLT: starShips.MGLT,
          capacidad_carga: starShips.cargo_capacity,
          consumibles: starShips.consumables,
          peliculas: starShips.films,
          pilotos: starShips.pilots,
          url: starShips.url,
          creado: starShips.created,
          editado: starShips.edited,
        };
      } else {
        return {
          conteo: starShips.count,
          siguiente: starShips.next,
          anterior: starShips.previous,
          resultados: starShips.results.map((ship: any) => ({
            nombre: ship.name,
            modelo: ship.model,
            clase_nave: ship.starship_class,
            fabricante: ship.manufacturer,
            costo_creditos: ship.cost_in_credits,
            longitud: ship.length,
            tripulacion: ship.crew,
            pasajeros: ship.passengers,
            velocidad_maxima_atmosfera: ship.max_atmosphering_speed,
            hiperimpulsor_clase: ship.hyperdrive_rating,
            MGLT: ship.MGLT,
            capacidad_carga: ship.cargo_capacity,
            consumibles: ship.consumables,
            peliculas: ship.films,
            pilotos: ship.pilots,
            url: ship.url,
            creado: ship.created,
            editado: ship.edited,
          })),
        };
      }

} catch (error) {
    console.error('Error en getFilmsUseCase:', error);
        throw new HttpException('Error al obtener los datos de películas',HttpStatus.INTERNAL_SERVER_ERROR);
}
    
    

}