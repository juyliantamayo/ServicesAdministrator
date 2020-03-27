import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage'
@Injectable({
  providedIn: 'root'
})
export class FireStorageService {

  constructor(private angularFireStorage: AngularFireStorage) { }

  uploadFile(event: File, path: string) {
    console.log("hola")
    console.log(path)
    const file = event;
    const filePath = path;
    this.angularFireStorage.upload(filePath, file).then(() => {
      console.log(path);
    }).catch((error) => {
      alert(error);
    })

  }
}
