import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Categori } from 'src/app/models/categories';
@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private firestore: AngularFirestore) { }

  public obtenerCategoria(id: string) {
    return this.firestore.collection("categories").doc(id).snapshotChanges();
  }
  public crearCategoria(categoria:Categori){
    return this.firestore.collection("categories").add(categoria);
  }

  public obtenerCategorias(){
    return this.firestore.collection("categories").snapshotChanges();
  }

}