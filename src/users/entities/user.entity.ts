import { Todo } from 'src/todos/entities/todo.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    unique: true,
  })
  email: string;

  @Column({
    unique: true,
  })
  login: string;

  @OneToMany(() => Todo, (todo) => todo.user)
  todos: Todo[];
}
