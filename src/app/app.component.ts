import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ResponsiveNavigationComponent } from './components/share/responsive-navigation/responsive-navigation.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ResponsiveNavigationComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'frontend';
}
