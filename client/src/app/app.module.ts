import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MenuComponent } from './components/menu/menu.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { PagenotfoundComponent } from './components/pagenotfound/pagenotfound.component';
import { HomeComponent } from './components/src/app/components/home/home.component';
import { PostComponent } from './components/src/app/components/post/post.component';
import { CreatepostComponent } from './components/post/src/app/components/post/createpost/createpost.component';
import { EditpostComponent } from './components/post/src/app/components/post/editpost/editpost.component';

const appRoutes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '**', component: PagenotfoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    MenuComponent,
    LoginComponent,
    RegisterComponent,
    PagenotfoundComponent,
    HomeComponent,
    PostComponent,
    CreatepostComponent,
    EditpostComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes, { useHash: true }),
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
