import { Component, OnInit } from '@angular/core';
import { AppService } from '../../../app.service';

@Component({
  selector: 'app-new-account',
  templateUrl: './new-account.component.html',
  styleUrls: ['./new-account.component.css']
})
export class NewAccountComponent implements OnInit {
  data : any;
  dat : any;
  index:any;
  response:any;
  constructor(private _appService:AppService) { }
  AcceptPerson(value){
      this._appService.url = 'http://localhost:3000/admin';
      this._appService.data = value;
      this._appService.postService().subscribe(response => {this.response = response.json();
        if(this.response.statusCode === 110){
            this.index = this.data.findIndex(x => x.aadharcardNumber == value.aadharcardNumber );
            this.data.splice(this.index,1);
        }
      })
  }
  declinePerson(value){
      this._appService.url = 'http://localhost:3000/admin/'+value.aadharcardNumber;
      this._appService.getService().subscribe(response => {this.response = response;
        if(this.response.statusCode === 110){
            this.index = this.data.findIndex(x => x.aadharcardNumber == value.aadharcardNumber );
            this.data.splice(this.index,1);
        }
      })
  }
  ngOnInit() {
    this._appService.url = 'http://localhost:3000/admin';
    this._appService.getService().subscribe(data =>{
      this.dat = data.json();
      console.log(this.dat.docs);
        this.data=this.dat.docs
    } )
  }

}