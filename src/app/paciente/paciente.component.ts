import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { PacienteService } from './paciente.service';
import { Paciente } from '../models/paciente.model';
import { Categoria } from '../models/categoria.model';


@Component({
  selector: 'app-paciente',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './paciente.component.html',
  styleUrl: './paciente.component.css'
})
export class PacienteComponent implements OnInit, OnDestroy {
    
  userLoginOn:boolean = false;
  isAuthSubscription: Subscription = new Subscription;
  paciente:Paciente = new Paciente();
  
  pacienteForm = this.formBuilder.group({
    tipoDocumento:['', [Validators.required]],
    numeroDocumento:['', [Validators.required]],
    nombres:['', [Validators.required]],
    apellidos:['', [Validators.required]],
    tipoServicio:['', [Validators.required]],
    categoria:['', [Validators.required]]
  }) 

  get tipoDocumento(){
    return this.pacienteForm.controls.tipoDocumento;
  }
  get numeroDocumento(){
    return this.pacienteForm.controls.numeroDocumento;
  }
  get nombres(){
    return this.pacienteForm.controls.nombres;
  }
  get apellidos(){
    return this.pacienteForm.controls.apellidos;
  }
  get tipoServicio(){
    return this.pacienteForm.controls.tipoServicio;
  }
  get categoria(){
    return this.pacienteForm.controls.categoria;
  }

  formulario = JSON.stringify(this.pacienteForm.value);
        

  constructor(private authService:AuthService, private pacienteService:PacienteService, private router:Router, private formBuilder:FormBuilder){}

  ngOnDestroy(): void {
    // Desuscribirse cuando el componente se destruya
    this.isAuthSubscription.unsubscribe();
  }

  ngOnInit(): void {
    // Suscribirse al observable isAuth y guardar la referencia a la suscripción
    this.isAuthSubscription = this.authService.isAuth.subscribe(
      (userLoginOn) => {
        this.userLoginOn = userLoginOn;
      }
    );
  }

  logOut(): void {
    this.authService.logOut();
    this.router.navigate([""]);
  }

  getPacienteByIdentityCard() {
      const numeroDocumento = this.pacienteForm.controls.numeroDocumento.value;
      if ( numeroDocumento != null) {
        this.pacienteService.getPacienteByIdentityCard(numeroDocumento).subscribe({
          next: (apiResponse) => {
            this.paciente = apiResponse;
          }
      });  
      }
      
  }
}
