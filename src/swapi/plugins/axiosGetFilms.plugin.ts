import axios from 'axios';
import { FilmsDto } from '../dtos';
import { HttpException, HttpStatus } from '@nestjs/common';

export const axiosGetFilms = async (filmsDto: FilmsDto)=>{
    try {
        const baseUrl = process.env.URL_SWAPI_FILMS;
        const url = filmsDto.id ? `${baseUrl}${filmsDto.id}` : baseUrl;
        const response = await axios.get(url); 
        
        return response.data;
    } catch (error) {
        console.log('axiosGetFilms - Error:', { error });
        throw new HttpException('Error al obtener los datos de Films',HttpStatus.INTERNAL_SERVER_ERROR);
    }
}

