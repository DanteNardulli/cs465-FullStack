import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TripDataService } from '../trip-data.service';
import { Trip } from '../trip';
import { TripCardComponent } from '../trip-card/trip-card.component';
import { TripAddComponent } from '../trip-add/trip-add.component';
import { TripEditComponent } from '../trip-edit/trip-edit.component';

@Component({
  selector: 'app-trip-list',
  standalone: true,
  imports: [
    CommonModule,
    TripCardComponent,
    TripAddComponent,
    TripEditComponent
  ],
  templateUrl: './trip-list.component.html'
})
export class TripListComponent implements OnInit {
  trips: Trip[] = [];
  selectedTrip?: Trip;

  constructor(private tripService: TripDataService) { }

  ngOnInit(): void {
    this.tripService.getTrips().subscribe(trips => {
      console.log('TRIPS FROM API:', trips);
      this.trips = trips;
    });
  }


  onSelectTrip(trip: Trip): void {
    this.selectedTrip = { ...trip };
  }

  onTripAdded(_: Trip): void {
    this.tripService.getTrips().subscribe(trips => this.trips = trips);
  }


  onTripUpdated(trip: Trip): void {
    this.trips = this.trips.map(t => t.code === trip.code ? trip : t);
    this.selectedTrip = undefined;
  }

  onTripDeleted(code: string): void {
    this.trips = this.trips.filter(t => t.code !== code);
  }
}
