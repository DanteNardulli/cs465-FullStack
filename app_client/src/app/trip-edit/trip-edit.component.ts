import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Trip } from '../trip';
import { TripDataService } from '../trip-data.service';

@Component({
  selector: 'app-trip-edit',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './trip-edit.component.html'
})
export class TripEditComponent {
  @Input() trip!: Trip;
  @Output() updated = new EventEmitter<Trip>();

  constructor(private tripService: TripDataService) { }

  onSubmit(): void {
    this.tripService.updateTrip(this.trip.code, this.trip)
      .subscribe(updatedTrip => this.updated.emit(updatedTrip));
  }
}
