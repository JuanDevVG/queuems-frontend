import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, identity, tap } from 'rxjs';
import { Paciente } from '../models/paciente.model';
import { AuthService } from '../service/auth.service';
import { Token } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class PacienteService {

  paciente: Paciente = new Paciente(0,"","","","",false);

  constructor( private http:HttpClient, private authservice:AuthService ) {}

  getPacienteByIdentityCard(cedula:string): Observable<Paciente>{
    const tokenJson= localStorage.getItem('token');

    if (!tokenJson) {
      throw new Error('Token no encontrado en el localStorage.');
    }

    const token = JSON.parse(tokenJson);
    const headers = new HttpHeaders ({
      'Authorization': `Bearer ${token.token}`
    });
    
    console.log(headers.get('Authorization'));
    return this.http.get<Paciente>(`http://localhost:8080/api/patients/get/${cedula}`, { headers })
  }

}
