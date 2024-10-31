import { getSpeciesUseCase } from "src/swapi/use-cases";
import { SpeciesDto } from "../../../swapi/dtos";
import { axiosGetSpecies } from "../../../swapi/plugins/axiosGetSpecies.plugin";

// Mock para axiosGetSpecies
jest.mock('../../../swapi/plugins/axiosGetSpecies.plugin', () => ({
  axiosGetSpecies: jest.fn(),
}));

describe('getSpeciesUseCase', () => {
  it('debe retornar datos de una especie formateados correctamente cuando se proporciona un ID', async () => {
    // Inicialización
    const mockSpeciesData = {
      name: "Human",
      classification: "Mammal",
      designation: "Sentient",
      average_height: "180",
      average_lifespan: "120",
      eye_colors: "brown, blue, green",
      hair_colors: "black, brown, blonde",
      skin_colors: "light, fair, dark",
      language: "Galactic Basic",
      homeworld: "Coruscant",
      people: ["Person1", "Person2"],
      films: ["Film1", "Film2"],
      url: "https://swapi.dev/api/species/1/",
      created: "2023-10-25T10:19:25.584Z",
      edited: "2023-10-25T10:19:25.584Z",
    };

    // Configurar el mock para axiosGetSpecies
    (axiosGetSpecies as jest.Mock).mockResolvedValue(mockSpeciesData);

    // Crear un SpeciesDto para probar
    const speciesDto: SpeciesDto = { id: "1" };

    // Estímulo
    const result = await getSpeciesUseCase(speciesDto);

    // Aserción
    expect(axiosGetSpecies).toHaveBeenCalledWith(speciesDto);
    expect(result).toEqual({
      nombre: mockSpeciesData.name,
      clasificacion: mockSpeciesData.classification,
      designacion: mockSpeciesData.designation,
      altura_promedio: mockSpeciesData.average_height,
      esperanza_vida_promedio: mockSpeciesData.average_lifespan,
      colores_ojos: mockSpeciesData.eye_colors,
      colores_cabello: mockSpeciesData.hair_colors,
      colores_piel: mockSpeciesData.skin_colors,
      lenguaje: mockSpeciesData.language,
      planeta_origen: mockSpeciesData.homeworld,
      personas: mockSpeciesData.people,
      peliculas: mockSpeciesData.films,
      url: mockSpeciesData.url,
      creado: mockSpeciesData.created,
      editado: mockSpeciesData.edited,
    });
  });
});