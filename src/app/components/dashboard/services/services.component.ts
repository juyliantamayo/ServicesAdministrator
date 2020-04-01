import { Component, OnInit } from '@angular/core';
import { ServicesService } from 'src/app/services/services/services.service';
import Service from 'src/app/models/sertvices';
import { AuthService } from 'src/app/services/auth/auth.service';
import { toast } from 'materialize-css';
import { UserService } from 'src/app/services/users/user.service';
import { User } from 'src/app/models/User';
import { firestore } from 'firebase';
import { CategoriesService } from 'src/app/services/categories/categories.service';
import { Categori } from 'src/app/models/categories';


declare var $: any;
declare var M: any;
@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent implements OnInit {
  Arrayservice: Array<Service> = new Array<Service>();
  UsersMap: Map<string, User> = new Map<string, User>();
  Arraycategori: Array<Categori> = new Array<Categori>();
  stringFiltro: string;
  servicioaeliminar: Service;
  ArrayFiltro: Array<string> = new Array<string>();
  constructor(private servicesService: ServicesService, private auth: AuthService, private userService: UserService, private categoriService: CategoriesService) { }
  async ngOnInit(): Promise<void> {
    $(document).ready(function () {
      $('.modal').modal();
    });

    this.auth.verifiLoginUser()
    await this.categoriService.obtenerCategorias().subscribe((categoriesSnapshot) => {
      $('.dropdown-trigger').dropdown();
      this.Arraycategori = new Array();
      for (let index = 0; index <= categoriesSnapshot.length; index++) {
        const element = categoriesSnapshot[index];
        var categori: Categori = JSON.parse(JSON.stringify(element.payload.doc.data()));
        this.Arraycategori.push(categori);
        console.log(this.Arraycategori)
      }

    });

    this.UsersMap = new Map<string, User>();
    this.Arrayservice = new Array<Service>();
    this.servicesService.obtenerServices().subscribe((data) => {
      this.Arrayservice = new Array<Service>();
      data.map((serviceFirebase) => {
        let service: Service = JSON.parse(JSON.stringify(serviceFirebase.payload.doc.data()));
        this.Arrayservice.push(service);
        this.userService.getuserbyUid(service.userUid).toPromise().then((datauser) => {

          this.UsersMap.set(service.userUid, JSON.parse(JSON.stringify(datauser.data())))

        });

      })

    })
  }

  getUser(userId: string) {
    console.log()
  }
  getDate(timeStamp: any) {

    let dateN: Date = new Date(timeStamp["seconds"] * 1000);
    return dateN.getDay() + "/" + dateN.getMonth() + "/" + dateN.getFullYear()
  }
  putService(item: Service, state: boolean) {
    item.isApproved = state;
    console.log(item)
    this.servicesService.updateService(item).then((data) => {
      if (item.isApproved) {
        toast({ html: 'Servicio Activado' }, 4000)
      } else {
        toast({ html: 'Servicio Desactivado' }, 4000)
      }

    })
  }
  getIdService(item: Service) {
    return item.serviceUid;
  }
  obtenerValueCategori(item: Categori) {
    return item.title
  }
  agregarFiltro(categori: string) {
    if (this.ArrayFiltro.indexOf(categori) > -1) {
      this.ArrayFiltro.splice(this.ArrayFiltro.indexOf(categori), 1)
    } else {
      this.ArrayFiltro.push(categori);

    }
    this.cambiarStringFilter()
  }
  cambiarStringFilter() {
    this.stringFiltro = "";
    for (let index = 0; index < this.ArrayFiltro.length; index++) {
      if (index > 0) {
        this.stringFiltro += "," + this.ArrayFiltro[index]
      } else {
        this.stringFiltro += this.ArrayFiltro[index]
      }

    }
  }
  mostrarCarta(categori: string) {
    if (this.ArrayFiltro.length > 0) {
      if (this.ArrayFiltro.indexOf(categori) > -1) {
        return true;
      }
      return false;
    } else {
      return true;
    }

  }
  direcionamiento(ruta: string) {
    location.href = "/" + ruta
  }
  deleteService(item: Service) {
    if (confirm("Al elminar la categoría, no podrá revertir esta acción más adelante.\n ¿Está seguro que desea eliminar esta categoría?"))
      this.servicesService.deleteService(item).then((data) => {
        alert("Servicio eliminado")
      })
  }
}
