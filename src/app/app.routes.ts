import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home';
import { CategoryComponent } from './pages/category/category';
import { AboutComponent } from './pages/about/about';
import { SearchComponent } from './pages/search/search';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'category/:name', component: CategoryComponent },
  { path: 'about', component: AboutComponent },
  { path: 'search', component: SearchComponent },
  { path: '**', redirectTo: '' }
];
