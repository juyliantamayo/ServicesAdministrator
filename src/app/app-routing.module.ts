import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { IndexComponent } from './components/dashboard/index/index.component';
import { CategoriesComponent } from './components/dashboard/categories/categories.component';
import { AddCategoriesComponent } from './components/dashboard/categories/add-categories/add-categories.component';
import { DeleteCategorieComponent } from './components/dashboard/categories/delete-categorie/delete-categorie.component';

const routes: Routes = [
  { path: "", component: LoginComponent }, 
  { path: "index", component: IndexComponent }, 
  { path: "categorias", component: CategoriesComponent }, 
  { path: "agregar", component: AddCategoriesComponent },
  { path: "eliminar", component: DeleteCategorieComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
