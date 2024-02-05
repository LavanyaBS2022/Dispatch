import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { DispatchPageModule } from './dispatch/dispatch.module';
import { DispatchDetailsPageModule } from './dispatch-details/dispatch-details.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginPageModule } from './login/login.module';
import { HttpClientModule } from '@angular/common/http';
import { NgxSpinnerModule } from "ngx-spinner";


@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule,
     IonicModule.forRoot(),
     HttpClientModule,
      AppRoutingModule,
      DispatchPageModule,
      LoginPageModule,
      DispatchDetailsPageModule, 
      BrowserAnimationsModule,
      NgxSpinnerModule,
    ],
      
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
