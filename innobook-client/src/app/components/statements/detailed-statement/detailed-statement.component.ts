import { Component, OnInit } from '@angular/core';
import { AppService }   from '../../../app.service';
import { Details,DateClass }    from './detailed-statement';
@Component({
  selector: 'app-detailed-statement',
  templateUrl: './detailed-statement.component.html'

})
export class DetailedStatementComponent implements OnInit {
details:Details[];
isTrue:boolean =true;
date:DateClass;
page2:number = 1;
sampleData:any[];
  constructor(private DetailedService:AppService) { 
this.details =[{
       Date:null,

     ChequeNo:undefined,
   TransactionRemarks:"",
    withdrawalAmount:undefined,
    depositAmount:undefined,
    balanceAmount:undefined,
}];
this.date ={
  fromDate:null,
  toDate:null
}
  }

  ngOnInit() {
 this.DetailedService.url="http://localhost:3000/fund/allstatements/888888888888";
 this.DetailedService.getService().subscribe(res =>{
  this.sampleData = JSON.parse(res["_body"]);
if(this.sampleData["data"]=="No Records"){
this.isTrue =true;
this.sampleData["data"]="";
}
else{
  console.log("false...............................................");
  this.isTrue =false;
  this.details.pop();
  if(this.sampleData["data"] != "no transactions"){
(this.sampleData).forEach(element => {
  if(element.hasOwnProperty("from"))
{
  this.details.push({
 Date:new Date( element.date).toDateString(),
    ChequeNo:undefined,
    TransactionRemarks:"",
    withdrawalAmount:undefined,
    depositAmount:element.amount,
    balanceAmount:element.currentBalance,
  });
  console.log(this.details);
}
else{
  this.details.push({
 Date:new Date( element.date).toDateString(),
    ChequeNo:undefined,
    TransactionRemarks:"",
    withdrawalAmount:element.amount,
    depositAmount:undefined,
    balanceAmount:element.currentBalance,
    });
}});}
else{
  this.isTrue = true;
}
}

   });
  
  }
  
  getData(date){
    if(new Date(date.fromDate) > new Date(date.toDate)  ){
      alert("from date should be less than to date")
    }
    else{
    this.DetailedService.data=date;

       this.DetailedService.url="http://localhost:3000/fund/detailstatement/123456789012";
       
 this.DetailedService.postService().subscribe(res => {
this.sampleData = JSON.parse(res["_body"]);
console.log(this.sampleData);
if(this.sampleData["data"]=="No Records"){
this.isTrue =true;
}
else{
  this.isTrue =false;
  var length = this.details.length;
  for(var i=0;i< length;i++ ){
 this.details.pop();
 console.log("pop");
  }
console.log("data"+ this.details);
(this.sampleData).forEach(element => {
  var dateString =new Date( element.date).toDateString();
  console.log(dateString);
  if(element.hasOwnProperty("from"))
{
  this.details.push({
 Date:new Date( element.date).toDateString(),
    ChequeNo:undefined,
    TransactionRemarks:"",
    withdrawalAmount:undefined,
    depositAmount:element.amount,
    balanceAmount:element.currentBalance,
  });
  console.log(this.details);
}
else{
  this.details.push({
 Date:new Date( element.date).toDateString(),
    ChequeNo:undefined,
    TransactionRemarks:"",
    withdrawalAmount:element.amount,
    depositAmount:undefined,
    balanceAmount:element.currentBalance,
    });
}});}

   console.log(res)});
  }
  }
}

