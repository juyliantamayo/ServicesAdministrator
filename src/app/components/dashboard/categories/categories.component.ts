import { Component, OnInit } from '@angular/core';
import { CategoriesService } from 'src/app/services/categories/categories.service';
import { Categori } from 'src/app/models/categories';
import { AuthService } from 'src/app/services/auth/auth.service';
import { environment } from 'src/environments/environment';
import FiltroServicio from 'src/app/models/filtroServicio';
declare var $: any;

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  stringFiltro: Array<string> = new Array<string>();
  public categoriesArray: Array<Categori> = new Array<Categori>();
  ArrayFiltro: Map<any, any> = new Map<any, any>();
  FiltroServicio: FiltroServicio = new FiltroServicio();
  propiedadseleccionada: string;
  filtrovalue: string;
  constructor(private catagoriService: CategoriesService, private auth: AuthService) { }
  abrirFiltro() {
    $("#filtro").show();
  }
  objectKeys() {
    return Object.keys(this.FiltroServicio);
  }
  valueStringchips(item:string){
    return this.valueString(item.split(":")[0])+":"+item.split(":")[1]
  }
  cambiarStringFilter() {
    this.stringFiltro =new Array<string>();
    this.objectKeys().forEach(element => {
      if (this.ArrayFiltro.get(element) != undefined) {
        this.stringFiltro.push(element + ":" + this.ArrayFiltro.get(element))
      }
    });

  }
  agregarFiltro() {

    this.ArrayFiltro.set(this.propiedadseleccionada, this.filtrovalue);
    this.cambiarStringFilter();
    this.cerrarFiltro()
  }
  abilitarinput() {
    $("#disabled").prop("disabled", false);
  }
  cerrarFiltro() {
    $("#filtro").hide();
  }
  valueString(k:string){
    return this.FiltroServicio[k].toString()
  }
  eliminarfiltro(filtro: string) {
    const index = this.stringFiltro.indexOf(filtro);

    if (index >= 0) {
      this.stringFiltro.splice(index, 1);
    }
    this.eliminarfiltroFunsionalida(filtro)
  }
  eliminarfiltroFunsionalida(filtro: string) {
    this.ArrayFiltro.delete(filtro.split(":")[0])
  }
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
