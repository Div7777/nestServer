import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class BeltGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    context.switchToHttp().getRequest();
    //validate request //we can also validate the request
    //const hasBlackBelt=request.user.belts.includes('black');
    return true;
  }
}
