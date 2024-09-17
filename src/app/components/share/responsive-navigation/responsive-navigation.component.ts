import { UserInfoComponent } from './../user-info/user-info.component';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MaterialModule } from '../material.module';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'responsive-navigation',
  templateUrl: './responsive-navigation.component.html',
  standalone: true,
  imports: [RouterOutlet, CommonModule, MaterialModule, RouterModule, UserInfoComponent],
  styleUrls: ['./responsive-navigation.component.css']
})
export class ResponsiveNavigationComponent implements OnInit, OnDestroy {
  isScreenSmall!: boolean;
  private _breakpointSubscription: any;
  status = true

  constructor(
    private readonly breakpointObserver: BreakpointObserver,
    readonly router: Router,
    readonly apiService: ApiService
  ) { }

  ngOnInit() {
    this._breakpointSubscription = this.breakpointObserver
      .observe([Breakpoints.Handset])
      .pipe(map((result) => result.matches))
      .subscribe((isHandset) => (this.isScreenSmall = isHandset));
  }

  emitFilter() {
    if (this.router.url === '/lista') {
      this.apiService.emitOpenSearch(this.status)
      this.status = !this.status
    } else {
      this.redirectHome()
      setTimeout(() => {
        this.status = true
        this.apiService.emitOpenSearch(this.status)
        this.status = false
      }, 1000);
    }
  }

  logout() {
    sessionStorage.removeItem('accessToken');
    sessionStorage.removeItem('user');

    this.router.navigate(['/login']);
  }

  redirectHome() {
    this.router.navigate(["/lista"])
  }

  ngOnDestroy() {
    if (this._breakpointSubscription) {
      this._breakpointSubscription.unsubscribe();
    }
  }
}
