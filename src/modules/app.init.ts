
import { INestApplication, Injectable, Inject } from '@nestjs/common'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { Logger, LOGGER } from './common/logger'

@Injectable()
export class AppInit {

  constructor (@Inject(LOGGER) private logger: Logger) {}

  async init (app: INestApplication): Promise<void> {
    await this.docs(app)
    const port = 8080
    await app.listen(port)
    this.logger.info(`Application listening on port ${port}, API documentation at http://localhost:${port}/swagger`)
  }

  async docs (app: INestApplication): Promise<void> {
    const options = new DocumentBuilder()
      .setTitle('Nest.js Base')
      .setDescription('1.0')
      .setVersion(`API Documentation`)
      .build()
    const document = SwaggerModule.createDocument(app, options)
    SwaggerModule.setup('/swagger', app, document)
  }
}
