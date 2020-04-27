/* tslint:disable */
import { Component, OnInit, EventEmitter } from '@angular/core';
import { ServicesService } from 'src/app/services/services/services.service';
import Service from 'src/app/models/sertvices';
import { AuthService } from 'src/app/services/auth/auth.service';
import { toast } from 'materialize-css';
import { UserService } from 'src/app/services/users/user.service';
import { User } from 'src/app/models/User';
import { firestore } from 'firebase';
import { CategoriesService } from 'src/app/services/categories/categories.service';
import { Categori } from 'src/app/models/categories';
import FiltroServicio from 'src/app/models/filtroServicio';
import { MaterializeAction } from "materialize-css";
import { MatChipsModule } from '@angular/material/chips';


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
  stringFiltro: Array<string> = new Array<string>();
  servicioaeliminar: Service;
  ArrayFiltro: Map<any, any> = new Map<any, any>();
  FiltroServicio: FiltroServicio = new FiltroServicio();
  abiertobool: boolean = false;
  filtrovalue: string;
  propiedadseleccionada: string;
  filtroText: Array<Map<any, any>> = new Array<Map<any, any>>();
  constructor(private servicesService: ServicesService, private auth: AuthService, private userService: UserService, private categoriService: CategoriesService) {



  }
  chipsActions = new EventEmitter<string | MaterializeAction>();

  objectKeys() {
    return Object.keys(this.FiltroServicio);
  }
  async ngOnInit(): Promise<void> {
   
    $('#filterch').prop("disabled", true);

    $(document).ready(function () {
      $('select').formSelect();
    });
    $(document).ready(function () {
      $('.modal').modal();
    });

    this.auth.verifiLoginUser();
    await this.categoriService.obtenerCategorias().subscribe((categoriesSnapshot) => {
      $('.dropdown-trigger').dropdown();
      this.Arraycategori = new Array();
      for (let index = 0; index <= categoriesSnapshot.length; index++) {
        const element = categoriesSnapshot[index];
        const categori: Categori = JSON.parse(JSON.stringify(element.payload.doc.data()));
        this.Arraycategori.push(categori);

      }

    });

    this.UsersMap = new Map<string, User>();
    this.Arrayservice = new Array<Service>();
    this.servicesService.obtenerServices().subscribe((data) => {
      this.Arrayservice = new Array<Service>();
      data.map((serviceFirebase) => {
        const service: Service = JSON.parse(JSON.stringify(serviceFirebase.payload.doc.data()));
        this.Arrayservice.push(service);
        this.userService.getuserbyUid(service.userUid).toPromise().then((datauser) => {

          this.UsersMap.set(service.userUid, JSON.parse(JSON.stringify(datauser.data())));
          $(document).ready(function () {
            $('.modal').modal();
          });
        });

      });

    });
  }

  getUser(userId: string) {

  }
  getDate(timeStamp: any) {

    const dateN: Date = new Date(timeStamp.seconds * 1000);
    return dateN.getDay() + '/' + dateN.getMonth() + '/' + dateN.getFullYear();
  }
  putService(item: Service, state: boolean) {
    item.isApproved = state;

    this.servicesService.updateService(item).then((data) => {
      if (item.isApproved) {
        toast({ html: 'Servicio Activado' }, 4000);
      } else {
        toast({ html: 'Servicio Desactivado' }, 4000);
      }

    });
  }
  getIdService(item: Service) {
    return item.serviceUid;
  }
  obtenerValueCategori(item: Categori) {
    return item.title;
  }
  agregarFiltro() {

    this.ArrayFiltro.set(this.propiedadseleccionada, this.filtrovalue);
    this.cambiarStringFilter();
    this.cerrarFiltro()
  }
  cambiarStringFilter() {
    this.stringFiltro =new Array<string>();
    this.objectKeys().forEach(element => {
      if (this.ArrayFiltro.get(element) != undefined) {
        this.stringFiltro.push(element + ":" + this.ArrayFiltro.get(element))
      }
    });

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
  mostrarCarta(service: Service) {
    var pibot: boolean = true;;
    this.objectKeys().forEach(element => {
      if (this.ArrayFiltro.get(element) != undefined) {
        if (!service[element].toString().toLowerCase( ).includes(this.ArrayFiltro.get(element).toString().toLowerCase( ))) {
          pibot = false;
        }
      }
    });
    return pibot;
  }
  valueString(k:string){
    return this.FiltroServicio[k].toString()
  }

  valueStringchips(item:string){
    return this.valueString(item.split(":")[0])+":"+item.split(":")[1]
  }
  direcionamiento(ruta: string) {
    location.href = '/' + ruta;
  }
  deleteService(item: Service) {
  
      this.servicesService.deleteService(item).then((data) => {
      
      });
    
  }
  abrirFiltro() {
    $("#filtro").show();
  }
  abilitarinput() {
    $("#disabled").prop("disabled", false);
  }
  cerrarFiltro() {
    $("#filtro").hide();
  } 
}
