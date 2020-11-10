import { Response, Request } from 'express';
import { LOGGER, LoggerInterface } from '../frameworks/logger';
import { MESSAGES } from '@nestjs/core/constants';
import { isObject } from '@nestjs/common/utils/shared.utils';
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  Inject,
  HttpStatus,
} from '@nestjs/common';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(@Inject(LOGGER) private readonly logger: LoggerInterface) {}

  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();
    this.logger.error(
      `${exception.constructor.name}: ${exception.message}`,
      exception.stack,
      this.constructor.name,
    );
    let resBody;
    if (!(exception instanceof HttpException)) {
      // 非http-exception，统一处理
      resBody = {
        code: HttpStatus.INTERNAL_SERVER_ERROR,
        msg: MESSAGES.UNKNOWN_EXCEPTION_MESSAGE,
      };
      response.status(HttpStatus.INTERNAL_SERVER_ERROR).json(resBody);
    } else {
      const status = exception.getStatus();
      const msg = exception.getResponse();
      if (isObject(msg)) {
        const obj = msg as any;
        resBody = {
          code: obj.code || obj.statusCode,
          msg: obj.msg || obj.message,
          data: obj.data || obj.error,
        };
      } else {
        resBody = { code: status, msg };
      }
      response.status(status).json(resBody);
    }
    this.logger.verbose(
      `response(${request.originalUrl}): ${JSON.stringify(resBody)}`,
      this.constructor.name,
    );
  }
}
