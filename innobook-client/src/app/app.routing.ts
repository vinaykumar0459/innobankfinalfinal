import {NgModule} from "@angular/core"
import {ModuleWithProviders} from '@angular/core';
import {Routes,RouterModule} from '@angular/router';
import {AppComponent} from './app.component';
import { UserLoginComponent } from './components/useraction/user-login/user-login.component';
import { homepageComponent } from './components/homepage/homepage.component';
import { accountsummaryComponent } from './components/accountsummary/accountsummary.component';
import { editprofileComponent } from './components/editprofile/editprofile.component';
import { sidebarComponent } from './components/sidebar/sidebar.component';
import { UserRegisterComponent } from './components/useraction/user-register/user-register.component';
import { forgotpasswordComponent } from './components/useraction/forgotpassword/forgotpassword.component';
import { createnewaccountComponent } from './components/useraction/createnewaccount/createnewaccount.component';
import { accountsummarymainComponent } from './components/accountsummary/accountsummarymain/accountsummarymain.component';
import { FundTransferComponent } from './components/payments/fund-transfer/fund-transfer.component';
import {  MiniStatementComponent } from './components/statements/mini-statement/mini-statement.component';
import {  DetailedStatementComponent } from './components/statements/detailed-statement/detailed-statement.component';
import { NewAccountComponent } from './components/admin/new-account/new-account.component';
const appRoutes: Routes=[

   
{ path:'', component: homepageComponent, children : [
     { path: '',
      component : UserLoginComponent
     },
     { path: 'register', component: UserRegisterComponent },
     { path: 'forgotpassword', component: forgotpasswordComponent},
     { path: 'createnewaccount', component: createnewaccountComponent}
   ] },
{ path: 'dashboard', component: accountsummarymainComponent, children : [
  { path:"",redirectTo:"accountsummary",pathMatch:"full"},
     { path : 'accountsummary', component: accountsummaryComponent},
     { path: 'myprofile', component : editprofileComponent },
 {
    path:"ministatement",
    component:MiniStatementComponent
  },
{
    path:"fundtransfer",
    component:FundTransferComponent
  },{
    path:"detailedstatement",
    component:DetailedStatementComponent
  }

]} ,

{ path : 'accountrequests', component : NewAccountComponent }

];


export const appRoutingProviders: any[] = [

];

export const routing = RouterModule.forRoot(appRoutes);
