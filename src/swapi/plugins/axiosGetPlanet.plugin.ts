import axios from 'axios';
import { PlanetDto } from '../dtos';
import { HttpException, HttpStatus } from '@nestjs/common';

export const axiosGetPlanet = async (planetDto:PlanetDto)=>{
    try {
        const baseUrl = process.env.URL_SWAPI_PLANETS;
        const url = planetDto.id ? `${baseUrl}${planetDto.id}` : baseUrl;
        const response = await axios.get(url);

        return response.data;
    } catch (error) {
        console.log('axiosGetPlanet - Error:', { error });
        throw new HttpException('Error al obtener los datos de Planet',HttpStatus.INTERNAL_SERVER_ERROR);
    }
}

