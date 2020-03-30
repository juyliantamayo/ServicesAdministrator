import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import * as chart from 'chart.js';
import { CategoriesService } from 'src/app/services/categories/categories.service';
import { ServicesService } from 'src/app/services/services/services.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  labelString: Array<string> = new Array<string>();
  datanumber: Array<number> = new Array<number>();
  constructor(private auth: AuthService, private categoryservice: CategoriesService, private serviceService: ServicesService) { }

  async ngOnInit(): Promise<void> {
    this.primeragrafica()
  }
  async primeragrafica() {
    var ctx = document.getElementById('myChart');
    var myChart = new chart.Chart(ctx, {
      type: 'bar',
      data: {
        labels: this.labelString,
        datasets: [{
          label: '# of Votes',
          data: this.datanumber,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });
    this.auth.verifiLoginUser()

    await this.categoryservice.obtenerCategorias().subscribe(async (categoriesSnapshot) => {
      console.log(categoriesSnapshot)

      for (let index = 0; index < categoriesSnapshot.length; index++) {
        const categori = categoriesSnapshot[index];
        console.log(categori.payload.doc.data()["title"])
        await this.serviceService.obtenerServiceswhitCategori(categori.payload.doc.data()["title"]).subscribe((ServiceSnapshot) => {
          this.labelString.push(categori.payload.doc.data()["title"])
          this.datanumber.push(ServiceSnapshot.length)
          myChart.update();
          console.log(this.datanumber, this.labelString)
        })
      }





    })



  }

}
