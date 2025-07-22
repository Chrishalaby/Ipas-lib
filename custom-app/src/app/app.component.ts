import { Component } from '@angular/core';
import { CustomDashboardComponent } from './custom-dashboard.component';

@Component({
  selector: 'app-root',
  imports: [CustomDashboardComponent],
  template: `<app-custom-dashboard></app-custom-dashboard>`,
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'custom-app';
}
