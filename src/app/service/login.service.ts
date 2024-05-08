import { Injectable } from '@angular/core';
import { LoginRequest } from '../interfaces/loginRequest';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError, BehaviorSubject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  currentUserLoginOn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  token: BehaviorSubject<string> = new BehaviorSubject<string>("");

  constructor(private http:HttpClient) {}

  login(credentials:LoginRequest):Observable<string>{
    return this.http.post<string>('http://localhost:8080/auth/login', credentials).pipe(
      tap( (token:string) => {
        this.token.next(token);
        this.currentUserLoginOn.next(true);
      }),
      catchError(this.handledError)
    )
  }

  private handledError(error:HttpErrorResponse){ 
    if (error.status===0) {
      console.error('se ha producido un error ', error.error);
    } else {
      console.error('Backend retornó el codigo de estado ', error.status, error.error);
    }
    return throwError(()=> new Error('Algo fallo. Por favor intente nuevamente.'));
  }

  get tokenUser():Observable<string>{
    return this.token.asObservable();
  }
  get userLoginOn():Observable<boolean> {
    return this.currentUserLoginOn.asObservable();
  }

}
