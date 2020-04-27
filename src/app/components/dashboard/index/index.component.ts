/* tslint:disable */
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { CategoriesService } from 'src/app/services/categories/categories.service';
import { ServicesService } from 'src/app/services/services/services.service';
import { Categori } from 'src/app/models/categories';
import { Graficas } from 'src/app/models/graficas';
import { async } from 'rxjs/internal/scheduler/async';
import * as moment from 'moment';

declare var $: any;
@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  // options
  showXAxisSer = true;
  showYAxisSer = true;
  gradientSer = false;
  showLegendSer = true;
  showXAxisLabelSer = true;
  xAxisLabelSer = 'Meses';
  showYAxisLabelSer = true;
  yAxisLabelSer = 'Servicios Creados';
  labelStringDataFirschar2: any[];
  gradientpie = false;
  showLabels = true;
  isDoughnut = false;
  legendPosition = 'below';
  labelStringDataFirschar: any[];
  view: any[] = [1080, 480];
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Categoria';
  showYAxisLabel = true;
  graficaseleccionada :string="1";
  yAxisLabel = 'Servicios \n creados';
  colorScheme = {
    domain: ['#994df7', '#ec4391', '#357e5f', '#e8f74d', '#AAAAAA']
  };
  constructor(private auth: AuthService, private categoryservice: CategoriesService, private serviceService: ServicesService) {


  }
  direcionamiento(ruta: string) {
    location.href = '/' + ruta;
  }

  async ngOnInit(): Promise<void> {
    $('select').formSelect();
    $('.carousel.carousel-slider').carousel({
      fullWidth: true,
      indicators: true
    });
 
    const meses = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December'
    ];

    // Funcion para agregar datos a la grafica de servicios por mes.
    await this.serviceService.obtenerServices().subscribe((data) => {
      const datachartpibot: Array<Graficas> = new Array<Graficas>();
      let contador = 0;

      data.forEach((servicio) => {
        
        const fecha: string = moment(servicio.payload.doc.data()['createdAt'].toDate()).format('MMMM');
        
        console.log('Mes: ' + fecha);
        const graficapibote: Graficas = new Graficas();

        for (let index = 0; index < meses.length; index++) {

          const element = meses[index].toString();

          if (element == fecha) {
            graficapibote.name = meses[index].toString();
            graficapibote.value = contador++;
            console.log('Se agrego en el mes = ' + meses[index].toString() + ' hay ' + contador);
          } else {
            console.log('no entro');
          }
        }
        datachartpibot.push(graficapibote);
      });
      this.labelStringDataFirschar2 = JSON.parse(JSON.stringify(datachartpibot));
    });

    await this.categoryservice.obtenerCategorias().subscribe(async (data) => {

      const datachartpibot: Array<Graficas> = new Array<Graficas>();
      await data.forEach(async (category) => {
        await this.serviceService.obtenerServiceswhitCategori(category.payload.doc.data()['title']).subscribe((servicesnapshot) => {
          console.log('activo');
          const graficapibote: Graficas = new Graficas();
          graficapibote.name = category.payload.doc.data()['title'];
          graficapibote.value = servicesnapshot.length;
          const categoripibot = datachartpibot.find((item) =>
            item.name == graficapibote.name
          );
          if (categoripibot) {
            datachartpibot[datachartpibot.indexOf(categoripibot)].value = graficapibote.value;
          } else {
            datachartpibot.push(graficapibote);
          }

          this.labelStringDataFirschar = JSON.parse(JSON.stringify(datachartpibot));
        });
      });


    });

  }
  onSelect() {

    console.log(this.labelStringDataFirschar);
  }
  mostrarGrafica( id:string){
    console.log(this.graficaseleccionada==id)
    return this.graficaseleccionada==id
  }

}
/* tslint:enable*/
