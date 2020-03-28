import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public email: string="";
  public password: string="";
  errorMessage: string;
  successMessage: string;
  constructor(private auth: AuthService) { }

  ngOnInit(): void {
    this.auth.logout()
  }
  googleSing() {
    this.auth.doGoogleLogin().then(() => {
      location.href = "/index"
    });

  }
  tryRegister() {
    console.log(this.email, this.password);
    this.auth.doRegister(this.email, this.password).then(()=>{
      window.location.href="/index"
    });
     
  }

}
