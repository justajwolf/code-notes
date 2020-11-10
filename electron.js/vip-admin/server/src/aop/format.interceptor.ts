import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as _ from 'lodash';
import { Request } from 'express';
import { LOGGER, LoggerInterface } from '../frameworks/logger';
import {
  CallHandler,
  ExecutionContext,
  Inject,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Socket } from 'socket.io';

@Injectable()
export class ResFormatInterceptor implements NestInterceptor {
  constructor(@Inject(LOGGER) private readonly logger: LoggerInterface) {}
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const loggerContext = this.constructor.name;
    let head, reqObj;
    switch (context.getType()) {
      case 'http':
        const { query, params, body, path } = context
          .switchToHttp()
          .getRequest<Request>();
        head = path;
        reqObj = { query, params, body };
        break;
      case 'ws':
        const client: Socket = context.switchToWs().getClient();
        head = `socketid:[${client.id}]`;
        reqObj = context.switchToWs().getData();
        break;
    }
    this.logger.verbose(
      `request(${head}): ${JSON.stringify(reqObj)}`,
      loggerContext,
    );
    return next.handle().pipe(
      map((x) => {
        const res: { code: number; msg: string; data?: any } = {
          code: 0,
          msg: 'ok',
        };
        if (_.isObject(x)) {
          _.has(x, 'code') && ((res.code = x.code), delete x.code);
          _.has(x, 'msg') && ((res.msg = x.msg), delete x.msg);
          switch (_.size(x)) {
            case 0:
              break;
            case 1:
              if (_.has(x, 'data')) {
                res.data = x.data;
                break;
              }
            default:
              res.data = x;
          }
        } else {
          res.data = x;
        }
        this.logger.verbose(
          `response(${head}): ${JSON.stringify(res)}`,
          loggerContext,
        );
        return res;
      }),
    );
  }
}
