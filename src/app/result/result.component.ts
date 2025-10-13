import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ThemeService } from '../services/theme.service';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss'],
  standalone: false
})
export class ResultComponent implements OnInit {
  isDarkTheme$: Observable<boolean>;
  
  // Dados de exemplo para demonstração
  bioResults = [
    { text: 'Designer gráfico apaixonado por cores e formas. Transformando ideias em arte visual desde 2015. ✏️ #DesignLife #Criatividade' },
    { text: 'Explorando o mundo através das lentes da minha câmera. Fotógrafo amador e contador de histórias visuais. 📸 #FotografiaDeViagem' },
    { text: 'Desenvolvedor web, entusiasta de UX/UI e amante de café. Construindo experiências digitais que fazem a diferença. 💻 #CodeLife' }
  ];

  constructor(
    private themeService: ThemeService,
    private snackBar: MatSnackBar
  ) {
    this.isDarkTheme$ = this.themeService.isDarkTheme$();
  }

  ngOnInit(): void {
    // Inicialização adicional se necessário
  }

  copyBio(text: string): void {
    navigator.clipboard.writeText(text).then(() => {
      this.snackBar.open('Bio copiada para a área de transferência!', 'Fechar', {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom'
      });
    }, (err) => {
      console.error('Erro ao copiar texto: ', err);
      this.snackBar.open('Não foi possível copiar a bio', 'Fechar', {
        duration: 3000
      });
    });
  }
}