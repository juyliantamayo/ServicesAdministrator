import { Component, OnInit } from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-delete-categorie',
  templateUrl: './delete-categorie.component.html',
  styleUrls: ['./delete-categorie.component.css']
})
export class DeleteCategorieComponent implements OnInit {


  constructor() { }

  ngOnInit(): void {
    
    $(document).ready(function () {
      $('.modal').modal();
    });

    $(function () {
      $('#checkbox').click(function () {
        if ($(this).is(':checked')) {
          $('#action').removeAttr('disabled');
        } else {
          $('#action').attr('disabled', 'disabled');
        }
      });
    });
  }

  direcionamiento(link: string) {
    location.href = "/" + link;
  }

}
