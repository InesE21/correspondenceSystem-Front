/**
 * DashboardComponent
 * 
 * This component serves as the main dashboard of the application, providing an overview of key data
 * such as branches, correspondences, customers, employees, logistics services, and routes. It also
 * includes an interactive image gallery for displaying photos retrieved from a service.
 */
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, forkJoin } from 'rxjs';
import { BranchService } from '../../services/branches/branch.service';
import { CorrespondenceService } from '../../services/shipments/correspondence.service';
import { CustomerService } from '../../services/persons/customer.service';
import { EmployeeService } from '../../services/persons/employee.service';
import { ServicelService } from '../../services/logistics/servicel.service';
import { RouteService } from '../../services/logistics/route.service';
import { PhotoService } from '../../services/photo.service';
import { BranchI } from '../../models/branch';
import { CustomerI, EmployeeI } from '../../models/person';
import { ServicelI, RouteI } from '../../models/logistic';
import { CorrespondenceI } from '../../models/shipment';

@Component({
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit, OnDestroy {
  // Arrays to hold data fetched from services
  branches: BranchI[] = [];
  correspondences: CorrespondenceI[] = [];
  customers: CustomerI[] = [];
  employees: EmployeeI[] = [];
  services: ServicelI[] = [];
  routes: RouteI[] = [];
  
  // Variables for gallery functionality
  images: string[] = []; // List of image URLs
  currentImage: string = ''; // The currently selected image in the gallery
  galleryHtml: string = ''; // HTML content for rendering the image gallery

  private subscriptions = new Subscription(); // Manages all active subscriptions to avoid memory leaks

  /**
   * Constructor: Injects necessary services for data fetching and functionality.
   *  branchService - Service for fetching branch data
   *  correspondenceService - Service for fetching correspondence data
   *  customerService - Service for fetching customer data
   *  employeeService - Service for fetching employee data
   *  serviceService - Service for fetching logistics services
   *  routeService - Service for fetching route data
   *  photoService - Service for fetching photo gallery images
   */
  constructor(
    private branchService: BranchService,
    private correspondenceService: CorrespondenceService,
    private customerService: CustomerService,
    private employeeService: EmployeeService,
    private serviceService: ServicelService,
    private routeService: RouteService,
    private photoService: PhotoService
  ) {}

  /**
   * Lifecycle hook: Invoked after the component is initialized.
   * Initiates loading of data and images for the dashboard.
   */
  ngOnInit() {
    this.loadData(); // Load initial data from services
    this.loadImages(); // Fetch and display images for the gallery
  }

  /**
   * Fetches data from multiple services concurrently and populates respective arrays.
   * Uses `forkJoin` to handle multiple observables and manage asynchronous calls.
   */
  loadData() {
    this.subscriptions.add(
      forkJoin({
        branches: this.branchService.getAllBranch(),
        correspondences: this.correspondenceService.getAllCorrespondence(),
        customers: this.customerService.getAllCustomer(),
        employees: this.employeeService.getAllEmployee(),
        services: this.serviceService.getAllServicel(),
        routes: this.routeService.getAllRoute(),
      }).subscribe({
        next: (results) => {
          // Assign data to respective properties
          this.branches = results.branches;
          this.correspondences = results.correspondences;
          this.customers = results.customers;
          this.employees = results.employees;
          this.services = results.services;
          this.routes = results.routes;
        },
        error: (err) => console.error('Error loading data:', err), // Log errors
      })
    );
  }

  /**
   * Updates the currently selected image in the gallery.
   * image - The URL of the image to select
   */
  selectImage(image: string) {
    this.currentImage = image;
  }

  /**
   * Moves to the previous image in the gallery.
   * Wraps around to the last image if the first image is currently selected.
   */
  prevImage() {
    const currentIndex = this.images.indexOf(this.currentImage);
    const prevIndex = (currentIndex - 1 + this.images.length) % this.images.length;
    this.currentImage = this.images[prevIndex];
  }

  /**
   * Moves to the next image in the gallery.
   * Wraps around to the first image if the last image is currently selected.
   */
  nextImage() {
    const currentIndex = this.images.indexOf(this.currentImage);
    const nextIndex = (currentIndex + 1) % this.images.length;
    this.currentImage = this.images[nextIndex];
  }

  /**
   * Fetches images for the gallery from the PhotoService.
   * Generates HTML content dynamically for rendering the gallery.
   */
  loadImages() {
    this.photoService
      .getImages()
      .then((images: any[]) => {
        // Construct HTML content for the gallery
        this.galleryHtml = images
          .map(
            (image, index) => `
            <div class="gallery-item">
              <img src="${image.url}" alt="Image ${index + 1}" />
              <h4>Title ${index + 1}</h4>
            </div>
          `
          )
          .join('');
      })
      .catch((error) => {
        console.error('Error loading images:', error); // Log errors during image fetching
      });
  }

  /**
   * Lifecycle hook: Invoked just before the component is destroyed.
   * Cleans up all active subscriptions to avoid memory leaks.
   */
  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
