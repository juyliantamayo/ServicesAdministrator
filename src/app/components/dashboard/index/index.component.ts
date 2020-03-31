import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { CategoriesService } from 'src/app/services/categories/categories.service';
import { ServicesService } from 'src/app/services/services/services.service';
import { Categori } from 'src/app/models/categories';
import { Graficas } from 'src/app/models/graficas';
declare var $: any;
@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  gradientpie: boolean = true;

  showLabels: boolean = true;
  isDoughnut: boolean = false;
  legendPosition: string = 'below';
  labelStringDataFirschar: any[];
  view: any[] = [700, 400];
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Categoria';
  showYAxisLabel = true;
  yAxisLabel = 'Servicios \n creados';
  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };
  constructor(private auth: AuthService, private categoryservice: CategoriesService, private serviceService: ServicesService) {


  }


  async ngOnInit(): Promise<void> {

    await this.categoryservice.obtenerCategorias().subscribe(async (data) => {

      let datachartpibot: Array<Graficas> = new Array<Graficas>();
      await data.forEach(async (category) => {
        await this.serviceService.obtenerServiceswhitCategori(category.payload.doc.data()["title"]).subscribe((servicesnapshot) => {
          console.log("activo")
          let graficapibote: Graficas = new Graficas();
          graficapibote.name = category.payload.doc.data()["title"];
          graficapibote.value = servicesnapshot.length
          let categoripibot = datachartpibot.find((item) =>
            item.name == graficapibote.name
          )
          if (categoripibot) {
            datachartpibot[datachartpibot.indexOf(categoripibot)].value = graficapibote.value
          } else {
            datachartpibot.push(graficapibote);
          }

          this.labelStringDataFirschar = JSON.parse(JSON.stringify(datachartpibot));
        })
      })


    })

  }
  onSelect() {

    console.log(this.labelStringDataFirschar)
  }


}
