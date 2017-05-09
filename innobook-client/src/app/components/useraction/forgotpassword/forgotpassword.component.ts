import { Component, OnInit } from '@angular/core';
import{AppService} from '../../../app.service';
import{Router} from "@angular/router";
@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls : ['./forgotpassword.component.css']

})
export class forgotpasswordComponent implements OnInit {
user:forgot_data;
flag;
  constructor(private forgotService:AppService,private router:Router) {
    this.user={
      UID:"",
      mobile:undefined,
      password:"",
     confirmPassword:""
    }
  }
  resetPassword(user){
    this.forgotService.url="http://localhost:3000/users/forgotpassword";
    this.forgotService.data=user;
    this.forgotService.postService().subscribe(res=>{
      this.flag=res["_body"];
      console.log(this.flag);
      if(this.flag==1){
        this.router.navigate([""]);
      }else if(this.flag==0){
        alert("You have entered invalid details.");
        this.router.navigate(["forgotpassword"]);
      }else if(this.flag==2){
  alert("password and confirm passwords are mismatched.");
  this.router.navigate(["forgotpassword"]);
      }
    });
  }

  ngOnInit() {
  }

}
export class forgot_data{
  UID:string;
  mobile:number;
  password:string;
  confirmPassword:string;
}
