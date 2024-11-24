import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';  // Importing RouterModule for routing functionality
import { TableModule } from 'primeng/table';   // Importing PrimeNG Table module for displaying customers in a table
import { ButtonModule } from 'primeng/button';  // Importing PrimeNG Button module for using buttons
import { CardModule } from 'primeng/card';      // Importing PrimeNG Card module to display content inside cards
import { CustomerI } from '../../../../models/person';  // Importing the Customer interface to define customer data structure
import { CustomerService } from '../../../../services/persons/customer.service';  // Importing the service to manage customer data

@Component({
  selector: 'app-show-customer',  // Component selector
  standalone: true,  // This component is standalone and doesn't require a module
  imports: [RouterModule, TableModule, ButtonModule, CardModule],  // Importing necessary modules
  templateUrl: './show-customer.component.html',  // HTML template for the component
  styleUrl: './show-customer.component.css'  // CSS for the component
})
export class ShowCustomerComponent implements OnInit{
  public customers: CustomerI[] = [];  // Defining the customers array to store customer data

  constructor(
    private customerService: CustomerService,  // Injecting the customer service to interact with the API
    private router: Router  // Injecting the Router for navigation functionality
  ) { }

  ngOnInit(): void {
    this.showCustomers();  // On component initialization, fetch customers data
  }

  showCustomers() {
    // Fetching all customers using the customerService
    this.customerService.getAllCustomer()
      .subscribe({
        next: (data) => {
          this.customers = data;  // Storing fetched customers data into the customers array
        }
      });
  }

  delete(id: number): void {
    // Navigating to the customer listing page after deletion
    this.router.navigateByUrl('/persons/customer/');
    
    // Calling the customerService to delete the customer by id
    this.customerService.deleteCustomer(id).subscribe(
      () => {
        // After successful deletion, reload the customer list
        this.showCustomers();
      },
      err => {
        // If an error occurs, log the error and navigate to customer listing page
        console.log('error');
        this.router.navigateByUrl('/persons/customer/');
      }
    );
  }
}
