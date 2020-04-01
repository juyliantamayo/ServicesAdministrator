import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Categori } from 'src/app/models/categories';
import Service from 'src/app/models/sertvices';
@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  constructor(private firestore: AngularFirestore) { }

  public obtenerServices() {

    return this.firestore.collection("services").snapshotChanges();
  }
  public obtenerServiceswhitCategori(categori: string) {

    return this.firestore.collection("services",ref=>ref.where('category','==',categori)).snapshotChanges();
  }
  public updateService(service: Service) {
    console.log(service);
    return this.firestore.collection("services").doc(service.serviceUid).set({"isApproved":service.isApproved},{merge:true});
  }
}
