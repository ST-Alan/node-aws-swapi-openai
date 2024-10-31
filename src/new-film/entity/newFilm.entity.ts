import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('films')
export class NewFilmEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  nuevoFilm: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  nombreFilm: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  persona: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  planeta: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  especie: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  nave: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  vehiculo: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  emocion: string;
}
