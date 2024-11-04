import axios from 'axios';
import { VehiclesDto } from '../dtos';
import { HttpException, HttpStatus } from '@nestjs/common';

export const axiosGetVehicles = async (vehiclesDto:VehiclesDto)=>{
    try {
        const baseUrl = process.env.URL_SWAPI_VEHICLES;
        const url = vehiclesDto.id ? `${baseUrl}${vehiclesDto.id}` : baseUrl;
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.log('axiosGetVehicles - Error:', { error });
        throw new HttpException('Error al obtener los datos de vehiculos',HttpStatus.INTERNAL_SERVER_ERROR);
    }
}

