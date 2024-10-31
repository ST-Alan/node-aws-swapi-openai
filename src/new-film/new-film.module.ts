import { Module } from '@nestjs/common';
import { NewFilmService } from './new-film.service';
import { NewFilmController } from './new-film.controller';
import { SwapiModule } from 'src/swapi/swapi.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NewFilmEntity } from './entity';

@Module({
  imports:[TypeOrmModule.forFeature([NewFilmEntity]),SwapiModule],
  controllers: [NewFilmController],
  providers: [NewFilmService],
  
})
export class NewFilmModule {}
