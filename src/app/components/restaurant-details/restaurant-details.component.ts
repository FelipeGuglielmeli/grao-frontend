import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { RestaurantDto, MenuDto, RatingDto } from './restaurant-details.dto';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-restaurant-details',
  standalone: true,
  templateUrl: './restaurant-details.component.html',
  styleUrls: ['./restaurant-details.component.css'],
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule
  ]
})
export class RestaurantDetailsComponent implements OnInit {
  restaurantDetails: RestaurantDto | null = null;
  menu: MenuDto | null = null;
  ratings: RatingDto[] = [];
  isLoading: boolean = false;
  isRatingsLoading: boolean = false;
  error: string | null = null;
  newComment: string = '';
  newRating: number = 0;
  isSubmittingRating: boolean = false;
  showRatingForm: boolean = false;

  constructor(private apiService: ApiService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const restaurantId = this.route.snapshot.params['id'];
    this.fetchRestaurantDetails(restaurantId);
    this.fetchRestaurantMenu(restaurantId);
    this.loadRatings();
  }

  fetchRestaurantDetails(restaurantId: number): void {
    this.isLoading = true;
    this.apiService.getRestaurantDetails(restaurantId).subscribe({
      next: (res) => {
        this.restaurantDetails = res;
        this.isLoading = false;
      },
      error: (err) => {
        console.error(err);
        this.error = 'Erro ao buscar detalhes do restaurante.';
        this.isLoading = false;
      },
    });
  }

  fetchRestaurantMenu(restaurantId: number): void {
    this.isLoading = true;
    this.apiService.getRestaurantMenu(restaurantId).subscribe({
      next: (res) => {
        this.menu = res;
        this.isLoading = false;
      },
      error: (err) => {
        console.error(err);
        this.error = 'Erro ao buscar o cardápio.';
        this.isLoading = false;
      },
    });
  }

  loadRatings(): void {
    const restaurantId = this.route.snapshot.params['id'];
    this.isRatingsLoading = true;
    this.apiService.getRestaurantRatings(restaurantId).subscribe({
      next: (res) => {
        this.ratings = res;
        this.isRatingsLoading = false;
      },
      error: (err) => {
        console.error(err);
        this.error = 'Erro ao carregar as avaliações.';
        this.isRatingsLoading = false;
      },
    });
  }

  setRating(star: number): void {
    this.newRating = star;
  }

  submitRating(): void {
    if (this.newRating > 0 && this.newComment.trim()) {
      const restaurantId = this.route.snapshot.params['id'];
      const userId = sessionStorage.getItem('userId') || '';
      this.isSubmittingRating = true;

      this.apiService.createRating(restaurantId, userId, this.newComment, this.newRating).subscribe({
        next: (res) => {
          this.ratings.push(res);
          this.newComment = '';
          this.newRating = 0;
          this.isSubmittingRating = false;
          this.showRatingForm = false;
        },
        error: (err) => {
          console.error('Erro ao enviar avaliação:', err);
          this.isSubmittingRating = false;
        },
      });
    }
  }

  toggleRatingForm(): void {
    this.showRatingForm = !this.showRatingForm;
  }
}
