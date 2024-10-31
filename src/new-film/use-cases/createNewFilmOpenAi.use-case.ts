import OpenAI from 'openai';

import { Repository } from 'typeorm';
import { NewFilmEntity } from '../entity';
import { HttpException, HttpStatus } from '@nestjs/common';

interface Options {
  prompt: string;
  filmName: string;
  personaName: string;
  planetaName: string;
  specieName: string;
  starshipName: string;
  vehiculoName: string;
  emocion: string;
}

export const createNewFilmOpenAiUseCase = async(openai:OpenAI, options:Options,newFilmRepository: Repository<NewFilmEntity>)=>{

  const { prompt,filmName,personaName,planetaName,specieName,starshipName,vehiculoName,emocion } = options;
   try {
    const completion = await openai.chat.completions.create({
      messages: [{ 
        role: "system",
        content: prompt,
       },
       {
        role:"user",
        content: prompt,
       }
      
      ],
      model: "gpt-3.5-turbo-1106",
      temperature:0.3,
      max_tokens:1500,
      response_format:{
        type:'text'
      }
    });
  
  
    const nuevoFilmGenerado = completion.choices[0].message.content;
  
    const newFilm = newFilmRepository.create({
      nuevoFilm: nuevoFilmGenerado,
      nombreFilm: filmName,
      persona: personaName,
      planeta: planetaName,
      especie: specieName,
      nave: starshipName,
      vehiculo: vehiculoName,
      emocion,
    });
  
    await newFilmRepository.save(newFilm);
  
    return newFilm
   } catch (error) {
    console.error('createNewFilmOpenAiUseCase - Error:', error);
    throw new HttpException('Error en createNewFilmOpenAiUseCase', HttpStatus.INTERNAL_SERVER_ERROR);
  }
  
  
}