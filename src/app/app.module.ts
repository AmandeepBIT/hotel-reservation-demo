import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BasicTableComponent } from './components/basic-table/basic-table.component';
import { FilterComponent } from './components/filter/filter.component';
import { DialogBoxComponent } from './components/dialog-box/dialog-box.component';
import { MaterialModule } from './material.module';
import { HeaderComponent } from './components/header/header.component';
import { ElectronService } from 'ngx-electronyzer';


@NgModule({
  declarations: [
    AppComponent,
    BasicTableComponent,
    DialogBoxComponent,
    HeaderComponent,
    FilterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    ToastrModule.forRoot(),
  ],
  
  providers: [HttpClient, ElectronService],
  
  bootstrap: [AppComponent],
})
export class AppModule { }
