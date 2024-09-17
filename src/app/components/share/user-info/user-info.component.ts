import { Component, Input } from '@angular/core';
import { MaterialModule } from '../material.module';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css'],
  standalone: true,
  imports: [MaterialModule, CommonModule]
})
export class UserInfoComponent {
  @Input() isMobile: boolean = false;
  userName = sessionStorage.getItem('userName')
  constructor() { }
}
