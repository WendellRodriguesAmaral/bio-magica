import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrls: ['./app.scss'],
  standalone: false

})
export class AppComponent {
  title = 'BioMágica';

  year = new Date().getFullYear();
}