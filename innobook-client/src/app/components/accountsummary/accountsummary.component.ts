import { Component, OnInit } from '@angular/core';
import {AppService} from  '../../app.service'
@Component({
  selector: 'app-accountsummary',
  templateUrl: './accountsummary.component.html'

})
export class accountsummaryComponent implements OnInit {
   details:any;
   user:any;
   dataobj:any;
  constructor(private appService:AppService) {
    this.user ={
     firstName: "",
    // lastName: string;
    email: "",
    // password: string;
    mobileNumber: undefined,
    // gender: string;
    dob: null,
    // userID: string;
    address: "",
    pancardNumber: "",
    aadharcardNumber: undefined,
     createdDate: null
  }

   }

  ngOnInit() {
    this.appService.url='http://localhost:3000/myprofile/457885689589';
    //this.appService.data="719749414556";
    this.appService.getService().subscribe(user1=>{
     this.details=user1['_body'];
     console.log(user1)
     console.log(this.details);
     this.dataobj=JSON.parse(this.details);
    //this.dataobj=this.details;
    if(this.dataobj[0]!=null){
     this.user=this.dataobj[0];
     console.log(this.user);}
  //    else{
  //       this.user ={
  //    firstName: "",
  //   // lastName: string;
  //   email: "",
  //   // password: string;
  //   mobileNumber: undefined,
  //   // gender: string;
  //   dob: null,
  //   // userID: string;
  //   address: "",
  //   pancardNumber: "",
  //   aadharcardNumber: undefined,
  //    createdDate: null
  // }
  //    }

    //console.log(user.json());
    })
}

  }

//  this.data=res[
//         '_body'
//       ];
//      this.dataObj =JSON.parse(this.data);
//      console.log(JSON.parse(this.data));
//      console.log(this.dataObj[0]);
//      this.user = this.dataObj[0];
