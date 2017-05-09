import { Component, OnInit } from '@angular/core';
import { FundTransfer } from './fund-details';
import {AppService} from '../../../app.service';
@Component({
  selector: 'app-fund-transfer',
  templateUrl: './fund-transfer.component.html'

})
export class FundTransferComponent implements OnInit {
  date:Date;

transferModes:any[];
client:FundTransfer;
  constructor( private transferService:AppService) {
    this.transferModes=['NEFT','IMPS','RTGS']
   }

  ngOnInit() {
    this.transferModes=[];
     this.client={name:'',bank:'',ifsccode:'',accountnum:undefined ,amount:undefined,date:null,fromAccount:482092665479
}
  }
transfer(client)
{
  
  console.log(client.accountnum);
  console.log(client.amount);
   if((client.accountnum == undefined) || (client.amount == undefined)){
alert("all fileds are mandatory fields");
  }
 
 
  else{
     if(this.client.fromAccount != client.accountnum){
    console.log("called")
this.client.date = new Date();
  this.transferService.data = this.client;
this.transferService.url="http://localhost:3000/fund/fundtransfer";
this.transferService.postService().subscribe(res =>console.log(res));

  }
  else{
    alert("from account and to account should not be same");
  }
  this.client={name:'',bank:'',ifsccode:'',accountnum:undefined ,amount:undefined,date:null,fromAccount:482092665479}
  }
}
}

