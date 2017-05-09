import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {enableProdMode} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {Ng2PaginationModule} from 'ng2-pagination';
import {Routes,RouterModule} from '@angular/router';
import {routing,appRoutingProviders} from './app.routing';
import {ModuleWithProviders} from '@angular/core';
import { AppComponent } from './app.component';
import { AdminLoginComponent } from './components/admin/admin-login/admin-login.component';
import { NewAccountComponent } from './components/admin/new-account/new-account.component';
import { UserLoginComponent } from './components/useraction/user-login/user-login.component';
import { UserRegisterComponent } from './components/useraction/user-register/user-register.component';
import { FundTransferComponent } from './components/payments/fund-transfer/fund-transfer.component';
import { AccountSummaryComponent } from './components/myaccounts/account-summary/account-summary.component';
import { MiniStatementComponent } from './components/statements/mini-statement/mini-statement.component';
import {  DetailedStatementComponent } from './components/statements/detailed-statement/detailed-statement.component';
import { headerComponent } from './components/headerSection/header.component';
import { footerComponent } from './components/footerSection/footer.component';
import { homepageComponent } from './components/homepage/homepage.component';
import { sidebarComponent } from './components/sidebar/sidebar.component';
import { editprofileComponent } from './components/editprofile/editprofile.component';
import { accountsummaryComponent } from './components/accountsummary/accountsummary.component';
import { navmenuComponent } from './components/navmenu/navmenu.component';
import { UserloginrightComponent } from './components/useraction/user-login-right/user-login-right.component';

import { detailedstatementComponent } from './components/payments/detailedstatement/detailedstatement.component';
import { headerloginComponent } from './components/headerSection/headerlogin/headerlogin.component';
import { accountsummarymainComponent } from './components/accountsummary/accountsummarymain/accountsummarymain.component';
import { forgotpasswordComponent } from './components/useraction/forgotpassword/forgotpassword.component';
import { createnewaccountComponent } from './components/useraction/createnewaccount/createnewaccount.component';
import { userlinksComponent } from './components/useraction/userlinks/userlinks.component';
import {AppService} from './app.service';


enableProdMode();



@NgModule({
  declarations: [
    AppComponent,
    AdminLoginComponent,
    NewAccountComponent,
    UserLoginComponent,
    UserRegisterComponent,
    FundTransferComponent,
    AccountSummaryComponent,
    MiniStatementComponent,
    DetailedStatementComponent,
    headerComponent,
    footerComponent,
    homepageComponent,
    sidebarComponent,
    editprofileComponent,
    accountsummaryComponent,
    navmenuComponent,
    UserloginrightComponent,
   
    detailedstatementComponent,
    headerloginComponent,
    accountsummarymainComponent,
    forgotpasswordComponent,
    createnewaccountComponent,
    userlinksComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    Ng2PaginationModule,
    routing
  ],
  providers: [AppService,appRoutingProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
