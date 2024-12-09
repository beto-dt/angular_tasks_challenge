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
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  registerForm!: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private router:Router) {
    this.registerForm = this.fb.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });
  }

  onSubmit() {
    console.log(this.registerForm.valid);
    if (this.registerForm.valid) {
      const dataLogin = this.registerForm.value;
      this.authService.createUser(dataLogin.email, dataLogin.password);
      this.router.navigate(['']);
    } else {
      this.registerForm.markAllAsTouched();
    }
  }
}
