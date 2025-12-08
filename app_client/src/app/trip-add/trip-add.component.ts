import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Trip } from '../trip';
import { TripDataService } from '../trip-data.service';

@Component({
  selector: 'app-trip-add',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './trip-add.component.html'
})
export class TripAddComponent {
  @Output() added = new EventEmitter<Trip>();

  trip: Trip = {
    code: '',
    name: '',
    length: 1,
    start: '',
    resort: '',
    perPerson: 0,
    description: ''
  };

  constructor(private tripService: TripDataService) { }

  onSubmit(): void {
    this.tripService.addTrip(this.trip).subscribe(newTrip => {
      this.added.emit(newTrip);
      this.trip = {
        code: '',
        name: '',
        length: 1,
        start: '',
        resort: '',
        perPerson: 0,
        description: ''
      };
    });
  }
}
