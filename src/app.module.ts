import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleModule } from '@nestjs/schedule';
import { SwapiModule } from './swapi/swapi.module';
import { NewFilmModule } from './new-film/new-film.module';



@Module({
  imports: [
    ConfigModule.forRoot(),
    ScheduleModule.forRoot(),
    TypeOrmModule.forRoot({
      type:'mysql',
      host:process.env.DB_HOST,
      port:Number(process.env.DB_PORT),
      database:process.env.DB_NAME,
      username:process.env.DB_USERNAME,
      password:process.env.DB_PASSWORD,
      autoLoadEntities:true,
      synchronize:true,
      extra: {
        charset: "utf8mb4",
    }
    }),
    SwapiModule,
    NewFilmModule
  ]
})
export class AppModule {}
