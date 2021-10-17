import { Ingredients } from './ingredients';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Recette } from './recette';
import { environment } from 'src/environments/environment';

@Injectable({providedIn: 'root'})
export class RecetteService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient){}

  public getRecettes(): Observable<Recette[]> {
    return this.http.get<Recette[]>(`${this.apiServerUrl}/acceuil/api/listeRecettes`);
  }

  public addRecette(recette: Recette): Observable<Recette> {
    return this.http.post<Recette>(`${this.apiServerUrl}/acceuil/api/newrecette`, recette);
  }
  public getIngredients(): Observable<Ingredients[]> {
    return this.http.get<Ingredients[]>(`${this.apiServerUrl}/acceuil/api/newrecette`);
  }

  public updateRecette(recette: Recette): Observable<Recette> {
    return this.http.put<Recette>(`${this.apiServerUrl}/employee/update`, recette);
  }

  public deleteRecette(recetteId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/acceuil/api/delete/${recetteId}`);
  }
 
}
