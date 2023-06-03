import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  recordUser: any;

  constructor(
    private router: Router,
    private serviceAuth: AuthService
  ) { }


  ngOnInit(): void {
      this.serviceAuth.post(null, '').subscribe(res => {
        this.recordUser = res.body.user;
      }, err => {
        if(err.status == 401 || err.status == 403){
          this.serviceAuth.post({ app: 'app1' }, 'token').subscribe(res => {
            localStorage.setItem('jwt-at', res.body.at);
            this.ngOnInit();
          }, err => {
            this.router.navigate(['/signin']);
          })
        }
      })
  }
}
