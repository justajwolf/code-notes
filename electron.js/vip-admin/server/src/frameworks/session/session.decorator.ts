import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const Session = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    switch (ctx.getType()) {
      case 'http':
        return ctx.switchToHttp().getRequest().session;
      case 'ws':
        return ctx.switchToWs().getClient().handshake.session;
      default:
        return undefined;
    }
  },
);
