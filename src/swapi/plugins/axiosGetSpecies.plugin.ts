import axios from 'axios';
import { SpeciesDto } from '../dtos';
import { HttpException, HttpStatus } from '@nestjs/common';

export const axiosGetSpecies = async (speciesDto:SpeciesDto)=>{
    try {
        const baseUrl = process.env.URL_SWAPI_SPECIES;
        const url = speciesDto.id ? `${baseUrl}${speciesDto.id}` : baseUrl;
        const response = await axios.get(url);

        return response.data;
    } catch (error) {
        console.log('axiosGetSpecies - Error:', { error });
        throw new HttpException('Error al obtener los datos de Species',HttpStatus.INTERNAL_SERVER_ERROR);
    }
}

