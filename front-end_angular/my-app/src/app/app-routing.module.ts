/* Import all modules, libraries and services. */
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminUserTypesComponent } from './admin/admin-user-types/admin-user-types.component';
import { AdminSocialNetworksComponent } from './admin/admin-social-networks/admin-social-networks.component';
import { AdminCountriesComponent } from './admin/admin-countries/admin-countries.component';
import { AdminCountryAudienceComponent } from './admin/admin-country-audience/admin-country-audience.component';
import { AdminGenderAudienceComponent } from './admin/admin-gender-audience/admin-gender-audience.component';
import { AdminGendersComponent } from './admin/admin-genders/admin-genders.component';
import { AdminLegalUsersComponent } from './admin/admin-legal-users/admin-legal-users.component';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';
import { AdminPerformerServicesComponent } from './admin/admin-performer-services/admin-performer-services.component';
import { AdminPrivateUsersComponent } from './admin/admin-private-users/admin-private-users.component';
import { CustomerAccountComponent } from './customer/customer-account/customer-account.component';
import { CustomerOrdersComponent } from './customer/customer-orders/customer-orders.component';
import { CustomerServicesComponent } from './customer/customer-services/customer-services.component';
import { PerformerAccountComponent } from './performer/performer-account/performer-account.component';
import { PerformerOrdersComponent } from './performer/performer-orders/performer-orders.component';
import { PerformerServicesComponent } from './performer/performer-services/performer-services.component';
import { LoginComponent } from './login/login.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { RegistrationComponent } from './registration/registration.component';
import { AdminAdminUsersComponent } from './admin/admin-admin-users/admin-admin-users.component';

/* Definition of routes for each component. */
const routes: Routes = [
  { path: 'registration', component: RegistrationComponent },
  { path: 'login', component: LoginComponent },
  { path: 'customer/account', component: CustomerAccountComponent },
  { path: 'customer/orders', component: CustomerOrdersComponent },
  { path: 'customer/services', component: CustomerServicesComponent },
  { path: 'performer/account', component: PerformerAccountComponent },
  { path: 'performer/orders', component: PerformerOrdersComponent },
  { path: 'performer/services', component: PerformerServicesComponent },
  { path: 'admin/usertypes', component: AdminUserTypesComponent },
  { path: 'admin/socialnetworks', component: AdminSocialNetworksComponent },
  { path: 'admin/adminusers', component: AdminAdminUsersComponent },
  { path: 'admin/countries', component: AdminCountriesComponent },
  { path: 'admin/countryaudience', component: AdminCountryAudienceComponent },
  { path: 'admin/genderaudience', component: AdminGenderAudienceComponent },
  { path: 'admin/genders', component: AdminGendersComponent },
  { path: 'admin/legalusers', component: AdminLegalUsersComponent },
  { path: 'admin/privateusers', component: AdminPrivateUsersComponent },
  { path: 'admin/orders', component: AdminOrdersComponent },
  { path: 'admin/performerservices', component: AdminPerformerServicesComponent },
  { path: '**', component: NotFoundComponent },
  { path: '', component: NotFoundComponent }
];

/* Decorator function NgModule.*/
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

/* Module view using class. */
export class AppRoutingModule { }
