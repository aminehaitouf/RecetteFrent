import { Ingredients } from './ingredients';
import { Component, OnInit } from '@angular/core';
import { Recette } from './recette';
import { RecetteService } from './recette.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public recettes: Recette[];
  public ingredients: Ingredients[];
  public editRecette: Recette;
  public deleteRecette: Recette;

  // private form:HTMLElement ;
  constructor(private recetteService: RecetteService){}

  ngOnInit() {
    this.getRecettes();
   this.getIngredients();

  }

  public getRecettes(): void {
    this.recetteService.getRecettes().subscribe(
      (response: Recette[]) => {
        this.recettes = response;
        console.log(this.recettes);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
  public getIngredients(): void {
    this.recetteService.getIngredients().subscribe(
      (response: Ingredients[]) => {
        this.ingredients = response;
        console.log("ingredients:",this.ingredients);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onAddRecette(addForm: NgForm): void {
    document.getElementById('add-employee-form').click();
    this.recetteService.addRecette(addForm.value).subscribe(
      (response) => {
        console.log("response:",response);
        this.getRecettes();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
    // this.employeeService.addEmployee(addForm.value).subscribe(
    //   data => {
    //     console.log("addForm:",addForm.value)
    //     console.log("Vous etes bien enregistrer");
    //   },
    //   error => {console.log("exception occured");
    //   console.log("information incorrect Entrer les informations");
    // }
    // )
  }

  public onUpdateEmloyee(recette: Recette): void {
    this.recetteService.updateRecette(recette).subscribe(
      (response: Recette) => {
        console.log(response);
        this.getRecettes();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onDeleteRecette(recetteId: number): void {
    this.recetteService.deleteRecette(recetteId).subscribe(
      (response: void) => {
        console.log(response);
        this.getRecettes();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  // public searchrecettes(key: string): void {
  //   console.log(key);
  //   const results: Recette[] = [];
  //   for (const recette of this.recettes) {
  //     if (recette.titre.toLowerCase().indexOf(key.toLowerCase()) !== -1
  //     // || employee.email.toLowerCase().indexOf(key.toLowerCase()) !== -1
  //     // || employee.phone.toLowerCase().indexOf(key.toLowerCase()) !== -1
  //     // || employee.jobTitle.toLowerCase().indexOf(key.toLowerCase()) !== -1
  //     )
  //      {
  //       results.push(recette);
  //     }
  //   }
  //   this.recettes = results;
  //   if (results.length === 0 || !key) {
  //     this.getRecettes();
  //   }
  // }

  public onOpenModal(recette: Recette, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-target', '#addEmployeeModal');
    }
    if (mode === 'edit') {
      this.editRecette = recette;
      button.setAttribute('data-target', '#updateEmployeeModal');
    }
    if (mode === 'delete') {
      this.deleteRecette = recette;
      button.setAttribute('data-target', '#deleteEmployeeModal');
    }
    container.appendChild(button);
    button.click();
  }



}
