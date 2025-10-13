import { Component } from '@angular/core';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss'],
  standalone: false

})
export class ResultComponent {
  // Dados estáticos para exibição de placeholder
  bioResults = [
    {
      id: 1,
      text: "Designer gráfico apaixonado por transformar ideias em arte visual. Criando experiências memoráveis através de pixels e cores. ✨ #DesignIsLife"
    },
    {
      id: 2,
      text: "Explorando a interseção entre design e tecnologia. Café ☕ + criatividade = meu dia a dia. Sempre em busca do próximo desafio criativo!"
    },
    {
      id: 3,
      text: "Designer por profissão, sonhador por natureza. Transformando conceitos em realidade visual desde 2015. Amante de tipografia e experiências de usuário intuitivas."
    }
  ];

  // Placeholder para funcionalidade futura
  copyBio(bioText: string): void {
    console.log('Bio copiada:', bioText);
    // Funcionalidade será implementada em etapas futuras
  }
}