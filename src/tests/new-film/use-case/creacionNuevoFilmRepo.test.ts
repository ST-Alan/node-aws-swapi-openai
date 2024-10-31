import { NewFilmEntity } from 'src/new-film/entity';
import { createNewFilmOpenAiUseCase } from 'src/new-film/use-cases';
import { Repository } from 'typeorm';


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

describe('createNewFilmOpenAiUseCase - Creación de película en el repositorio', () => {
  it('debe crear y guardar una nueva película en el repositorio', async () => {
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

    // Mock para creación y guardado en el repositorio
    const newFilm = { ...options, nuevoFilm: generatedContent };
    newFilmRepository.create.mockReturnValue(newFilm);
    newFilmRepository.save.mockResolvedValue(newFilm);

    // Estímulo
    const result = await createNewFilmOpenAiUseCase(
      openai as any, 
      options, 
      newFilmRepository as unknown as Repository<NewFilmEntity>,
    );

    // Aserción
    expect(newFilmRepository.create).toHaveBeenCalledWith({
      nuevoFilm: generatedContent,
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