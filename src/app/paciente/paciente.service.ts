import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, identity, map, tap } from 'rxjs';
import { Paciente } from '../models/paciente.model';
import { AuthService } from '../service/auth.service';
import { Token } from '@angular/compiler';
import { Categoria } from '../models/categoria.model';

@Injectable({
  providedIn: 'root'
})
export class PacienteService {

  paciente:Paciente = new Paciente();

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
    
    return this.http.get<Paciente>(`http://localhost:8080/api/patients/get/${cedula}`, { headers }).pipe(
      map( apiResponse => this.mapToPaciente(apiResponse))
    );
  }

  mapToPaciente(apiResponse:any) : Paciente {
    return {
      id: apiResponse.newObject.patientId,
      identityCard: apiResponse.newObject.identityCard,
      name: apiResponse.newObject.name,
      lastname: apiResponse.newObject.lastname,
      category: {
        categoryId: apiResponse.newObject.category.categoryId,
        categoryName: apiResponse.newObject.category.categoryName,
        active: apiResponse.newObject.category.active
      },
      active: apiResponse.newObject.active
    }
  }

}
