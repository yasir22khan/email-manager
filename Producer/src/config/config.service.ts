import { Injectable } from '@nestjs/common';
import { ConfigData } from './config.interface';

@Injectable()
export class ConfigService {
  private config: ConfigData;
  private eventConfig: ConfigData;

  constructor() {}

  public lofusingDotEnv() {
    this.config = this.parseConfigFromEnv(process.env);
  }

  private parseConfigFromEnv(env: NodeJS.ProcessEnv): ConfigData {
    return {
      env: env.NODE_ENV,
      port: parseInt(env.PORT, 10),
      logLevel: env.LOG_LEVEL,
    };
  }
}
