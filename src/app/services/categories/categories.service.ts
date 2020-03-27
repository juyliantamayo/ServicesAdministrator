import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Categori } from 'src/app/models/categories';
import { FireStorageService } from '../FireStorage/fire-storage.service';
@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private firestore: AngularFirestore, private storage: FireStorageService) { }

  public obtenerCategoria(id: string) {
    return this.firestore.collection("categories").doc(id).snapshotChanges();
  }
  public crearCategoria(categoria: Categori) {
    return this.firestore.collection("categories").add(categoria);
  }

  public obtenerCategorias() {
    return this.firestore.collection("categories").snapshotChanges();
  }
  updateCategory(category: Categori, file: File) {
    let categori: Categori = JSON.parse(window.localStorage.getItem("editar"))
    this.firestore.collection("categories", ref => ref.where("title", "==", categori.title)).get().forEach((data) => {
      this.firestore.collection("categories").doc(data.docs[0].id).set(category)
      if (file != null) {
        this.storage.uploadFile(file, "Categories/" + data.docs[0].id + ".png")
      }
    })
  }
}