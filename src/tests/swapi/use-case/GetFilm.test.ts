
import { getPeopleUseCase } from "src/swapi/use-cases";
import { PeopleDto } from "../../../swapi/dtos";
import { axiosGetPeople } from "../../../swapi/plugins/axiosGetPeople.plugin";

// Mock para axiosGetPeople
jest.mock('../../../swapi/plugins/axiosGetPeople.plugin', () => ({
  axiosGetPeople: jest.fn(),
}));

describe('getPeopleUseCase', () => {
  it('debe retornar datos de una persona formateados correctamente cuando se proporciona un ID', async () => {
    // Inicialización
    const mockPeopleData = {
      name: "Luke Skywalker",
      birth_year: "19BBY",
      eye_color: "azul",
      gender: "masculino",
      hair_color: "rubio",
      height: "172",
      mass: "77",
      skin_color: "claro",
      homeworld: "Tatooine",
      films: ["Film1", "Film2"],
      species: [],
      starships: ["Starship1"],
      vehicles: ["Vehicle1"],
      url: "https://swapi.dev/api/people/1/",
      created: "2023-10-25T10:19:25.584Z",
      edited: "2023-10-25T10:19:25.584Z",
    };

    // Configurar el mock para axiosGetPeople
    (axiosGetPeople as jest.Mock).mockResolvedValue(mockPeopleData);

    // Crear un PeopleDto para probar
    const peopleDto: PeopleDto = { id: "1" };

    // Estímulo
    const result = await getPeopleUseCase(peopleDto);

    // Aserción
    expect(axiosGetPeople).toHaveBeenCalledWith(peopleDto);
    expect(result).toEqual({
      nombre: mockPeopleData.name,
      anio_nacimiento: mockPeopleData.birth_year,
      color_ojos: mockPeopleData.eye_color,
      genero: mockPeopleData.gender,
      color_cabello: mockPeopleData.hair_color,
      altura: mockPeopleData.height,
      peso: mockPeopleData.mass,
      color_piel: mockPeopleData.skin_color,
      mundo_natal: mockPeopleData.homeworld,
      peliculas: mockPeopleData.films,
      especies: mockPeopleData.species,
      naves: mockPeopleData.starships,
      vehiculos: mockPeopleData.vehicles,
      url: mockPeopleData.url,
      creado: mockPeopleData.created,
      editado: mockPeopleData.edited,
    });
  });
});