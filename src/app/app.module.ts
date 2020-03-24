import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { SidevarComponent } from './components/sidevar/sidevar.component';
import { IndexComponent } from './components/dashboard/index/index.component';
import { FormsModule } from '@angular/forms';
import { CategoriesComponent } from './components/dashboard/categories/categories.component';
import { AddCategoriesComponent } from './components/add-categories/add-categories.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SidevarComponent,
    IndexComponent,
    CategoriesComponent,
    AddCategoriesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    BrowserAnimationsModule,
    AngularFirestoreModule,
    AngularFireAuthModule, FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
