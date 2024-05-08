import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import { LoginService } from '../service/login.service';
import { LoginRequest } from '../interfaces/loginRequest';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  constructor(private formBuilder:FormBuilder, private loginService:LoginService, private router:Router){}

  loginError:string = "";

  loginForm = this.formBuilder.group({
    username:['', [Validators.required]],
    password:['', [Validators.required]]
  })

  get username() {
    return this.loginForm.controls.username;
  }
  get password() {
    return this.loginForm.controls.password;
  }

  login() {
    if (this.loginForm.valid) {
      this.loginService.login(this.loginForm.value as LoginRequest).subscribe({
        next: (token) => {
          this.router.navigate(['/paciente']);
        },
        error: (errorData) => {
          console.log(errorData);
          this.loginError=errorData;
        },
        complete: () => {
          console.info("Login Completo");
          this.loginForm.reset();
        }
      });
    } else {
      this.loginForm.markAllAsTouched();
    }
  }

}
