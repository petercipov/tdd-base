import { Module, NestModule } from '@nestjs/common'
import { AppInit } from './app.init'
import { CommonModule } from './common/module'

@Module({
  imports: [ CommonModule ],
  providers: [ AppInit ]
})
export class RestAppModule implements NestModule {
  configure (): void {
    // NOOP
  }
}
