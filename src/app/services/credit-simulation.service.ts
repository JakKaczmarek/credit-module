import { Injectable } from '@angular/core';

export interface SimulationResult {
  strategy: string;
  totalCost: number;
  totalTime: number;
  savings: number;
}

@Injectable({
  providedIn: 'root'
})
export class CreditSimulationService {
  calculateStrategy(amount: number, frequency: string, loanAmount: number, interestRate: number, loanDuration: number): SimulationResult {
    // Prosta logika symulacji nadpłaty
    const monthlyRate = interestRate / 12 / 100;
    let totalCost = loanAmount * (1 + monthlyRate * loanDuration);
    let totalTime = loanDuration;

    let savings = 0;

    if (frequency === 'one-time') {
      totalCost -= amount;
      savings = amount * monthlyRate * loanDuration / 2;
    } else if (frequency === 'monthly') {
      totalCost -= amount * loanDuration;
      savings = amount * loanDuration * monthlyRate;
    }

    totalTime -= Math.floor(savings / (loanAmount * monthlyRate));

    return {
      strategy: frequency,
      totalCost: Math.max(totalCost, 0),
      totalTime: Math.max(totalTime, 0),
      savings: Math.max(savings, 0)
    };
  }
}
