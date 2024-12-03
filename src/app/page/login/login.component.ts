import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-login',
  imports: [FormsModule, InputTextModule, ButtonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  @Output() loggedIn = new EventEmitter<boolean>();

  onSubmit() {
    if (this.username === 'demo' && this.password === 'Qwerty123') {
      this.loggedIn.emit(true);
    } else {
      alert('Nieprawidłowy login lub hasło');
    }
  }
}
