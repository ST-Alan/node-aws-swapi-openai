import { getVehiclesUseCase } from "src/swapi/use-cases";
import { VehiclesDto } from "../../../swapi/dtos";
import { axiosGetVehicles } from "../../../swapi/plugins/axiosGetVehicles.plugin";

// Mock para axiosGetVehicles
jest.mock('../../../swapi/plugins/axiosGetVehicles.plugin', () => ({
  axiosGetVehicles: jest.fn(),
}));

describe('getVehiclesUseCase', () => {
  it('debe retornar datos de un vehículo formateados correctamente cuando se proporciona un ID', async () => {
    // Inicialización
    const mockVehicleData = {
      name: "X-wing",
      model: "T-65 X-wing",
      vehicle_class: "Starfighter",
      manufacturer: "Incom Corporation",
      length: "12.5",
      cost_in_credits: "149999",
      crew: "1",
      passengers: "0",
      max_atmosphering_speed: "1050",
      cargo_capacity: "110",
      consumables: "1 week",
      films: ["Film1", "Film2"],
      pilots: ["Pilot1", "Pilot2"],
      url: "https://swapi.dev/api/vehicles/1/",
      created: "2023-10-25T10:19:25.584Z",
      edited: "2023-10-25T10:19:25.584Z",
    };

    // Configurar el mock para axiosGetVehicles
    (axiosGetVehicles as jest.Mock).mockResolvedValue(mockVehicleData);

    // Crear un VehiclesDto para probar
    const vehiclesDto: VehiclesDto = { id: "1" };

    // Estímulo
    const result = await getVehiclesUseCase(vehiclesDto);

    // Aserción
    expect(axiosGetVehicles).toHaveBeenCalledWith(vehiclesDto);
    expect(result).toEqual({
      nombre: mockVehicleData.name,
      modelo: mockVehicleData.model,
      clase_vehiculo: mockVehicleData.vehicle_class,
      fabricante: mockVehicleData.manufacturer,
      longitud: mockVehicleData.length,
      costo_creditos: mockVehicleData.cost_in_credits,
      tripulacion: mockVehicleData.crew,
      pasajeros: mockVehicleData.passengers,
      velocidad_maxima_atmosfera: mockVehicleData.max_atmosphering_speed,
      capacidad_carga: mockVehicleData.cargo_capacity,
      consumibles: mockVehicleData.consumables,
      peliculas: mockVehicleData.films,
      pilotos: mockVehicleData.pilots,
      url: mockVehicleData.url,
      creado: mockVehicleData.created,
      editado: mockVehicleData.edited,
    });
  });
});