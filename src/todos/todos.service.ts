import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Todo } from './entities/todo.entity';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Injectable()
export class TodosService {
  constructor(
    @InjectRepository(Todo)
    private readonly todosRepository: Repository<Todo>,
  ) {}

  async create({ title, userId }: CreateTodoDto): Promise<Pick<Todo, 'id'>> {
    const { id } = await this.todosRepository.save({
      title,
      user: {
        id: userId,
      },
    });
    return { id };
  }

  findAll(): Promise<Todo[]> {
    return this.todosRepository.find();
  }

  findOne(id: number): Promise<Todo> {
    return this.todosRepository.findOne(id);
  }

  async update(id: number, updateTodoDto: UpdateTodoDto) {
    const todo = await this.todosRepository.findOne(id);

    this.todosRepository.save(todo);

    return `This action updates a #${id} todo`;
  }

  remove(id: number) {
    return `This action removes a #${id} todo`;
  }
}
