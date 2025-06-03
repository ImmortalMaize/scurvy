import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Request } from "express";

@Injectable()
export class AuthenticatedGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>('isPublic', [
      context.getHandler(),
      context.getClass(),
    ]);
    console.log(context.getClass())
    if (isPublic) {
      return true;
    }
    const request = context.switchToHttp().getRequest<Request>();
    console.log(request.body)
    console.log(request.user ?? "No user.");
    return request.isAuthenticated();
  }
}