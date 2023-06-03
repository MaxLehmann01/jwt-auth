import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './views/index/index.component';
import { CustomersComponent } from './views/index/customers/customers.component';
import { SigninComponent } from './views/signin/signin.component';

const routes: Routes = [
  {
    path: '', component: IndexComponent, children: [
      { path: 'customers', component: CustomersComponent}
    ]
  },
  { path: 'signin', component: SigninComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
