export class Encargo {
    serviceUid: string;
    userUid: string;
    category: string;
    title: string;
    description: string;
    isApproved: Boolean;
    charge: number;
    imageURL: string;
    constructor(serviceUid: string, userUid: string, category: string, title: string, description: string, isApproved: Boolean, charge: number, imageURL: string) {
        this.serviceUid = serviceUid;
        this.userUid = userUid;
        this.category = category;
        this.title = title;
        this.description = description;
        this.isApproved = isApproved;
        this.charge = charge;
        this.imageURL = imageURL;
    }
}