import { Component, Input } from '@angular/core';
import { SimulationResult } from '../../services/credit-simulation.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent {
  @Input() history: SimulationResult[] = [];
}
