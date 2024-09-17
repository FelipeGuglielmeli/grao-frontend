import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RestaurantListDto } from '../components/restaurant-list/restaurant.dto';
import { RestaurantDto, MenuDto, RatingDto } from '../components/restaurant-details/restaurant-details.dto';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = 'http://localhost:3000';
  readonly openSearch = new EventEmitter();

  constructor(private http: HttpClient) { }

  emitOpenSearch(status: boolean) {
    this.openSearch.emit(status);
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/login`, { email, password }, { withCredentials: true });
  }

  getAllRestaurants(page: number = 1, limit: number = 10, searchTerm: string = ''): Observable<RestaurantListDto> {
    let url = `${this.apiUrl}/restaurant?page=${page}&limit=${limit}`;
    if (searchTerm) {
      url += `&searchTerm=${searchTerm}`;
    }
    return this.http.get<RestaurantListDto>(url);
  }

  getRestaurantDetails(restaurantId: number): Observable<RestaurantDto> {
    const url = `${this.apiUrl}/restaurant/${restaurantId}`;
    return this.http.get<RestaurantDto>(url);
  }

  getRestaurantMenu(restaurantId: number): Observable<MenuDto> {
    const url = `${this.apiUrl}/restaurant/${restaurantId}/menu`;
    return this.http.get<MenuDto>(url);
  }

  getRestaurantRatings(restaurantId: number): Observable<RatingDto[]> {
    const url = `${this.apiUrl}/rating/restaurant/${restaurantId}`;
    return this.http.get<RatingDto[]>(url);
  }

  createRating(restaurantId: number, userId: string, comment: string, rating: number): Observable<RatingDto> {
    const url = `${this.apiUrl}/rating`;

    const body = {
      restaurantId,
      userId,
      comment,
      rating
    };

    return this.http.post<RatingDto>(url, body);
  }
}
