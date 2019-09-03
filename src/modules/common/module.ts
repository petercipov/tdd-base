import { Global, Module } from '@nestjs/common'
import { loggerProvider } from './logger'
import { StatusController } from './status.controller'

@Global()
@Module({
  providers: [
    loggerProvider
  ],
  controllers: [
    StatusController
  ],
  exports: [
    loggerProvider
  ]
})
export class CommonModule {
}
