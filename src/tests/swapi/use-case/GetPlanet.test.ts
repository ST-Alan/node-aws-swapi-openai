import { getPlanetUseCase } from "src/swapi/use-cases";
import { PlanetDto } from "../../../swapi/dtos";
import { axiosGetPlanet } from "../../../swapi/plugins/axiosGetPlanet.plugin";

// Mock para axiosGetPlanet
jest.mock('../../../swapi/plugins/axiosGetPlanet.plugin', () => ({
  axiosGetPlanet: jest.fn(),
}));

describe('getPlanetUseCase', () => {
  it('debe retornar datos de un planeta formateados correctamente cuando se proporciona un ID', async () => {
    // Inicialización
    const mockPlanetData = {
      name: "Tatooine",
      diameter: "10465",
      rotation_period: "23",
      orbital_period: "304",
      gravity: "1 standard",
      population: "200000",
      climate: "arid",
      terrain: "desert",
      surface_water: "1",
      residents: ["Resident1", "Resident2"],
      films: ["Film1", "Film2"],
      url: "https://swapi.dev/api/planets/1/",
      created: "2023-10-25T10:19:25.584Z",
      edited: "2023-10-25T10:19:25.584Z",
    };

    // Configurar el mock para axiosGetPlanet
    (axiosGetPlanet as jest.Mock).mockResolvedValue(mockPlanetData);

    // Crear un PlanetDto para probar
    const planetDto: PlanetDto = { id: "1" };

    // Estímulo
    const result = await getPlanetUseCase(planetDto);

    // Aserción
    expect(axiosGetPlanet).toHaveBeenCalledWith(planetDto);
    expect(result).toEqual({
      nombre: mockPlanetData.name,
      diametro: mockPlanetData.diameter,
      periodo_rotacion: mockPlanetData.rotation_period,
      periodo_orbital: mockPlanetData.orbital_period,
      gravedad: mockPlanetData.gravity,
      poblacion: mockPlanetData.population,
      clima: mockPlanetData.climate,
      terreno: mockPlanetData.terrain,
      superficie_agua: mockPlanetData.surface_water,
      residentes: mockPlanetData.residents,
      peliculas: mockPlanetData.films,
      url: mockPlanetData.url,
      creado: mockPlanetData.created,
      editado: mockPlanetData.edited,
    });
  });
});