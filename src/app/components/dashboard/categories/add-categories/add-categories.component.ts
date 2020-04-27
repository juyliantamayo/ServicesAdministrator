import { Component, OnInit, Input } from '@angular/core';
import { Categori } from 'src/app/models/categories';
import { environment } from 'src/environments/environment';
import { CategoriesService } from 'src/app/services/categories/categories.service';
import { AuthService } from 'src/app/services/auth/auth.service';
declare var $: any;
@Component({
  selector: 'app-add-categories',
  templateUrl: './add-categories.component.html',
  styleUrls: ['./add-categories.component.css']
})
export class AddCategoriesComponent implements OnInit {
  Categori: Categori = new Categori();
  constructor(private categoriesService: CategoriesService, private auth: AuthService) { }
  filej: File = null;
  ngOnInit(): void {
    $('.modal').modal();
    this.auth.verifiLoginUser();
    if (window.localStorage.getItem('editar') != null) {
      this.Categori = JSON.parse(window.localStorage.getItem('editar'));
    }

    console.log(this.Categori.title);
  }

  direcionamiento(link: string) {
    location.href = '/' + link;
  }
  update() {
    const categoriavieja: Categori = JSON.parse(window.localStorage.getItem('editar'));
    this.categoriesService.updateCategory(this.Categori, this.filej, categoriavieja.title).then((dt) => {
      $('#modal').modal('open')

    });
  }
  editaroagregar(): boolean {
    console.log(window.localStorage.getItem('editar'))
    return window.localStorage.getItem('editar') === undefined || window.localStorage.getItem('editar')===null;
  }
  changeimgae(event: FileList) {
    const file: File = event.item(0);
    const imageType: RegExp = /image.*/;

    if (!file.type.match(imageType)) {
      return;
    }

    const reader = new FileReader();

    reader.onload = (e) => {
      const result = e.target.result;
      $('#imgSalida').attr('src', result);
    };
    this.filej = file;
    reader.readAsDataURL(file);


  }
  agregarCategoria() {

    this.categoriesService.crearCategoria(this.Categori, this.filej).then(() => {
      $('#modal').modal('open')
    });
  }
  redireccionar(){
    location.href = '/categorias';
  }
}
