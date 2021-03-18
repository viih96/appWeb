import { Login } from './../users/shared/login';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private afa: AngularFireAuth
  ) { }

  login(Login: Login){
    return this.afa.signInWithEmailAndPassword(Login.email, Login.password)

  }
}
