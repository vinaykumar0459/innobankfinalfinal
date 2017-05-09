import { user } from './../user-interface';
import { AppService } from './../../app.service';
import { Component, OnInit } from '@angular/core';


 @Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.component.html'

})
export class editprofileComponent implements OnInit {

 user: user;
 dataObj:any;
data:any;

  constructor(private appService: AppService ) {
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
    // createdDate: Date;
  }
   }

  ngOnInit() {

        this.appService.url='http://localhost:3000/myprofile/457885689589';
     //this.appService.data={'aadhar':719749414342};
    this.appService.getService().subscribe(res =>{
      this.data=res[
        '_body'
      ];
     this.dataObj =JSON.parse(this.data);
     console.log(JSON.parse(this.data));
      if(this.dataObj[0]!=null){
 console.log(this.dataObj[0]);
     this.user = this.dataObj[0];
     console.log(this.user);
      }
  //     else{
  //         this.user ={
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
  //   // createdDate: Date;
  // }
    //  }
    
    })
  }

}
