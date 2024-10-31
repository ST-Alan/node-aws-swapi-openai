import { Module } from '@nestjs/common';
import { SwapiService } from './swapi.service';
import { SwapiController } from './swapi.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NewFilmEntity } from 'src/new-film/entity';

@Module({
  imports: [TypeOrmModule.forFeature([NewFilmEntity])], //Importar repositorio desde el recurso new-film
  controllers: [SwapiController],
  providers: [SwapiService],
  exports:[SwapiService] //exporto el servicio para que pueda ser usa para usar los endpoint get en el recurso new-film
})
export class SwapiModule {}
