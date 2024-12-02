import { Component, Input } from '@angular/core';
import { SimulationResult } from '../../services/credit-simulation.service';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-simulation-result',
  templateUrl: './simulation-result.component.html',
  styleUrls: ['./simulation-result.component.scss'],
  standalone: true,
  imports: [TableModule, CommonModule],
})
export class SimulationResultComponent {
  @Input() results: SimulationResult[] = [];

}
