export class Categori {
    description: string;
    imagenUrl: string;
    title: string;
    constructor(descripcion: string, imagenURL: string, title: string) {
        this.description = descripcion;
        this.imagenUrl = imagenURL;
        this.title = title;
    }
}