/* Import all modules, libraries and services. */
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CountriesService } from './services/countries.service';
import { UserTypesService } from './services/user-types.service';
import { CountryAudienceService } from './services/country-audience.service';
import { GenderAudienceService } from './services/gender-audience.service';
import { GendersService } from './services/genders.service';
import { LegalUsersService } from './services/legal-users.service';
import { OrdersService } from './services/orders.service';
import { PerformerServicesService } from './services/performer-services.service';
import { PrivateUsersService } from './services/private-users.service';
import { SocialNetworksService } from './services/social-networks.service';
import { AdminUserTypesComponent } from './admin/admin-user-types/admin-user-types.component';
import { AdminSocialNetworksComponent } from './admin/admin-social-networks/admin-social-networks.component';
import { AdminCountriesComponent } from './admin/admin-countries/admin-countries.component';
import { AdminCountryAudienceComponent } from './admin/admin-country-audience/admin-country-audience.component';
import { AdminGenderAudienceComponent } from './admin/admin-gender-audience/admin-gender-audience.component';
import { AdminGendersComponent } from './admin/admin-genders/admin-genders.component';
import { AdminHeaderComponent } from './admin/admin-header/admin-header.component';
import { AdminLegalUsersComponent } from './admin/admin-legal-users/admin-legal-users.component';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';
import { AdminPerformerServicesComponent } from './admin/admin-performer-services/admin-performer-services.component';
import { AdminPrivateUsersComponent } from './admin/admin-private-users/admin-private-users.component';
import { CustomerAccountComponent } from './customer/customer-account/customer-account.component';
import { CustomerHeaderComponent } from './customer/customer-header/customer-header.component';
import { CustomerOrdersComponent } from './customer/customer-orders/customer-orders.component';
import { CustomerServicesComponent } from './customer/customer-services/customer-services.component';
import { PerformerAccountComponent } from './performer/performer-account/performer-account.component';
import { PerformerHeaderComponent } from './performer/performer-header/performer-header.component';
import { PerformerOrdersComponent } from './performer/performer-orders/performer-orders.component';
import { PerformerServicesComponent } from './performer/performer-services/performer-services.component';
import { AdminAdminUsersComponent } from './admin/admin-admin-users/admin-admin-users.component';
import { LoginComponent } from './login/login.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { RegistrationComponent } from './registration/registration.component';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { AdminUsersService } from './services/admin-users.service';
import { AuthService } from './services/auth.service';

/* Decorator function NgModule.*/
@NgModule({
  /* View classes that belong to the module. */
  declarations: [
    AppComponent,
    AdminCountriesComponent,
    AdminAdminUsersComponent,
    AdminCountryAudienceComponent,
    AdminGenderAudienceComponent,
    AdminGendersComponent,
    AdminHeaderComponent,
    AdminLegalUsersComponent,
    AdminOrdersComponent,
    AdminPerformerServicesComponent,
    AdminPrivateUsersComponent,
    AdminSocialNetworksComponent,
    AdminUserTypesComponent,
    CustomerAccountComponent,
    CustomerHeaderComponent,
    CustomerOrdersComponent,
    CustomerServicesComponent,
    PerformerAccountComponent,
    PerformerHeaderComponent,
    PerformerOrdersComponent,
    PerformerServicesComponent,
    LoginComponent,
    NotFoundComponent,
    RegistrationComponent,
    AdminAdminUsersComponent
  ],
  /* Other modules whose classes are required for component templates from the current module. */
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    AngularFontAwesomeModule
  ],
  /* Classes that create services used by the module. */
  providers: [
    CountriesService,
    CountryAudienceService,
    GenderAudienceService,
    GendersService,
    LegalUsersService,
    OrdersService,
    PerformerServicesService,
    PrivateUsersService,
    SocialNetworksService,
    UserTypesService,
    AdminUsersService,
    AuthService
  ],
  /* The root component that is called by default when the application loads. */
  bootstrap: [AppComponent]
})

/* Module view using class. */
export class AppModule { }
