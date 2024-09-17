import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RestaurantListComponent } from './components/restaurant-list/restaurant-list.component';
import { RestaurantDetailsComponent } from './components/restaurant-details/restaurant-details.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'lista', component: RestaurantListComponent },
  { path: 'restaurant/:id', component: RestaurantDetailsComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];
