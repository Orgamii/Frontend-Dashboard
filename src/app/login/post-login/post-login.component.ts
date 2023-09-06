import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { APIService } from 'src/app/Shared/Services/api.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from 'src/environments/environment';
import * as CryptoJS from 'crypto-js';



@Component({
  selector: 'app-post-login',
  templateUrl: './post-login.component.html',
  styleUrls: ['./post-login.component.scss']
})
export class PostLoginComponent {
  adminForm!: FormGroup;
  helper = new JwtHelperService();
  constructor(private service: APIService,
    private fb: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar) {
    this.adminForm = fb.group({
      email: ['', [Validators.required, Validators.pattern('^[A-Za-z0-9+_.-]+@(.+)$')]],
      password: ['', [Validators.required]]
    })
  }

  get email() {
    return this.adminForm.get('email')
  }
  get password() {
    return this.adminForm.get('password')
  }

  login() {
    let observer = {
      next: (_token: any) => {
        let decodedToken = this.helper.decodeToken(_token.token);
        if (decodedToken.role == "admin") {
          this.snackBar.open(`Welcome Admin to your Dashboard!`, '', {
            duration: 3000,
            verticalPosition: 'top'
          });
          //---put token in localstorage---//
          let encryptedToken = CryptoJS.AES.encrypt(_token.token, environment.secretKey).toString();
          localStorage.setItem('Origami', encryptedToken);
          this.router.navigateByUrl('/clinics');
        }
        else {
          this.snackBar.open(`You don't have the authorization!`, 'ok', {
            duration: 3000,
            verticalPosition: 'top'
          });
        }
      },
      complete: () => {
        console.log("logged in");
      },
      error: () => {
        this.snackBar.open(`Wrong Email or Password!`, 'ok', {
          duration: 3000,
          verticalPosition: 'top'
        });
      }
  }
    this.service.addItem("login", this.adminForm.value).subscribe(observer)
  }
}
