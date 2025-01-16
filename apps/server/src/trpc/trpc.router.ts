import { INestApplication, Injectable } from '@nestjs/common';
import { TrpcService } from './trpc.service';
import * as trpcExpress from '@trpc/server/adapters/express';
import { getNameService } from '@server/application/usecases/getname.service';
import { schema } from '@server/application/zod/schemas/get-name.schema.ts';

@Injectable()
export class TrpcRouter {
  constructor(
    private readonly trpc: TrpcService,
    private readonly nameService: getNameService,
  ) {}

  appRouter = this.trpc.router({
    getName: this.trpc.procedure.input(schema).query(({ input }) => {
      const a = {
        name: input.name,
        age: input.age,
      };
      return this.nameService.getName(a);
    }),
  });

  async applyMiddleware(app: INestApplication) {
    app.use(
      `/internal/trpc`,
      trpcExpress.createExpressMiddleware({ router: this.appRouter }),
    );
  }
}

export type AppRouter = TrpcRouter['appRouter'];
