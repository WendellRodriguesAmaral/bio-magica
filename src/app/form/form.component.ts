import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ThemeService } from '../services/theme.service';
import { BioService } from '../services/bio-service.service';

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

  constructor(private themeService: ThemeService, private bioService: BioService) {
    this.isDarkTheme$ = this.themeService.isDarkTheme$();
  }
  
  ngOnInit(): void {
    // Inicialização adicional se necessário
  }

  // Método placeholder para o botão de geração
  generateBio(): void {
    console.log('Botão de gerar bio clicado');
    this.bioService.generateBio('Wendell', 'Desenvolvedor de Software', 'profissional e conciso')
      .then(response => {
        console.log('Bio gerada:', response); //alterar
      });
  }
}