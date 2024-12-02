import { Injectable } from '@angular/core';

export interface SimulationResult {
  totalCost: number;
  totalTime: number;
  savings: number;
  frequency: string
}

@Injectable({
  providedIn: 'root'
})
export class CreditSimulationService {
  calculateStrategy(amount: number, frequency: string, loanAmount: number, interestRate: number, loanDuration: number): SimulationResult {
    
    const monthlyRate = interestRate / 12 / 100;
    let totalCost = loanAmount * (1 + monthlyRate * loanDuration);
    let totalTime = loanDuration;

    let savings = 0;

    if (frequency === 'Jednorazowa') {
      totalCost -= amount;
      savings = amount * monthlyRate * loanDuration / 2;
    }
    else if (frequency === 'Kwartalna') {
      const quarterlyPayments = Math.floor(loanDuration / 3);
      totalCost -= amount * quarterlyPayments;
      savings = amount * quarterlyPayments * monthlyRate * 3;
    } else if (frequency === 'Roczna') {
      const yearlyPayments = Math.floor(loanDuration / 12);
      totalCost -= amount * yearlyPayments;
      savings = amount * yearlyPayments * monthlyRate * 12;
    }
    else if (frequency === 'Miesięczna') {
      totalCost -= amount * loanDuration;
      savings = amount * loanDuration * monthlyRate;
    }

    totalTime -= Math.floor(savings / (loanAmount * monthlyRate));

    return {
      frequency: frequency,
      totalCost: Math.max(totalCost, 0),
      totalTime: Math.max(totalTime, 0),
      savings: Math.max(savings, 0)
    };
  }
}
