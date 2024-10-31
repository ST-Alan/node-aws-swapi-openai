import { Repository } from 'typeorm';

import { HttpException, HttpStatus } from '@nestjs/common';
import { NewFilmEntity } from 'src/new-film/entity';
import { createNewFilmOpenAiUseCase } from 'src/new-film/use-cases';

// Mock para OpenAI
const openai = {
  chat: {
    completions: {
      create: jest.fn(),
    },
  },
};

// Mock para Repository
const newFilmRepository = {
  create: jest.fn(),
  save: jest.fn(),
};

describe('createNewFilmOpenAiUseCase - Manejo de errores generales', () => {
  it('debe lanzar HttpException en caso de un error general', async () => {
    // Inicialización
    const options = {
      prompt: 'Create a new film',
      filmName: 'Sample Film',
      personaName: 'Sample Person',
      planetaName: 'Sample Planet',
      specieName: 'Sample Species',
      starshipName: 'Sample Starship',
      vehiculoName: 'Sample Vehicle',
      emocion: 'Happiness',
    };

    // Mock de la respuesta de OpenAI
    const generatedContent = 'Generated Film Content';
    openai.chat.completions.create.mockResolvedValue({
      choices: [{ message: { content: generatedContent } }],
    });

    // Simular un error en el repositorio
    const repositoryError = new Error('Database connection failed');
    newFilmRepository.save.mockRejectedValue(repositoryError);

    // Estímulo y Aserción
    await expect(createNewFilmOpenAiUseCase(
      openai as any, 
      options, 
      newFilmRepository as unknown as Repository<NewFilmEntity>,
    )).rejects.toThrow(HttpException);

    await expect(createNewFilmOpenAiUseCase(
      openai as any, 
      options, 
      newFilmRepository as unknown as Repository<NewFilmEntity>,
    )).rejects.toThrow(/Error en createNewFilmOpenAiUseCase/);

    await expect(createNewFilmOpenAiUseCase(
      openai as any, 
      options, 
      newFilmRepository as unknown as Repository<NewFilmEntity>,
    )).rejects.toThrow(expect.objectContaining({
      status: HttpStatus.INTERNAL_SERVER_ERROR,
    }));
  });
});