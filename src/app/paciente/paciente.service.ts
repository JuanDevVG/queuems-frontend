import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map} from 'rxjs';
import { Paciente } from '../models/paciente.model';
import { AuthService } from '../service/auth.service';
import { Categoria } from '../models/categoria.model';
import { Servicio } from '../models/servicio.model';
import { Schedule } from '../models/schedule.model';

@Injectable({
  providedIn: 'root'
})
export class PacienteService {

  constructor(private http: HttpClient, private authservice: AuthService) { }

  getPacienteByIdentityCard(cedula: string): Observable<Paciente> {
    const headers: HttpHeaders = this.getHeaders();
    return this.http.get<Paciente>(`http://localhost:8080/api/patients/get/${cedula}`, { headers }).pipe(
      map(apiResponse => this.mapToPaciente(apiResponse))
    );
  }

  crearPaciente(paciente: Paciente): Observable<any> {
    const headers: HttpHeaders = this.getHeaders();
    return this.http.post<Paciente>(`http://localhost:8080/api/patients/create`, paciente, { headers })
  }

  updatePaciente(paciente: Paciente): Observable<any> {
    const headers: HttpHeaders = this.getHeaders();
    return this.http.put<Paciente>(`http://localhost:8080/api/patients/update`, paciente, { headers })
  }

  getCategorias(): Observable<any> {
    const headers: HttpHeaders = this.getHeaders();
    return this.http.get<Categoria>(`http://localhost:8080/api/category/get`, { headers });
  }

  getServicios(): Observable<any> {
    const headers: HttpHeaders = this.getHeaders();
    return this.http.get<Servicio>(`http://localhost:8080/api/service/get`, { headers });
  }

  generateTurno(schedule: Schedule): Observable<any> {
    const headers: HttpHeaders = this.getHeaders();
    return this.http.post<Schedule>(`http://localhost:8080/api/schedule/generate`, schedule , { headers });
  }

  mapToPaciente(apiResponse: any): Paciente {

    return {
      patientId: apiResponse.newObject.patientId,
      idType: apiResponse.newObject.idType,
      identityCard: apiResponse.newObject.identityCard,
      name: apiResponse.newObject.name,
      lastname: apiResponse.newObject.lastname,
      category: {
        categoryId: apiResponse.newObject.category.categoryId,
        categoryName: apiResponse.newObject.category.categoryName,
        categoryDescription: apiResponse.newObject.category.categoryDescription,
        active: apiResponse.newObject.category.active
      },
      active: apiResponse.newObject.active
    }
  }

  mapToCategory(apiResponse: any): Categoria {
    console.log(apiResponse);

    return {
      categoryId: apiResponse.newObject.category.categoryId,
      categoryName: apiResponse.newObject.category.categoryName,
      categoryDescription: apiResponse.newObject.categoryDescription,
      active: apiResponse.newObject.category.active
    }
  }

  getHeaders(): HttpHeaders {
    const tokenJson = localStorage.getItem('token');

    if (!tokenJson) {
      throw new Error('Token no encontrado en el localStorage.');
    }

    const token = JSON.parse(tokenJson);
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token.token}`
    });

    return headers; 
  }
}
