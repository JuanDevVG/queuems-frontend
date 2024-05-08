import { Component, OnDestroy, OnInit } from '@angular/core';
import { LoginService } from '../service/login.service';

@Component({
  selector: 'app-paciente',
  standalone: true,
  imports: [],
  templateUrl: './paciente.component.html',
  styleUrl: './paciente.component.css'
})
export class PacienteComponent implements OnInit, OnDestroy {
    
  userLoginOn:boolean = false;
    
  constructor(private loginService:LoginService){}

  ngOnDestroy(): void {
    this.loginService.token.unsubscribe();
    this.loginService.currentUserLoginOn.unsubscribe();
  }

  ngOnInit(): void {
    this.loginService.currentUserLoginOn.subscribe(
      {
        next:(userLoginOn) => {
          this.userLoginOn=userLoginOn;
        }
      }
    )
  }
}
