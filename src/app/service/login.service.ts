import { Injectable } from '@angular/core';
import { LoginRequest } from '../model/loginRequest';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http:HttpClient) {}

  login(credentials:LoginRequest):Observable<any>{
    return this.http.get('http://localhost:8080/auth/login').pipe(
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

}
