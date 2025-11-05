import { Injectable } from '@angular/core';
import { CohereClientV2 } from 'cohere-ai';
import { V2ChatResponse } from 'cohere-ai/api';
import { Observable, from, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { BioResponse } from '../models/response.modee';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class BioService {
  private cohereClient: CohereClientV2;

  constructor() {
    this.cohereClient = new CohereClientV2({
      token: environment.TOKEN_COHERE
    });
  }

  generateBio(name: string, profession: string, style: string, length: string, options: number): Observable<{bios:BioResponse}> {
    return from(this.cohereClient.chat({
      model: 'command-a-03-2025',
      messages: [
        {
          role: 'user',
          content: `Crie ${options} bio(s) em português para redes sociais para o(a) ${name}, que é ${profession}, no estilo ${style} e com comprimento ${length}.
          Retorne apenas a(s) ${options} bio(s) em formato de lista, sem explicações adicionais.
          Na(s) bio(s) gerada(s), inclua emojis relevantes ao estilo escolhido.
          Não deve conter o nome da pessoa na(s) bio(s) gerada(s).
          Ao final, adicione hashtags relevantes e também a hashtag #BioMagica em cada bio gerada.
          Não precisa vir o numero de cada bio, apenas a lista.`
        }
      ]
    })).pipe(
      map(response => {
        return { bios: response as BioResponse };
      }),
      catchError(error => {
        console.error('Erro ao gerar bio:', error);
        return throwError(() => new Error('Erro ao se comunicar com a IA. Tente novamente mais tarde.'));
      })
    );
  }
}