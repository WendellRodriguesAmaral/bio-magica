import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ThemeService } from './services/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrls: ['./app.scss'],
  standalone: false
})
export class AppComponent implements OnInit {
 title = 'BioMágica';
  year = new Date().getFullYear();
  isDarkTheme$: Observable<boolean>;
  generatedBios: string[] = [];
  
  constructor(private themeService: ThemeService) {
    this.isDarkTheme$ = this.themeService.isDarkTheme$();
  }
  
  ngOnInit() {
    // Inicialização adicional se necessário
  }
  
  toggleTheme() {
    this.themeService.toggleTheme();
  }

  onBiosGenerated(bios: any): void {
    this.generatedBios = bios as any;
    
    // Scroll para a seção de resultados
    setTimeout(() => {
      document.getElementById('results')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  }
}