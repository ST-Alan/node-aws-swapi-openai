import axios from 'axios';
import {  } from '../dtos/films.dto';
import { PeopleDto } from '../dtos';
import { HttpException, HttpStatus } from '@nestjs/common';

export const axiosGetPeople = async (peopleDto:PeopleDto)=>{
    try {
        const baseUrl = process.env.URL_SWAPI_PEOPLE;
        const url = peopleDto.id ? `${baseUrl}${peopleDto.id}` : baseUrl;
        const response = await axios.get(url); 

        return response.data;
    } catch (error) {
        console.log('axiosGetPeople - Error occurred:', { error });
        throw new HttpException('Error al obtener los datos de People',HttpStatus.INTERNAL_SERVER_ERROR);
    }
}

