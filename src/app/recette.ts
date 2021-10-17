import {Ingredients} from './ingredients';
export interface Recette {
  id: number;
  titre: string;
  sousTitre : string;
  ingredients: Ingredients;
  
}
