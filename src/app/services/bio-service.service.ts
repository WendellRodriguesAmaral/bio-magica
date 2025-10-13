import { Injectable } from '@angular/core';
import { CohereClientV2 } from 'cohere-ai';
import { V2ChatResponse } from 'cohere-ai/api';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BioService {
  private cohereClient: CohereClientV2;

  constructor() {
    this.cohereClient = new CohereClientV2({
      token: '1aJ6W3GX215W17tHQdcIYw2nsiGmEtSM4bRiqwQH'
    });
  }

  generateBio(name: string, profession: string, style: string): Promise<V2ChatResponse> {
    return this.cohereClient.chat({
      model: 'command-a-03-2025',
      messages: [
        {
          role: 'user',
          content: `Crie uma bio para ${name}, que é ${profession}, no estilo ${style}.`
        }
      ]
    }).then(response => response)  ;
  }  
}
