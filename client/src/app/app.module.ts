import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { TreeviewModule } from 'ngx-treeview';
import { LoadingModule, ANIMATION_TYPES } from 'ngx-loading';

import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { UsersComponent } from './components/users/users.component';
import { UserComponent } from './components/users/user/user.component';
import { CreateuserComponent } from './components/users/createuser/createuser.component';
import { StaffComponent } from './components/users/createuser/staff/staff.component';
import { CustomerComponent } from './components/users/createuser/customer/customer.component';
import { StaffEditComponent } from './components/users/user/staff/staff.component';
import { CustomerEditComponent } from './components/users/user/customer/customer.component';
import { StoresComponent } from './components/stores/stores.component';
import { OrdersComponent } from './components/orders/orders.component';
import { PagenotfoundComponent } from './components/pagenotfound/pagenotfound.component';
import { LoginComponent } from './components/login/login.component';
import { StoreComponent } from './components/stores/store/store.component';
import { NavmenuComponent } from './components/navmenu/navmenu.component';
import { HeaderComponent } from './components/header/header.component';

// Services
import { AuthService} from './services/auth.service';
import { AuthGuard} from './guards/auth.guard';
import { UsersService } from './services/users.service';
import { RoleService } from './services/role.service';
import { StoresService } from './services/stores.service';
import { CompanyService } from './services/company.service';
import { ColschemasService } from './services/colschemas.service';
import { UnittypesService } from './services/unittypes.service';
import { SendremittanceService } from './services/sendremittance.service';
import { RegionService } from './services/region.service';
import { HistoryService } from './services/history.service';
import { CurrentpermissionService } from './services/currentpermission.service';

import { CreatestoreComponent } from './components/stores/createstore/createstore.component';
import { RoleComponent } from './components/role/role.component';
import { EditroleComponent } from './components/role/editrole/editrole.component';
import { CreateroleComponent } from './components/role/createrole/createrole.component';
import { CompanyComponent } from './components/company/company.component';
import { EditcompanyComponent } from './components/company/editcompany/editcompany.component';
import { CreateorderComponent } from './components/orders/createorder/createorder.component';
import { ProfileComponent } from './components/profile/profile.component';
import { StaffProfileComponent } from './components/profile/staff/staff.component';
import { CustomerProfileComponent } from './components/profile/customer/customer.component';
import { SuperComponent } from './components/profile/super/super.component';
import { UnittypeComponent } from './components/settings/unittype/unittype.component';
import { ColschemaComponent } from './components/settings/colschema/colschema.component';
import { CreateunitComponent } from './components/settings/unittype/createunit/createunit.component';
import { EditunitComponent } from './components/settings/unittype/editunit/editunit.component';
import { CreatecolComponent } from './components/settings/colschema/createcol/createcol.component';
import { EditcolComponent } from './components/settings/colschema/editcol/editcol.component';
import { CreatecompanyComponent } from './components/company/createcompany/createcompany.component';
import { ForgotpasswordComponent } from './components/forgotpassword/forgotpassword.component';
import { SupportofficeComponent } from './components/stores/supportoffice/supportoffice.component';
import { HistoryComponent } from './components/history/history.component';
import { HistorydetailComponent } from './components/history/historydetail/historydetail.component';

const appRoutes: Routes = [
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
  { path: 'users',     component: UsersComponent, canActivate: [AuthGuard] },
  { path: 'create', component: CreateuserComponent, canActivate: [AuthGuard]},
  { path: 'user/:id', component: UserComponent, canActivate: [AuthGuard]},
  { path: 'stores',    component: StoresComponent, canActivate: [AuthGuard] },
  { path: 'store/:id', component: StoreComponent, canActivate: [AuthGuard] },
  { path: 'createstore', component: CreatestoreComponent, canActivate: [AuthGuard]},
  { path: 'orders',    component: OrdersComponent, canActivate: [AuthGuard] },
  { path: 'orders/create', component: CreateorderComponent, canActivate: [AuthGuard] },
  { path: 'roles', component: RoleComponent, canActivate: [AuthGuard] },
  { path: 'createrole', component: CreateroleComponent, canActivate: [AuthGuard] },
  { path: 'role/:id', component: EditroleComponent, canActivate: [AuthGuard] },
  { path: 'companies', component: CompanyComponent, canActivate: [AuthGuard] },
  { path: 'companies/create', component: CreatecompanyComponent, canActivate: [AuthGuard] },
  { path: 'companies/:id', component: EditcompanyComponent, canActivate: [AuthGuard] },
  { path: 'support', component: SupportofficeComponent, canActivate: [AuthGuard] },
  { path: 'history', component: HistoryComponent, canActivate: [AuthGuard] },
  { path: 'detailhistory', component: HistorydetailComponent, canActivate: [AuthGuard] },
  { path: 'forgotpassword', component: ForgotpasswordComponent },
  {
    path: 'uni-types',
    component: UnittypeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'uni-types/create',
    component: CreateunitComponent,
    canActivate: [AuthGuard]
  },

  {
    path: 'uni-types/:id',
    component: EditunitComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'col-schema',
    component: ColschemaComponent,
    canActivate: [AuthGuard]
  },

  {
    path: 'col-schema/create',
    component: CreatecolComponent,
    canActivate: [AuthGuard]
  },

  {
    path: 'col-schema/:id',
    component: EditcolComponent,
    canActivate: [AuthGuard]
  },
  { path: 'login', component: LoginComponent },
  { path: '',   redirectTo: '/login', pathMatch: 'full' },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: '**', component: PagenotfoundComponent },
  { path: '404', component: PagenotfoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    UsersComponent,
    UserComponent,
    CreateuserComponent,
    StaffComponent,
    CustomerComponent,
    StaffEditComponent,
    CustomerEditComponent,
    StoresComponent,
    OrdersComponent,
    PagenotfoundComponent,
    LoginComponent,
    StoreComponent,
    NavmenuComponent,
    HeaderComponent,
    CreatestoreComponent,
    RoleComponent,
    EditroleComponent,
    CreateroleComponent,
    CompanyComponent,
    EditcompanyComponent,
    CreateorderComponent,
    ProfileComponent,
    StaffProfileComponent,
    CustomerProfileComponent,
    SuperComponent,
    UnittypeComponent,
    ColschemaComponent,
    CreateunitComponent,
    EditunitComponent,
    CreatecolComponent,
    EditcolComponent,
    CreatecompanyComponent,
    ForgotpasswordComponent,
    SupportofficeComponent,
    HistoryComponent,
    HistorydetailComponent,
  ],
  imports: [
    RouterModule.forRoot(appRoutes, { useHash: true }),
    TreeviewModule.forRoot(),
    BrowserModule,
    FormsModule,
    HttpModule,
    LoadingModule.forRoot({
        animationType: ANIMATION_TYPES.rectangleBounce,
        backdropBackgroundColour: 'rgba(255,255,255,0.1)',
        backdropBorderRadius: '4px',
        primaryColour: '#00bcd4',
        secondaryColour: '#ffffff',
        tertiaryColour: '#ffffff',
        fullScreenBackdrop: true
    }),
    CommonModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot()
  ],
  providers: [
    AuthService,
    AuthGuard,
    UsersService,
    RoleService,
    CompanyService,
    StoresService,
    ColschemasService,
    UnittypesService,
    SendremittanceService,
    RegionService,
    HistoryService,
    CurrentpermissionService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

