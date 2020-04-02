import { firestore } from 'firebase';


export default class Service {
    serviceUid: string;
    userUid: string;
    category: string;
    title: string;
    description: string;
    isApproved: Boolean;
    charge: number;
    imageURL: String;
    createdAt: firestore.Timestamp;
    enable: boolean;
    constructor(serviceUid, userUid, category, title, description, isApproved, charge, imageURL, createdAt, enable) {
        this.serviceUid = serviceUid;
        this.userUid = userUid;
        this.category = category;
        this.title = title;
        this.description = description;
        this.isApproved = isApproved;
        this.charge = charge;
        this.imageURL = imageURL;
        this.createdAt = createdAt;
        this.enable = enable;
    }
}