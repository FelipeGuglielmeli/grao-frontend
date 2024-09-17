import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../share/material.module';
import { Router } from '@angular/router';
import { RestaurantDto } from './restaurant.dto';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-restaurant-list',
  standalone: true,
  imports: [CommonModule, MaterialModule, FormsModule],
  templateUrl: './restaurant-list.component.html',
  styleUrls: ['./restaurant-list.component.css']
})
export class RestaurantListComponent implements OnInit {
  restaurants: RestaurantDto[] = [];
  isLoading: boolean = false;
  error: string | null = null;
  totalRestaurants: number = 0;
  currentPage: number = 1;
  lastPage: number = 1;
  searchTerm: string = '';
  searchControl = false

  constructor(private apiService: ApiService, private router: Router) { }

  ngOnInit(): void {
    this.apiService.openSearch.subscribe((res: any) => {
      this.searchControl = res
    })

    this.fetchRestaurants();
  }

  viewRestaurant(id: number) {
    this.router.navigate([`/restaurant/${id}`]);
  }

  fetchRestaurants(isFilter?: boolean): void {
    this.isLoading = true;
    this.apiService.getAllRestaurants(this.currentPage, 10, this.searchTerm).subscribe({
      next: (res) => {
        this.restaurants = res.data;
        this.totalRestaurants = res.total;
        this.lastPage = res.lastPage;
        this.isLoading = false;
      },
      error: (err) => {
        console.error(err);
        this.error = 'Erro ao buscar restaurantes. Tente novamente mais tarde.';
        this.isLoading = false;
      }
    });
  }

  goToDetails(id: number): void {
    this.router.navigate([`/restaurant/${id}`]);
  }

  onSearch(): void {
    this.currentPage = 1;
    this.fetchRestaurants();
  }

  goToPage(page: number): void {
    if (page > 0 && page <= this.lastPage) {
      this.currentPage = page;
      this.fetchRestaurants();
    }
  }
}
