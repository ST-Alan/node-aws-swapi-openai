# Documentación de Endpoints

Esta documentación describe cómo consumir los endpoints disponibles para interactuar con SWAPI y OpenAI para la generación y manipulación de datos de películas.

## Endpoints Disponibles

### Obtener Todos los Films Generados por OpenAI

**GET** `/swapi/films`  
URL: `https://l9hcg9cs-3000.use2.devtunnels.ms/swapi/films`

### Obtener Listas de Recursos

Puedes acceder a las listas de diferentes recursos disponibles en SWAPI usando los siguientes endpoints:

- **GET** `/swapi/get-films`  
  URL: `https://l9hcg9cs-3000.use2.devtunnels.ms/swapi/get-films`

- **GET** `/swapi/get-people`  
  URL: `https://l9hcg9cs-3000.use2.devtunnels.ms/swapi/get-people`

- **GET** `/swapi/get-planet`  
  URL: `https://l9hcg9cs-3000.use2.devtunnels.ms/swapi/get-planet`

- **GET** `/swapi/get-species`  
  URL: `https://l9hcg9cs-3000.use2.devtunnels.ms/swapi/get-species`

- **GET** `/swapi/get-starships`  
  URL: `https://l9hcg9cs-3000.use2.devtunnels.ms/swapi/get-starships`

- **GET** `/swapi/get-vehicles`  
  URL: `https://l9hcg9cs-3000.use2.devtunnels.ms/swapi/get-vehicles`

### Obtener un Elemento Específico

Para obtener un recurso específico, añade el parámetro `id` en los siguientes endpoints:

- **GET** `/swapi/get-films?id={id}`
- **GET** `/swapi/get-people?id={id}`
- **GET** `/swapi/get-planet?id={id}`
- **GET** `/swapi/get-species?id={id}`
- **GET** `/swapi/get-starships?id={id}`
- **GET** `/swapi/get-vehicles?id={id}`

### Crear una Nueva Historia con OpenAI

Para generar una nueva historia utilizando OpenAI y recursos de SWAPI, y guardarla en la base de datos:

**POST** `/new-film/new-film-with-sawapi-data`  
URL: `https://l9hcg9cs-3000.use2.devtunnels.ms/new-film/new-film-with-sawapi-data`

**Body Example:**
```json
{
  "idFilm": 5,
  "idPerson": "33",
  "idPlanet": "9",
  "idSpecies": "6",
  "idStarship": "5",
  "idVehicle": "7",
  "emocion": "drama de novela"
}
```

## Consideraciones Importantes

### Endpoints Inaccesibles de SWAPI

Estos endpoints retornan errores y deben ser evitados:

- Starships: IDs `1`, `6`
- Vehicles: IDs `1`, `2`, `3`, `9`, `10`, `11`, `12`

Si se solicita un recurso desde `/swapi/get-starships` o `/swapi/get-vehicles` con estos IDs, se recibirá un error.

### Restricciones de Parámetros

- `idFilm`: debe ser un número entre `1` y `7`.
- `idVehicle`: los IDs `1`, `2`, `3`, `9`, `10`, `11`, `12` no están disponibles.
- `idStarship`: el ID `1` no está disponible.

### Ejemplos de Peticiones POST No Operativas

```json
{
  "idFilm": 12,
  "idPerson": "12",
  "idPlanet": "12",
  "idSpecies": "12",
  "idStarship": "1",
  "idVehicle": "1",
  "emocion": "amor"
}
```

## Despliegue de la Aplicación

1. Instalar `awscli`.
2. Ejecutar `aws configure` y ajustar las credenciales.
3. Revisar y modificar, si es necesario, la configuración de región en el archivo `serverless.yml`, línea 6.
4. Desplegar usando: `serverless deploy`
5. Para ver offline:
```bash
serverless offline
```

## Pruebas Unitarias

Para ejecutar las pruebas unitarias, primero corre la aplicación localmente:
```bash
npm run test:watch
```



Luego usa:

```bash
npm run test
```

Para modo observador:

```bash
npm run test:watch
```

Este markdown ahora ofrece una presentación más profesional y clara de la información. La estructura jerárquica y el formato mejorados ayudan a los desarrolladores a seguir fácilmente las instrucciones y entender los detalles importantes del servicio y sus restricciones.

# DATO IMPORTANTE
Las variables de entorno están solo para modo de prueba. Las coloqué para que el reto pueda funcionar usando la API de Open AI

