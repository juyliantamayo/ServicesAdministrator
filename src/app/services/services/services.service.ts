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

    return this.firestore.collection('services', ref => ref.where('enable', '==', true)).snapshotChanges();
  }
  public obtenerServiceswhitCategori(categori: string) {

    return this.firestore.collection('services', ref =>
    ref.where('category', '==', categori).where('enable', '==', true)).snapshotChanges();
  }
  public updateService(service: Service) {
    console.log(service);
    return this.firestore.collection('services').doc(service.serviceUid).set({isApproved: service.isApproved}, {merge: true});
  }
  public deleteService(service: Service) {
    console.log(service);
    return this.firestore.collection('services').doc(service.serviceUid).set({enable: false}, {merge: true});
  }
}
