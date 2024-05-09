import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-paciente',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './paciente.component.html',
  styleUrl: './paciente.component.css'
})
export class PacienteComponent implements OnInit, OnDestroy {
    
  userLoginOn:boolean = false;
    
  constructor(private authService:AuthService){}

  ngOnDestroy(): void {
    this.authService.token.unsubscribe();
    this.authService.isAuth.unsubscribe();
  }

  ngOnInit(): void {
    this.authService.isAuth.subscribe(
      {
        next:(userLoginOn) => {
          this.userLoginOn=userLoginOn;
        }
      }
    )
  }

  logOut(): void {
    this.authService.logOut();
  }
}
