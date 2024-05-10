import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-paciente',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './paciente.component.html',
  styleUrl: './paciente.component.css'
})
export class PacienteComponent implements OnInit, OnDestroy {
    
  userLoginOn:boolean = false;
  isAuthSubscription: Subscription = new Subscription;

  constructor(private authService:AuthService, private router:Router){}

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
}
