import { NestFactory } from '@nestjs/core'
import { AppInit } from './modules/app.init'
import { RestAppModule } from './modules/app.module'

async function bootstrap (): Promise<void> {
  const appModule = RestAppModule

  const app = await NestFactory.create(appModule)
  await app.select(appModule).get(AppInit).init(app)
}

bootstrap()
  .catch((err) => console.log(err))
