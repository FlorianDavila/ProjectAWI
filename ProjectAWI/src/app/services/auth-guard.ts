// import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
// import { Observable } from 'rxjs'; 
// import { Injectable } from '@angular/core';
// import { AuthService } from './auth.service';

// @Injectable()
// export class AuthGuard implements CanActivate {
//     constructor(private router: Router, private authService: AuthService) { }

//     canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
//         if(this.authService.correctCredentials) {
//             console.log("true")
//             this.router.navigate(["/accueil"]);
//             return true;
//         }
//         return false;
//     }
// }