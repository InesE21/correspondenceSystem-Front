import { Component, OnInit } from '@angular/core';
import { BranchI } from '../../../models/branch';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { BranchService } from '../../../services/branches/branch.service'

/**
 * The `ShowBranchComponent` is responsible for managing and displaying branch records.
 * It enables users to view, add, edit, and delete branches while interacting with the backend service.
 */

@Component({
  selector: 'app-show-branch', // The selector used to embed this component in HTML.
  standalone: true, // Indicates that this component is independent and imports its dependencies locally.
  imports: [RouterModule, TableModule, ButtonModule, CardModule], // PrimeNG and Angular modules for UI and routing.
  templateUrl: './show-branch.component.html',
  styleUrl: './show-branch.component.css'
})
export class ShowBranchComponent implements OnInit{
  /**
 * Property to store the list of branches fetched from the backend.
 * The data conforms to the `BranchI` interface.
 */
  public branches:BranchI[] = []
  /**
   * Constructor for the component.
   * Injects the required services for data operations and navigation.
   *
   *  branchService - The service responsible for managing API requests related to branches.
   *  router - Angular's Router used for navigation between different views.
   */
  constructor(
    private branchService: BranchService,
    private router: Router
  ) { }

  /**
   * Lifecycle hook that is triggered after the component is initialized.
   * Calls the method to fetch and display the list of branches.
  */
  ngOnInit(): void {
    this.showBranches()
  }
  /**
 * Fetches the list of all branches from the backend and updates the `branches` array.
 * This method is called during initialization and after performing any operation 
 * that might modify the branch list (e.g., deleting a branch).
   */
  showBranches() {
    this.branchService.getAllBranch()
      .subscribe({
        next: (data) => {
          this.branches = data
          // console.log(this.clientes)
        }
      })
  }

/**
   * Deletes a branch from the backend by its unique ID.
   * After deletion, the branch list is refreshed to reflect the changes.
   *
   * @param id - The unique identifier of the branch to be deleted.
   */
  delete(id: number): void{
    this.router.navigateByUrl('/branches');
    this.branchService.deleteBranch(id).subscribe(
      () => {
        this.showBranches();
      },
      err => {
        console.error('Error deleting branch:', err); // Logs errors encountered during deletion.
          this.router.navigateByUrl('/branches'); // Ensures the user remains on the branches page.

      }
    );
  }

}
