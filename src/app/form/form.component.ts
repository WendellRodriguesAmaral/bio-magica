import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { ThemeService } from '../services/theme.service';
import { BioService } from '../services/bio-service.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  standalone: false,
})
export class FormComponent implements OnInit {
  isDarkTheme$: Observable<boolean>;
  bioForm!: FormGroup;
  isLoading = false;
  @Output() biosGenerated = new EventEmitter<string[]>();

  bioStyles = [
    { value: 'professional', viewValue: 'Profissional' },
    { value: 'funny', viewValue: 'Engraçada' },
    { value: 'mysterious', viewValue: 'Misteriosa' },
    { value: 'creative', viewValue: 'Criativa' },
    { value: 'minimalist', viewValue: 'Minimalista' },
  ];

  bioLengths = [
    { value: 'short', viewValue: 'Curta' },
    { value: 'medium', viewValue: 'Média' },
    { value: 'long', viewValue: 'Longa' },
  ];

  bioOptions = [
    { value: 1, viewValue: '1 opção' },
    { value: 2, viewValue: '2 opções' },
    { value: 3, viewValue: '3 opções' },
  ];

  constructor(
    private themeService: ThemeService,
    private bioService: BioService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) {
    this.isDarkTheme$ = this.themeService.isDarkTheme$();
  }

  ngOnInit(): void {
    this.bioForm = this.fb.group({
      nome: ['', Validators.required],
      profissao: ['', Validators.required],
      estilo: ['professional', Validators.required],
      comprimento: ['short', Validators.required],
      opcoes: [1, [Validators.required, Validators.min(1), Validators.max(3)]],
    });
  }

  // Getters para facilitar acesso aos controles no template
  get nome() {
    return this.bioForm.get('nome');
  }
  get profissao() {
    return this.bioForm.get('profissao');
  }
  get estilo() {
    return this.bioForm.get('estilo');
  }
  get comprimento() {
    return this.bioForm.get('comprimento');
  }
  get opcoes() {
    return this.bioForm.get('opcoes');
  }

  generateBio(): void {
    if (this.bioForm.invalid) {
      this.bioForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;

    this.bioService
      .generateBio(
        this.nome?.value,
        this.profissao?.value,
        this.estilo?.value,
        this.comprimento?.value,
        this.opcoes?.value || 1
      )
      .pipe(
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe({
        next: (response) => {
          if (response && response.bios) {
            this.biosGenerated.emit(
              response.bios.message.content[0].text
                .split('\n')
                .filter((bio: string) => bio.trim() !== '')
            );

            // Scroll para os resultados
            setTimeout(() => {
              document.getElementById('results')?.scrollIntoView({ behavior: 'smooth' });
            }, 100);

            this.snackBar.open('Bios geradas com sucesso.', 'Fechar', {
              duration: 50000000000000,
              panelClass: ['blue-snackbar']
            });
          } else {
            this.snackBar.open('Não foi possível gerar bios. Tente novamente.', 'Fechar', {
              duration: 5000,
            });
          }
        },
        error: (error) => {
          this.snackBar.open(
            'Erro ao se comunicar com a IA. Tente novamente mais tarde.',
            'Fechar',
            {
              duration: 5000,
            }
          );
          console.error('Erro ao gerar bio:', error);
        },
      });
  }
}
