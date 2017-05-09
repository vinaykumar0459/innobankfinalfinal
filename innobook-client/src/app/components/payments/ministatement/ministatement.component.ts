import { Component, OnInit } from '@angular/core';
import {AppService} from '../../../app.service';
@Component({
  selector: 'app-mini-statement',
  templateUrl: './ministatement.component.html'

})
export class MiniStatementComponent implements OnInit {
sampleObj :any[];
name:string="saroj";
accNo:number=12345678901;
  constructor (private miniStatementService:AppService ) {
    this.sampleObj=[
  
   { SNO: 201, Date: '03-09-2017',Chequeno:3344,TransactionRemarks:"Good",withdrawalAmount:3000.00,
    DepositAmount:5000.00,BalanceAmount:6000.00},
     {  SNO: 202, Date: '08-09-2017',Chequeno:3444,TransactionRemarks:"Good",withdrawalAmount:4000.00,
    DepositAmount:6000.00,BalanceAmount:7000.00},
   {  SNO: 203, Date: '10-09-2017',Chequeno:3544,TransactionRemarks:"Good",withdrawalAmount:5000.00,
    DepositAmount:7000.00,BalanceAmount:8000.00},
  
   {  SNO: 204, Date: '03-10-2017',Chequeno:3644,TransactionRemarks:"Good",withdrawalAmount:3000.00,
    DepositAmount:8000.00,BalanceAmount:9000.00},
  
   {  SNO: 205, Date: '11-10-2017',Chequeno:3744,TransactionRemarks:"Good",withdrawalAmount:3000.00,
    DepositAmount:5000.00,BalanceAmount:6000.00}
   
];
   }

  ngOnInit() {
    this.miniStatementService.url="http://localhost:3000/ministatement"
 this.miniStatementService.getService().subscribe(
   res => {console.log(res["_body"])
  });
  }

}
 
