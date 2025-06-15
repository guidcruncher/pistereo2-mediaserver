import {
  CanActivate,
  createParamDecorator,
  ExecutionContext,
  Injectable,
  SetMetadata,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import * as crypto from 'node:crypto';

export const PublicKey = 'IsPublicKey';

export const Public = (...args: string[]) => SetMetadata(PublicKey, true);

export const Private = (...args: string[]) => SetMetadata(PublicKey, false);

export const AuthToken = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const [authType, token] = request.headers.authorization?.split(' ') ?? [];
    const authToken = authType === 'Bearer' ? token : '';
    request['authtoken'] = authToken;
    return authToken;
  },
);

export const hmac = (payload) => {
  let hmac = crypto.createHmac(
    'sha256',
    process.env.PISTEREO_MEDIASERVER_SECRET as string,
  );
  hmac.update(payload);
  return hmac.digest('hex');
};

const tokencompare = (client, expected) => {
  const a = Buffer.from(client);
  const b = Buffer.from(expected);
  return a.length === b.length && crypto.timingSafeEqual(a, b);
};

@Injectable()
export class TokenGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(PublicKey, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const [authType, token] = request.headers.authorization?.split(' ') ?? [];
    const clientToken = authType === 'Bearer' ? token : '';
    const serverToken = hmac(request.body);

    if (tokencompare(clientToken, serverToken)) {
      return true;
    } else {
      throw new UnauthorizedException();
    }

    throw new UnauthorizedException();
    return false;
  }
}
