import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, DocumentChangeAction } from '@angular/fire/firestore';
import { Categori } from 'src/app/models/categories';
import { FireStorageService } from '../FireStorage/fire-storage.service';
import { element } from 'protractor';
@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  deleteCategory(categori: Categori) {
    return this.firestore.collection('categories', ref => ref.where('title', '==', categori.title)).get().forEach(async (data) => {

      await this.firestore.collection('categories').doc(data.docs[0].id).set({ enable: false }, { merge: true }).then(async (dt) => {
        this.firestore.collection('services', ref => ref.where('category', '==', categori.title)).snapshotChanges().forEach(
          async ( elemento: DocumentChangeAction<unknown>[]) => {
          await elemento.forEach(async (dataEle) => {
            await this.firestore.collection('services').doc(dataEle.payload.doc.id).set({ enable: false },
               { merge: true }).then(async () => {
            });
          });
        });
      });
    });
  }

  constructor(private firestore: AngularFirestore, private storage: FireStorageService) { }

  public obtenerCategoria(id: string) {
    return this.firestore.collection('categories').doc(id).snapshotChanges();
  }
  public crearCategoria(categoria: Categori, file: File) {
    
    return this.firestore.collection('categories').add(JSON.parse(JSON.stringify(categoria))).then(async (data) => {
      await this.storage.uploadFile(file, 'Categories/' + data.id + '.png');
      categoria.imageURL = 'https://firebasestorage.googleapis.com/v0/b/appservice-b8a23.appspot.com/o/Categories%2F' +
       data.id + '.png?alt=media&token=f18a3d85-e0dc-4959-ba6c-a9eb94c1a10d';
      data.set(JSON.parse(JSON.stringify(categoria))).then(() => {
  
      });
    });
  }

  public obtenerCategorias() {
    return this.firestore.collection('categories', ref => ref.where('enable', '==', true)).snapshotChanges();
  }
  public obtenerCategoriaswhittitle(title: string) {
    return this.firestore.collection('categories', ref => ref.where('title', '==', title)).snapshotChanges();
  }
  updateCategory(category: Categori, file: File, categoriapasada: string) {
    const categori: Categori = JSON.parse(window.localStorage.getItem('editar'));
    return this.firestore.collection('categories', ref => ref.where('title', '==', categori.title)).get().forEach(async (data) => {
      console.log(category);
      await this.firestore.collection('categories').doc(data.docs[0].id).set(category).then(async (dt) => {
        this.firestore.collection('services', ref => ref.where('category', '==',
        categoriapasada)).snapshotChanges().forEach(async (elemento) => {
          await elemento.forEach(async (dataEle) => {
            await this.firestore.collection('services').doc(dataEle.payload.doc.id).set({ category: category.title },
              { merge: true }).then(async () => {
            });
          });
          if (file != null) {
            await this.storage.uploadFile(file, 'Categories/' + data.docs[0].id + '.png').then(() => {
              
            });
          }
        });
      });
    });
  }
}
