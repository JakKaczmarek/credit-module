import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { StrategySelectorComponent } from './components/strategy-selector/strategy-selector.component';
import { SimulationResultComponent } from './components/simulation-result/simulation-result.component';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './core/header/header.component';
import { FooterComponent } from './core/footer/footer.component';
import { LoginComponent } from './page/login/login.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [StrategySelectorComponent, SimulationResultComponent, FormsModule, DropdownModule, InputTextModule, ButtonModule, TableModule, CommonModule, HeaderComponent, FooterComponent, LoginComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'credit-module';
  simulationResults: any = [];

  userLoggedIn: boolean = false;

  handleSimulationResult(result: any) {
    this.simulationResults.push(result);
  }

  onLoggedIn() {
    this.userLoggedIn = true;
  }
}
