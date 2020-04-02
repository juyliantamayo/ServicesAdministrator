
import { firestore } from 'firebase';

export class User {
    address: string
    areDocuments: boolean
    birthDay:number
    document: string
    email: string
    imageURL: string
    name: string
    uid: string
    constructor(address, areDocuments, birthDay, document, email, imageURL, name, uid) {
        this.address = address;
        this.areDocuments = areDocuments;
        this.birthDay = this.birthDay;
        this.document = document
        this.email = email;
        this.imageURL = imageURL;
        this.name = name;
        this.uid = uid;
    }
}