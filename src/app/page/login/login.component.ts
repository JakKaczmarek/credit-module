import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { timer } from 'rxjs';

@Component({
  selector: 'app-login',
  imports: [FormsModule, InputTextModule, ButtonModule, DialogModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  @Output() loggedIn = new EventEmitter<boolean>();

  showProgressDialog: boolean = false;
  progressMessage: string = '';

  onSubmit() {
    this.showProgressDialog = true;
    this.progressMessage = 'Trwa wysyłanie danych...';

    const processSteps = [
      { message: 'Trwa wysyłanie danych...', duration: 500 },
      { message: 'Sprawdzanie loginu i hasła...', duration: 1500 },
      { message: 'Nadawanie dostępu dla użytkownika...', duration: 1000 },
      { message: 'Sukces!', duration: 500 },
    ];

    let totalDuration = 0;

    processSteps.forEach((step, index) => {
      totalDuration += step.duration;
      timer(totalDuration).subscribe(() => {
        this.progressMessage = step.message;

        if (index === processSteps.length - 1) {
          setTimeout(() => {
            this.showProgressDialog = false;
            this.loggedIn.emit(true);
          }, step.duration);
        }
      });
    });
  }
}

