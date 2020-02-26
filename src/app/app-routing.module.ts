import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { IndexComponent } from './components/dashboard/index/index.component';
import { CategoriesComponent } from './components/dashboard/categories/categories.component';

const routes: Routes = [{ path: "", component: LoginComponent }, { path: "index", component: IndexComponent }, { path: "categorias", component: CategoriesComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
