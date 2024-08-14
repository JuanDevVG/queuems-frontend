import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { PacienteService } from './paciente.service';
import { Paciente } from '../models/paciente.model';
import { Categoria } from '../models/categoria.model';
import { TipoDocumento } from '../models/tipoDocumento';
import { Servicio } from '../models/servicio.model';
import { HttpResponse } from '@angular/common/http';


@Component({
  selector: 'app-paciente',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './paciente.component.html',
  styleUrl: './paciente.component.css'
})
export class PacienteComponent implements OnInit, OnDestroy {

  userLoginOn: boolean = false;
  isAuthSubscription: Subscription = new Subscription;
  private typingTimer: any;
  private typingDelay: number = 1000; // 3 segundos
  private identityInputChanges = new Subscription;
  paciente: Paciente = new Paciente();
  categorias: Categoria[] = [];
  servicios: Servicio[] = [];
  idTypes: TipoDocumento[] = [
    {'name': 'tarjetaIdentidad', 'description': 'Tarjeta de Identidad'},
    {'name': 'cedulaCiudadania', 'description': 'Cedula de Ciudadania'},
    {'name': 'cedulaExtranjera', 'description': 'Cedula extranjera'}
  ];

  pacienteForm = this.formBuilder.group({

    idType:['', [Validators.required]],
    identityCard:['', [Validators.required]],
    name:['', [Validators.required]],
    lastname:['', [Validators.required]],
    tipoServicio:['', [Validators.required]],
    category:[0 , [Validators.required]]
  })

  get tipoDocumento(){
    return this.pacienteForm.controls.idType;
  }
  get numeroDocumento(){
    return this.pacienteForm.controls.identityCard;
  }
  get nombres(){
    return this.pacienteForm.controls.name;
  }
  get apellidos(){
    return this.pacienteForm.controls.lastname;
  }
  get tipoServicio(){
    return this.pacienteForm.controls.tipoServicio;
  }
  get categoria(){
    return this.pacienteForm.controls.category;
  }


  constructor(private authService: AuthService, private pacienteService: PacienteService, private router: Router, private formBuilder: FormBuilder) { }

  ngOnDestroy(): void {
    // Desuscribirse cuando el componente se destruya
    this.isAuthSubscription.unsubscribe();

    if (this.identityInputChanges) {
      this.identityInputChanges.unsubscribe();
    }
    clearTimeout(this.typingTimer);
  }

  ngOnInit(): void {
    // Suscribirse al observable isAuth y guardar la referencia a la suscripción
    this.isAuthSubscription = this.authService.isAuth.subscribe(
      (userLoginOn) => {
        this.userLoginOn = userLoginOn;
      }
    );

    this.identityInputChanges = this.numeroDocumento.valueChanges
      .subscribe(identityCard => {
        if (identityCard != null) {
          this.handleTyping(identityCard);
        }
      });

    this.getCategorias();
    this.getServicios();

  }

  handleTyping(identityCard: string): void {
    // Clear the previous timer
    clearTimeout(this.typingTimer);

    // Set a new timer
    this.typingTimer = setTimeout(() => {
      this.autocompletarFormulario(identityCard)
    }, this.typingDelay);
  }

  logOut(): void {
    this.authService.logOut();
    this.router.navigate([""]);
  }

  autocompletarFormulario(identityCard: string) {

    this.pacienteService.getPacienteByIdentityCard(identityCard).subscribe({
      next: (apiResponse) => {
        this.paciente = apiResponse;
        console.log(this.paciente)
        this.pacienteForm.patchValue({
          idType: this.paciente.idType,
          name: this.paciente.name,
          lastname: this.paciente.lastname,
          category: this.paciente.category.categoryId
        })
        console.log(this.categoria)
      },
      error: () => {
        this.resetearFormularioParcial();
      }
    });
  }

  resetearFormularioParcial() {
    this.pacienteForm.patchValue({
      name: "",
      lastname: "",
      category: 0,
      tipoServicio: ""
    })
  }

  getCategorias() {
    this.pacienteService.getCategorias().subscribe(
      apiResponse => {
        this.categorias = apiResponse.newObject;
      })
  }

  getServicios() {
    this.pacienteService.getServicios().subscribe(
      apiResponse => {
        this.servicios = apiResponse;
      })
  }

  crearPaciente(): void {

    if (this.pacienteForm.valid) {
      const datosForm = this.pacienteForm.value;
      
      //Alistar datos de paciente a enviar
      const categoria: Categoria = {
        categoryId: Number(datosForm.category) ?? 0,
        categoryName: '',
        categoryDescription: '',
        active: true
      }
      this.paciente.idType = datosForm.idType ?? '';
      this.paciente.identityCard = datosForm.identityCard ?? '';
      this.paciente.name = datosForm.name ?? '';
      this.paciente.lastname = datosForm.lastname ?? '';
      this.paciente.category = categoria ??  {};

      this.pacienteService.crearPaciente(this.paciente).subscribe({
        next: (response: HttpResponse<any>) => {
          console.log(response.status);
        }
      });
    }
  }

}
