import { Component, OnInit } from '@angular/core';
import {AppService} from '../../../app.service';
@Component({
  selector: 'app-detailedstatement',
  templateUrl: './detailedstatement.component.html'

})
export class detailedstatementComponent implements OnInit {

  constructor( private detailStatementService:AppService) { }

  ngOnInit() {
      this.detailStatementService.url="http://localhost:3000/detailedstatement";
 this.detailStatementService.getService().subscribe(res => console.log(res));
  }

}
