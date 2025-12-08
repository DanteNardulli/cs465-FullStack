import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Trip } from '../trip';
import { TripDataService } from '../trip-data.service';

@Component({
  selector: 'app-trip-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './trip-card.component.html'
})
export class TripCardComponent {
  @Input() trip!: Trip;
  @Output() edit = new EventEmitter<void>();
  @Output() deleted = new EventEmitter<string>();

  constructor(private tripService: TripDataService) { }

  onEdit(): void {
    this.edit.emit();
  }

  onDelete(): void {
    if (confirm('Delete this trip?')) {
      this.tripService.deleteTrip(this.trip.code).subscribe(() => {
        this.deleted.emit(this.trip.code);
      });
    }
  }
}
