import { Injectable } from '@nestjs/common';
import { TrpcService } from './trpc.service';
import { z } from 'zod';

@Injectable()
export class TrpcRouter {
  constructor(private readonly trpc: TrpcService) {}

  appRouter = this.trpc.router({
    getName: this.trpc.procedure
      .input(z.object({ name: z.string() }))
      .query(({ input }) => {
        return `Hello ${input.name}`;
      }),
  });
}
