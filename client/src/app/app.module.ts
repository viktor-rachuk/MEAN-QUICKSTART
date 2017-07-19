import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { DashboardComponent } from './components/src/app/components/dashboard/dashboard.component';
import { MenuComponent } from './components/src/app/components/menu/menu.component';
import { LoginComponent } from './components/src/app/components/login/login.component';
import { RegisterComponent } from './components/src/app/components/register/register.component';
import { PagenotfoundComponent } from './components/src/app/components/pagenotfound/pagenotfound.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    MenuComponent,
    LoginComponent,
    RegisterComponent,
    PagenotfoundComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
