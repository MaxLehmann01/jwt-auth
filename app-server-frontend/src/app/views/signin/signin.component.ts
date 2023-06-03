import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent {
  progressAnimation: boolean = false;

  recordCredentials: any = {
    user: '',
    pass: ''
  }

  constructor(
    private router: Router,
    private serviceAuth: AuthService
  ){ }

  authSignIn(){
    this.progressAnimation = true;
    this.serviceAuth.post({ app: 'app1', credentials: this.recordCredentials}, 'authorize').subscribe(res => {
      this.progressAnimation = false;

      localStorage.setItem('jwt-at', res.body.at);
      this.router.navigate(['/']);
    })
    
  }
}
