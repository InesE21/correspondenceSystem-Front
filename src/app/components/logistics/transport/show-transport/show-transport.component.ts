import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { Router } from '@angular/router';
import { TransportService } from '../../../../services/logistics/transport.service';
import { TransportI } from '../../../../models/logistic';

@Component({
  selector: 'app-show-transport', // The component selector to be used in templates.
  standalone: true, // Marks the component as standalone (does not need a specific module).
  imports: [RouterModule, TableModule, ButtonModule, CardModule], // Required modules for the component.
  templateUrl: './show-transport.component.html', // HTML template associated with the component.
  styleUrl: './show-transport.component.css' // Styles associated with the component.
})
export class ShowTransportComponent implements OnInit {
  public transports: TransportI[] = []; // An array to hold transport data.

  constructor(
    private transportService: TransportService, // Injects the TransportService to interact with transport-related APIs.
    private router: Router // Injects Router to handle navigation in the app.
  ) { }

  /**
   * Lifecycle method that runs when the component is initialized.
   * This is used to fetch transport data when the component loads.
   */
  ngOnInit(): void {
    this.showTransport(); // Calls the method to fetch transport data.
  }

  /**
   * Fetches the transport data using the TransportService.
   * The data is then assigned to the `transports` array.
   */
  showTransport() {
    this.transportService.getAllTransport() // Calls the service to get all transport data.
      .subscribe({
        next: (data) => {
          this.transports = data; // Stores the fetched transport data in the `transports` array.
          // console.log(this.transports); // Uncomment for debugging.
        }
      });
  }

  /**
   * Deletes a transport entry by its ID.
   * After successful deletion, the transport list is refreshed.
   * @param id - The ID of the transport entry to delete.
   */
  delete(id: number): void {
    this.router.navigateByUrl('logistics/transport/show'); // Navigates to the transport list view after deletion.
    this.transportService.deleteTransport(id).subscribe(
      () => {
        this.showTransport(); // Refreshes the transport data after deletion.
      },
      err => {
        console.log('error'); // Logs the error if deletion fails.
        this.router.navigateByUrl('logistics/transport/show'); // Navigates to the transport list view even if deletion fails.
      }
    );
  }
}
