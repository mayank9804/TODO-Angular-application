import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { TodoComponent } from './todomain/todomain.component';
import {RouterModule} from '@angular/router'
import { PageNotFound } from './pagenotfound/pagenotfound.component';

@NgModule({
  declarations: [
    AppComponent,TodoComponent,PageNotFound
  ],
  imports: [
    //RouterModule registers Router Service provider for us, declares the router directives, exposes configured routes
    BrowserModule,BrowserAnimationsModule,RouterModule.forRoot([
      {path:'todoApp',component:TodoComponent},
      {path:'',redirectTo:'todoApp',pathMatch:'full'},
      {path:'**',component:PageNotFound}
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
