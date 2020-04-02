import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { User } from 'src/app/models/User'
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private firbase:AngularFirestore) { }

  getuserbyUid(uid: string) {
    return this.firbase.collection("users").doc(uid).get();
  }
}
