import { Component, EventEmitter, Output } from '@angular/core';
import { CreditSimulationService, SimulationResult } from '../../services/credit-simulation.service';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { timer } from 'rxjs';
import { DialogModule } from 'primeng/dialog';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@Component({
  selector: 'app-strategy-selector',
  standalone: true,
  imports: [FormsModule, DropdownModule, InputTextModule, ButtonModule, DialogModule, ProgressSpinnerModule],
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

  showProgressDialog: boolean = false;
  progressMessage: string = '';

  @Output() simulationResult = new EventEmitter<SimulationResult>(); 

  

  constructor(private creditService: CreditSimulationService) {}
  simulate() {
    this.showProgressDialog = true;
    this.progressMessage = 'Przygotowywanie danych...';

    const processSteps = [
      { message: 'Przygotowywanie danych...', duration: 500 },
      { message: 'Symulacja strategii...', duration: 1000 },
      { message: 'Przetwarzanie wyników...', duration: 1500 },
      { message: 'Zakończono!', duration: 500 },
    ];

    let totalDuration = 0;

    processSteps.forEach((step, index) => {
      totalDuration += step.duration;
      timer(totalDuration).subscribe(() => {
        this.progressMessage = step.message;

        if (index === processSteps.length - 1) {
          setTimeout(() => {
            this.performSimulation();
            this.showProgressDialog = false;
          }, step.duration);
        }
      });
    });
  }

  performSimulation() {
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
