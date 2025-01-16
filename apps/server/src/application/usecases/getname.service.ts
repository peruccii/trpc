import { Injectable } from '@nestjs/common';

interface a {
  name: string;
  age: number;
}

@Injectable()
export class getNameService {
  constructor() {}

  getName(a: a): string {
    return `Hello, ${a.name}, age ${a.age}`;
  }
}
