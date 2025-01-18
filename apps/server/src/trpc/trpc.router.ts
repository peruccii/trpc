import { INestApplication, Injectable } from '@nestjs/common';
import { TrpcService } from './trpc.service';
import * as trpcExpress from '@trpc/server/adapters/express';
import { GetDataService } from '@server/application/usecases/getdata.service';
import {
  schema,
  TypeAge,
} from '@server/application/zod/schemas/get-name.schema';

@Injectable()
export class TrpcRouter {
  constructor(
    private readonly trpc: TrpcService,
    private readonly dataService: GetDataService,
  ) {}

  appRouter = this.trpc.router({
    getData: this.trpc.procedure.input(schema).query(({ input }) => {
      const raw_input: TypeAge = {
        age: input.age,
      };

      return this.dataService.getData(raw_input);
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
