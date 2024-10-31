import axios from 'axios';
import { StarShipsDto } from '../dtos';
import { HttpException, HttpStatus } from '@nestjs/common';

export const axiosGetStarShips = async (starshipsDto:StarShipsDto)=>{
    try {
        const baseUrl = process.env.URL_SWAPI_STARTSHIPS;
        const url = starshipsDto.id ? `${baseUrl}${starshipsDto.id}` : baseUrl;
        const response = await axios.get(url);

        return response.data;
    } catch (error) {
        console.log('axiosGetStarShips - Error:', { error });
        throw new HttpException('Error al obtener los datos de StarShips',HttpStatus.INTERNAL_SERVER_ERROR);
    }
}

