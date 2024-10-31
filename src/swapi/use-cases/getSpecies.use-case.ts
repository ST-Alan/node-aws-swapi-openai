import { HttpException, HttpStatus } from "@nestjs/common";
import { SpeciesDto } from "../dtos";
import { axiosGetSpecies } from "../plugins";


export const getSpeciesUseCase = async (speciesDto:SpeciesDto)=>{
 try {
        const species = await axiosGetSpecies(speciesDto)
        if (speciesDto.id) {
              return {
                nombre: species.name,
                clasificacion: species.classification,
                designacion: species.designation,
                altura_promedio: species.average_height,
                esperanza_vida_promedio: species.average_lifespan,
                colores_ojos: species.eye_colors,
                colores_cabello: species.hair_colors,
                colores_piel: species.skin_colors,
                lenguaje: species.language,
                planeta_origen: species.homeworld,
                personas: species.people,
                peliculas: species.films,
                url: species.url,
                creado: species.created,
                editado: species.edited,
              };
            } else {
              return {
                conteo: species.count,
                siguiente: species.next,
                anterior: species.previous,
                resultados: species.results.map((specie: any) => ({
                  nombre: specie.name,
                  clasificacion: specie.classification,
                  designacion: specie.designation,
                  altura_promedio: specie.average_height,
                  esperanza_vida_promedio: specie.average_lifespan,
                  colores_ojos: specie.eye_colors,
                  colores_cabello: specie.hair_colors,
                  colores_piel: specie.skin_colors,
                  lenguaje: specie.language,
                  planeta_origen: specie.homeworld,
                  personas: specie.people,
                  peliculas: specie.films,
                  url: specie.url,
                  creado: specie.created,
                  editado: specie.edited,
                })),
              };
            }
 } catch (error) {
    console.error('Error en getFilmsUseCase:', error);
        throw new HttpException('Error al obtener los datos de películas',HttpStatus.INTERNAL_SERVER_ERROR);
 }
    
    

}