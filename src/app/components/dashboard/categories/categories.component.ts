import { Component, OnInit } from '@angular/core';
import { CategoriesService } from 'src/app/services/categories/categories.service';
import { Categori } from 'src/app/models/categories';
import { AuthService } from 'src/app/services/auth/auth.service';
import { environment } from 'src/environments/environment';
declare var $: any;

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  public categoriesArray: Array<Categori> = new Array<Categori>();
  constructor(private catagoriService: CategoriesService, private auth: AuthService) { }

  ngOnInit(): void {

    this.auth.verifiLoginUser();
    this.catagoriService.obtenerCategorias().subscribe((categoriesSnapshot) => {
      this.categoriesArray = new Array();
      categoriesSnapshot.forEach((categoriData) => {
        const categori: Categori = JSON.parse(JSON.stringify(categoriData.payload.doc.data()));
        this.categoriesArray.push(categori);
      });
    });

  }
  editar(categori: Categori) {
    window.localStorage.setItem('editar', JSON.stringify(categori));
    this.direcionamiento('agregar');
  }
  agregar() {
    window.localStorage.removeItem('editar');
    this.direcionamiento('agregar');
  }
  direcionamiento(link: string) {
    location.href = '/' + link;
  }
  eliminar(item: Categori) {
    if (confirm('Al elminar la categoría, no podrá revertir esta acción más adelante.\n ¿Está seguro que desea eliminar esta categoría?')) {
      this.catagoriService.deleteCategory(item).then((data) => {
        alert('Categoría eliminado');
      });
    }
  }
}
