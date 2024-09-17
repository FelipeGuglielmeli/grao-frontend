import { Component, HostListener } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MaterialModule } from '../share/material.module';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { LoginDto } from './login.dto';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MaterialModule, CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  width: number = 995;
  hide: boolean = true;
  loginForm: FormGroup;
  isLoading: boolean = false;

  constructor(
    readonly router: Router,
    private readonly api: ApiService,
    private snackBar: MatSnackBar
  ) {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.minLength(3), Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    });
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any): void {
    this.width = event.target.innerWidth;
  }

  login() {
    if (this.loginForm.invalid) {
      this.snackBar.open('Preencha os campos corretamente.', 'Fechar', { duration: 3000 });
      return;
    }

    this.isLoading = true;

    const email = this.loginForm.get('email')?.value;
    const password = this.loginForm.get('password')?.value;

    this.api.login(email, password).subscribe({
      next: (res: LoginDto) => {
        sessionStorage.setItem('accessToken', res.accessToken);
        sessionStorage.setItem('userName', res.user.name);
        sessionStorage.setItem('userId' , String(res.user.id))

        this.router.navigate(['/lista']);
      },
      error: (err) => {
        console.error(err);
        this.snackBar.open('Erro ao fazer login. Verifique suas credenciais.', 'Fechar', { duration: 3000 });
        this.isLoading = false;
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }

  togglePasswordVisibility(): void {
    this.hide = !this.hide;
  }
}
