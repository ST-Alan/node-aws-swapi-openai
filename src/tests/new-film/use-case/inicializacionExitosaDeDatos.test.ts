import { Repository } from 'typeorm';
import { HttpException } from '@nestjs/common';
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

describe('createNewFilmOpenAiUseCase', () => {
  it('debe inicializar correctamente con opciones válidas', async () => {
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
    const nuevoFilmGenerado = 'Generated Film Content';
    openai.chat.completions.create.mockResolvedValue({
      choices: [{ message: { content: nuevoFilmGenerado } }],
    });

    // Mock para crear y guardar en el repository
    const newFilm = { ...options, nuevoFilm: nuevoFilmGenerado };
    newFilmRepository.create.mockReturnValue(newFilm);
    newFilmRepository.save.mockResolvedValue(newFilm);

    // Estímulo
    const result = await createNewFilmOpenAiUseCase(
      openai as any, 
      options, 
      newFilmRepository as unknown as Repository<NewFilmEntity>,
    );

    // Aserción
    expect(openai.chat.completions.create).toHaveBeenCalledWith({
      messages: [
        { role: 'system', content: options.prompt },
        { role: 'user', content: options.prompt },
      ],
      model: 'gpt-3.5-turbo-1106',
      temperature: 0.3,
      max_tokens: 1500,
      response_format: { type: 'text' },
    });

    expect(newFilmRepository.create).toHaveBeenCalledWith({
      nuevoFilm: nuevoFilmGenerado,
      nombreFilm: options.filmName,
      persona: options.personaName,
      planeta: options.planetaName,
      especie: options.specieName,
      nave: options.starshipName,
      vehiculo: options.vehiculoName,
      emocion: options.emocion,
    });

    expect(newFilmRepository.save).toHaveBeenCalledWith(newFilm);
    expect(result).toEqual(newFilm);
  });
});