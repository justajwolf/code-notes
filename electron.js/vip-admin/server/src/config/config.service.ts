import * as Joi from 'joi';
import * as fs from 'fs';
import * as yaml from 'js-yaml';
import { argv } from 'yargs';

export interface EnvConfig {
  [key: string]: any;
}

/**
 * config 服务
 */
export class ConfigService {
  private readonly envConfig: EnvConfig;

  constructor(filePath: string) {
    // 配置文件优先级：CLI > ENV > ConfigFile
    const fileConfig = yaml.safeLoad(fs.readFileSync(filePath).toString()) as any;
    for (const key in process.env) {
      if (!key.startsWith(fileConfig.APP_NAME)) {
        continue;
      }
      if (process.env[key] !== '') {
        fileConfig[key.substring(fileConfig.APP_NAME.lenth)] = process.env[key];
      } else {
        fileConfig[key.substring(fileConfig.APP_NAME.lenth)] = true;
      }
    }
    for (const key in argv) {
      if (key === '_' || key === '$0') {
        continue;
      }
      fileConfig[key.toUpperCase().replace(/-/g, '_')] = argv[key];
    }
    this.envConfig = this.validateInput(fileConfig);
  }

  get(key: string): string {
    return this.envConfig[key];
  }

  getMysqlTestOptions(): any {
    return this.envConfig.MYSQL_TEST_OPTIONS;
  }

  getCrosHost(): any {
    return this.envConfig.CORS_HOST;
  }

  private validateInput(envConfig: EnvConfig): EnvConfig {
    const envVarsSchema: Joi.ObjectSchema = Joi.object({
      APP_NAME: Joi.string().default('quiz-game'),
      APP_ENV: Joi.string()
        .valid(['development', 'production', 'testing'])
        .default('development'),
      PORT: Joi.number().default(3000),
      LOGGER: Joi.string()
        .valid(['PlainLoggerService', 'JsonLoggerService'])
        .default('PlainLoggerService'),
      LOG_LEVEL: Joi.string().default('verbose'),
      MYSQL_TEST_OPTIONS: Joi.object().default({}),
      PERIOD_INTERVAL: Joi.number().required(),
      CORS_HOST: Joi.array().required(),
    }).pattern(/./, Joi.any());

    const { error, value: validatedEnvConfig } = envVarsSchema.validate(envConfig);
    if (error) {
      throw new Error(`Config validation error: ${error.message}`);
    }

    return validatedEnvConfig;
  }
}
