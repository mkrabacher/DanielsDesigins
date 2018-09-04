import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LogRegComponent } from './log-reg/log-reg.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { MarketplaceComponent } from './marketplace/marketplace.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ProfileComponent } from './profile/profile.component';
import { NewItemComponent } from './new-item/new-item.component';
import { CartComponent } from './cart/cart.component';
import { ProductPageComponent } from './product-page/product-page.component';
import { ManageUsersComponent } from './manage-users/manage-users.component';
import { ManageProductsComponent } from './manage-products/manage-products.component';
import { EditItemComponent } from './edit-item/edit-item.component';

const routes: Routes = [
    { path: 'welcome', component: WelcomeComponent },
    { path: 'log-reg', component: LogRegComponent, outlet: 'popup' },
    { path: 'marketplace', component: MarketplaceComponent},
    { path: 'manage-users', component: ManageUsersComponent},
    { path: 'manage-products', component: ManageProductsComponent},
    { path: 'edit-item/:id', component: EditItemComponent, outlet: 'popup' },
    { path: 'new-item', component: NewItemComponent},
    { path: 'profile/:id', component: ProfileComponent},
    { path: 'product-page/:id', component: ProductPageComponent, outlet: 'popup'},
    { path: 'cart', component: CartComponent, outlet: 'cart'},
    { path: '', pathMatch: 'full', redirectTo: 'welcome' },
    { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
