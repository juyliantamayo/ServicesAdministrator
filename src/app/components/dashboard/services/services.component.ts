import { Component, OnInit } from '@angular/core';
import { ServicesService } from 'src/app/services/services/services.service';
import Service from 'src/app/models/sertvices';
import { AuthService } from 'src/app/services/auth/auth.service';

import { UserService } from 'src/app/services/users/user.service';
import { User } from 'src/app/models/User';
import { firestore } from 'firebase';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent implements OnInit {
  Arrayservice: Array<Service> = new Array<Service>();
  UsersMap: Map<string, User> = new Map<string, User>();
  constructor(private servicesService: ServicesService, private auth: AuthService, private userService: UserService) { }
  ngOnInit(): void {
    this.auth.verifiLoginUser()
    this.UsersMap = new Map<string, User>();
    this.Arrayservice = new Array<Service>();
    this.servicesService.obtenerServicesWhitCategory().subscribe((data) => {
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
  getDate(timeStamp:any) {
    console.log(timeStamp);
    let dateN: Date=new Date( timeStamp["seconds"]* 1000);
    return dateN.getDay() + "/" + dateN.getMonth() + "/" + dateN.getFullYear()
  }

}
