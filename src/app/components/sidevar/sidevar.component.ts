import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { User } from 'src/app/models/User';
declare var $: any;
@Component({
  selector: 'app-sidevar',
  templateUrl: './sidevar.component.html',
  styleUrls: ['./sidevar.component.css']
})
export class SidevarComponent implements OnInit {
userAdmin:User;
  constructor( private auth : AuthService) {
    $('.sidenav').sidenav();
    $('.sidenav').sidenav({ edge: 'left' });
  }

  ngOnInit(): void {
    this.userAdmin=JSON.parse(window.localStorage.getItem("user"))
  }
 singout(){
   this.auth.logout()
   location.href="";
 }
  direcionamiento(link :string){
    location.href = "/"+link;
  }
}
