import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
declare var $: any;
@Component({
  selector: 'app-sidevar',
  templateUrl: './sidevar.component.html',
  styleUrls: ['./sidevar.component.css']
})
export class SidevarComponent implements OnInit {

  constructor() {
    $('.sidenav').sidenav();
    $('.sidenav').sidenav({ edge: 'left' });
  }

  ngOnInit(): void {
    
  }

  direcionamiento(link :string){
    location.href = "/"+link;
  }
}
