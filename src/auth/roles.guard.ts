import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { UserRole } from "src/user/user.schema";

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<UserRole[]>('roles', context.getHandler());
    
    // Afficher les rôles requis pour la route
    console.log('Roles requis pour cette route:', roles);

    if (!roles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    // Afficher l'utilisateur authentifié
    console.log('Utilisateur authentifié:', user);

    // Si l'utilisateur n'a pas le rôle requis, retourner false
    const hasRole = roles.includes(user?.role); 
    if (!hasRole) {
      console.log(`Utilisateur avec le rôle ${user?.role} non autorisé`);
    }

    return hasRole;
  }
}
