import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import { AngularFirestore } from '@angular/fire/firestore';
import { User } from 'src/app/models/User';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  errorMessage: string;
  successMessage: string;
  constructor(public afAuth: AngularFireAuth, private firestore: AngularFirestore) {

  }
  public doGoogleLogin() {
    return new Promise<any>((resolve, reject) => {
      const provider = new firebase.auth.GoogleAuthProvider();
      provider.addScope('profile');
      provider.addScope('email');
      this.afAuth.auth
        .signInWithPopup(provider)
        .then(res => {
          resolve(res);
        });
    });
  }
  doRegister(email: string, password: string) {

    return this.afAuth.auth.signInWithEmailAndPassword(email, password).then(async (data) => {
      console.log(data);
      await this.firestore.collection('users').doc(data.user.uid).get().toPromise().then((user) => {
        console.log(user.data());
        const userL: User = JSON.parse(JSON.stringify(user.data()));
        window.localStorage.setItem('user', JSON.stringify(userL));
      });
    });

  }
  async logout() {
    await firebase.auth().signOut();

  }
  verifiLoginUser() {
    this.afAuth.auth.onAuthStateChanged((user) => {

      if (user) {
      } else {
        location.href = '';
      }
    });
  }
}
