import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  loginForm!: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.loginForm = this.fb.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const dataLogin = this.loginForm.value;
      this.authService.VerityUser(dataLogin.email).subscribe((response) => {
          this.authService.onLogin(dataLogin.email,dataLogin.password);
        },

        (error) => {
          this.router.navigate(['register']);
        }
        );
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
}
