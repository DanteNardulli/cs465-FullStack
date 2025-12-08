import { Component } from '@angular/core';
import { TripListComponent } from './trip-list/trip-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [TripListComponent],
  template: `
    <h1>Travlr Admin</h1>
    <app-trip-list></app-trip-list>
  `
})
export class AppComponent { }
