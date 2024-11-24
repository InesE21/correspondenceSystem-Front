import { Injectable } from '@angular/core';


@Injectable({
    providedIn: 'root', 
}
)

export class PhotoService {
  getImages(): Promise<any[]> {
    return fetch('/photos.json')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to load photos.json');
        }
        return response.json();
      })
      .then((data) => data.data); // Asegúrate de que los datos tienen formato válido
  }
}

