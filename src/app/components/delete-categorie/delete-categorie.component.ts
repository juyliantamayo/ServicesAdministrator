import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-delete-categorie',
  templateUrl: './delete-categorie.component.html',
  styleUrls: ['./delete-categorie.component.css']
})
export class DeleteCategorieComponent implements OnInit {

  
  constructor() { }

  ngOnInit(): void {
    $(function() {
      $('#checkbox').click(function() {
          if ($(this).is(':checked')) {
              $('#action').removeAttr('disabled');
          } else {
              $('#action').attr('disabled', 'disabled');
          }
      });
  });

    $(document).ready(function(){
      $('select').formSelect();
    });
  }

  direcionamiento(link :string){
    location.href = "/"+link;
  }

}
