import { Injectable } from '@angular/core';
import { LoginRequest } from '../interfaces/loginRequest';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError, BehaviorSubject, tap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isAuth: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  token: BehaviorSubject<string> = new BehaviorSubject<string>("");

  constructor(private http:HttpClient, private router: Router) {
    this.autoSignIn();
  }

  autoSignIn() {
    if (localStorage.getItem('token')) {
        this.isAuth.next(true);
        this.router.navigate(['/paciente']);
    }
  }

  login(credentials:LoginRequest):Observable<string>{

    return this.http.post<string>('http://localhost:8080/auth/login', credentials).pipe(
      tap( (token:string) => {
        const tokenUser = JSON.stringify(token);
        localStorage.setItem('token', tokenUser);
        this.setLoggedIn(true);
      }),
      catchError(this.handledError)
    )

  }

  logOut():void {
    localStorage.removeItem('token');
    this.setLoggedIn(false);
    this.router.navigate(['']);
  }

  private handledError(error:HttpErrorResponse){ 

    if (error.status===0) {
      console.error('se ha producido un error ', error.error);
    } else {
      console.error('Backend retornó el codigo de estado ', error.status, error.error);
    }
    return throwError(()=> new Error('Algo fallo. Por favor intente nuevamente.'));
  }

  setLoggedIn(auth: boolean) {
    this.isAuth.next(auth);
  }

  get tokenUser():Observable<string>{

    return this.token.asObservable();
  }

  get userLoginOn():Observable<boolean> {

    return this.isAuth.asObservable();
  }

}
