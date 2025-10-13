import { Component } from '@angular/core';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  standalone: false
})
export class FormComponent {
  bioStyles = [
    { value: 'professional', viewValue: 'Profissional' },
    { value: 'funny', viewValue: 'Engraçada' },
    { value: 'mysterious', viewValue: 'Misteriosa' },
    { value: 'creative', viewValue: 'Criativa' },
    { value: 'minimalist', viewValue: 'Minimalista' }
  ];

  // Método placeholder para o botão de geração
  generateBio(): void {
    console.log('Botão de gerar bio clicado');
    // Funcionalidade será implementada em etapas futuras
  }
}