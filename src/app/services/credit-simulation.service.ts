import { Injectable } from '@angular/core';

export interface SimulationResult {
  totalCost: number;
  totalTime: number;
  savings: number;
  frequency: string
}

@Injectable({
  providedIn: 'root',
})
export class CreditSimulationService {
  calculateStrategy(
    amount: number,
    frequency: string,
    loanAmount: number,
    interestRate: number,
    loanDuration: number
  ): SimulationResult {
    const monthlyRate = interestRate / 12 / 100;
    let remainingAmount = loanAmount;
    let totalCost = 0;
    let totalTime = loanDuration;
    let savings = 0;

    // Calculate initial total interest without overpayment
    const initialMonthlyPayment = this.calculateMonthlyPayment(loanAmount, monthlyRate, loanDuration);
    const initialTotalInterest = (initialMonthlyPayment * loanDuration) - loanAmount;

    if (frequency === 'Jednorazowa') {
      // Apply one-time overpayment at the beginning
      remainingAmount -= amount;
      if (remainingAmount < 0) remainingAmount = 0;

      // Recalculate monthly payment and total interest after overpayment
      const newMonthlyPayment = this.calculateMonthlyPayment(remainingAmount, monthlyRate, loanDuration);
      const newTotalInterest = (newMonthlyPayment * loanDuration) - remainingAmount;

      savings = initialTotalInterest - newTotalInterest;
      totalCost = newMonthlyPayment * loanDuration;
    } else {
      // Implement periodic overpayment calculations
      const periodLength = this.getPeriodLength(frequency); // Number of months between overpayments
      let month = 0;
      let totalInterestPaid = 0;

      while (remainingAmount > 0 && month < loanDuration) {
        const monthlyPayment = this.calculateMonthlyPayment(loanAmount, monthlyRate, loanDuration);
        const interest = remainingAmount * monthlyRate;
        const principal = monthlyPayment - interest;

        // Apply overpayment if it's the correct period
        if (month % periodLength === 0 && month !== 0) {
          remainingAmount -= amount;
          if (remainingAmount < 0) remainingAmount = 0;
        }

        remainingAmount -= principal;
        totalInterestPaid += interest;
        month++;
      }

      totalCost = (loanAmount - remainingAmount) + totalInterestPaid;
      totalTime = month;
      savings = initialTotalInterest - totalInterestPaid;
    }

    return {
      frequency: frequency,
      totalCost: Math.max(totalCost, 0),
      totalTime: Math.max(totalTime, 0),
      savings: Math.max(savings, 0),
    };
  }

  private calculateMonthlyPayment(loanAmount: number, monthlyRate: number, loanDuration: number): number {
    return (loanAmount * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -loanDuration));
  }

  private getPeriodLength(frequency: string): number {
    switch (frequency) {
      case 'Kwartalna':
        return 3; // 3 months
      case 'Roczna':
        return 12; // 12 months
      case 'Miesięczna':
        return 1; // 1 month
      default:
        return 1; // Default to 1 month
    }
  }
}