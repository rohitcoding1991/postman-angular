import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { LayoutComponent } from './layout/layout.component';
import { SimpleHttpComponent } from './screens/simple-http/simple-http.component';

import { HttpClientModule } from '@angular/common/http';
import { SharedService } from './services/shared.service';
import { ScheduleComponent } from './screens/schedule/schedule.component';
import { SidebarComponent } from './common/sidebar/sidebar.component';
import { HeaderComponent } from './common/header/header.component';
import { CollectionsComponent } from './pages/collections/collections.component';
import { AppRoutingModule } from './app-routing.module';
import { NgxUiLoaderModule } from 'ngx-ui-loader';





@NgModule({
  declarations: [
    AppComponent,
    SimpleHttpComponent,
    LayoutComponent,
    ScheduleComponent,
    SidebarComponent,
    HeaderComponent,
    CollectionsComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxUiLoaderModule.forRoot({})
   
  ],
  providers: [ SharedService],
  bootstrap: [AppComponent]
})
export class AppModule { }
