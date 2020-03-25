import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  errorMessage: string;
  successMessage: string;
  constructor(public afAuth: AngularFireAuth) {

  }
  public doGoogleLogin() {
    return new Promise<any>((resolve, reject) => {
      let provider = new firebase.auth.GoogleAuthProvider();
      provider.addScope('profile');
      provider.addScope('email');
      this.afAuth.auth
        .signInWithPopup(provider)
        .then(res => {
          resolve(res);
        })
    })
  }
  doRegister(email: string, password: string) {
    console.log(email);
    return new Promise<any>((resolve, reject) => {
      firebase.auth().signInWithEmailAndPassword(email, password).then(res => {
        resolve(res);
      }, err => {
        reject(err)
      })
    })

  }
  async logout(){
   await firebase.auth().signOut();
  }
  verifiLoginUser() {
    firebase.auth().onAuthStateChanged(function (user) {
      console.log(user);
      if (user) {
      } else {
        location.href = "";
      }
    });
  }
}
