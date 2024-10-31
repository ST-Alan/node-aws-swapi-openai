import { HttpException, HttpStatus } from "@nestjs/common";
import { VehiclesDto } from "../dtos";
import { axiosGetVehicles } from "../plugins";


export const getVehiclesUseCase = async (vehiclesDto:VehiclesDto)=>{
try {
    const vehicles = await axiosGetVehicles(vehiclesDto)
    if (vehiclesDto.id) {
        // Traducción de un solo vehículo
        return {
          nombre: vehicles.name,
          modelo: vehicles.model,
          clase_vehiculo: vehicles.vehicle_class,
          fabricante: vehicles.manufacturer,
          longitud: vehicles.length,
          costo_creditos: vehicles.cost_in_credits,
          tripulacion: vehicles.crew,
          pasajeros: vehicles.passengers,
          velocidad_maxima_atmosfera: vehicles.max_atmosphering_speed,
          capacidad_carga: vehicles.cargo_capacity,
          consumibles: vehicles.consumables,
          peliculas: vehicles.films,
          pilotos: vehicles.pilots,
          url: vehicles.url,
          creado: vehicles.created,
          editado: vehicles.edited,
        };
      } else {
        // Traducción de lista de vehículos
        return {
          conteo: vehicles.count,
          siguiente: vehicles.next,
          anterior: vehicles.previous,
          resultados: vehicles.results.map((vehicle: any) => ({
            nombre: vehicle.name,
            modelo: vehicle.model,
            clase_vehiculo: vehicle.vehicle_class,
            fabricante: vehicle.manufacturer,
            longitud: vehicle.length,
            costo_creditos: vehicle.cost_in_credits,
            tripulacion: vehicle.crew,
            pasajeros: vehicle.passengers,
            velocidad_maxima_atmosfera: vehicle.max_atmosphering_speed,
            capacidad_carga: vehicle.cargo_capacity,
            consumibles: vehicle.consumables,
            peliculas: vehicle.films,
            pilotos: vehicle.pilots,
            url: vehicle.url,
            creado: vehicle.created,
            editado: vehicle.edited,
          })),
        };
      }
} catch (error) {
    console.error('Error en getVehiclesUseCase:', error);
    throw new HttpException('Error al obtener los datos de vehiculos',HttpStatus.INTERNAL_SERVER_ERROR);
}
    

}