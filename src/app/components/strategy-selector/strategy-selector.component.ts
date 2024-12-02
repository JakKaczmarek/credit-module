import { Component, EventEmitter, Output } from '@angular/core';
import { CreditSimulationService, SimulationResult } from '../../services/credit-simulation.service';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-strategy-selector',
  standalone: true,
  imports: [FormsModule, DropdownModule, InputTextModule, ButtonModule],
  templateUrl: './strategy-selector.component.html',
  styleUrls: ['./strategy-selector.component.scss'] 
})
export class StrategySelectorComponent {
  loanAmount: number = 100000;
  interestRate: number = 5;
  loanDuration: number = 120;
  amount: number = 1000;
  frequency: string = 'Miesięczna';
  simulationResults: SimulationResult[] = [];
  @Output() simulationResult = new EventEmitter<SimulationResult>(); 

  constructor(private creditService: CreditSimulationService) {}
 simulate() {
    const result = this.creditService.calculateStrategy(
      this.amount,
      this.frequency,
      this.loanAmount,
      this.interestRate,
      this.loanDuration
    );
    this.simulationResult.emit(result);
  }

  
}
