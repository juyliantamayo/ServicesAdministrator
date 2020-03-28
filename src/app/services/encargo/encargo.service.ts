import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Encargo } from 'src/app/models/encargo';
import { Categori } from 'src/app/models/categories';
@Injectable({
  providedIn: 'root'
})
export class EncargoService {
  updateEncargo(encargo: Encargo) {
    this.firestore.collection("services").doc(encargo.serviceUid).set(encargo)
  }

  constructor(private firestore: AngularFirestore) {

  }
  getEncargoWhenCategory(category: string) {
    return this.firestore.collection("services", ref => ref.where("category", "==", category)).get()
  }
 
}
