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
  public crearCategoria(categoria: Categori, file: File) {
    return this.firestore.collection("categories").add(JSON.parse(JSON.stringify(categoria))).then(async (data) => {
      await this.storage.uploadFile(file, "Categories/" + data.id + ".png");
      categoria.imageURL = "https://firebasestorage.googleapis.com/v0/b/appservice-b8a23.appspot.com/o/Categories%2F" + data.id + ".png?alt=media&token=f18a3d85-e0dc-4959-ba6c-a9eb94c1a10d"
      data.set(JSON.parse(JSON.stringify(categoria))).then(() => {
        alert("Categoria Creada")
      });
    });
  }

  public obtenerCategorias() {
    return this.firestore.collection("categories").snapshotChanges();
  }
  updateCategory(category: Categori, file: File) {
    let categori: Categori = JSON.parse(window.localStorage.getItem("editar"))
    return this.firestore.collection("categories", ref => ref.where("title", "==", categori.title)).get().forEach(async (data) => {
     await this.firestore.collection("categories").doc(data.docs[0].id).set(category)
      if (file != null) {
        this.storage.uploadFile(file, "Categories/" + data.docs[0].id + ".png")
      }
    })
  }
}