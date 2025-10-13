import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ThemeService } from '../services/theme.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  standalone: false
})
export class FormComponent implements OnInit {
  isDarkTheme$: Observable<boolean>;
  
  bioStyles = [
    { value: 'professional', viewValue: 'Profissional' },
    { value: 'funny', viewValue: 'Engraçada' },
    { value: 'mysterious', viewValue: 'Misteriosa' },
    { value: 'creative', viewValue: 'Criativa' },
    { value: 'minimalist', viewValue: 'Minimalista' }
  ];

  constructor(private themeService: ThemeService) {
    this.isDarkTheme$ = this.themeService.isDarkTheme$();
  }
  
  ngOnInit(): void {
    // Inicialização adicional se necessário
  }

  // Método placeholder para o botão de geração
  generateBio(): void {
    console.log('Botão de gerar bio clicado');
    // Funcionalidade será implementada em etapas futuras
  }
}