import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Categori } from 'src/app/models/categories';
import Service from 'src/app/models/sertvices';
@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  constructor(private firestore: AngularFirestore) { }

  public obtenerServicesWhitCategory() {
    return this.firestore.collection("services").snapshotChanges();
  }
  public updateService(service: Service) {
    console.log(service);
    return this.firestore.collection("services").doc(service.serviceUid).set(service);
  }
}
