import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { ReactiveFormsModule, FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { CustomerI } from '../../../../models/person';
import { ServicelI } from '../../../../models/logistic';
import { CustomerService } from '../../../../services/persons/customer.service';
import { ServicelService } from '../../../../services/logistics/servicel.service';
import { CorrespondenceService } from '../../../../services/shipments/correspondence.service';
import { CorrespondenceI } from '../../../../models/shipment';

@Component({
  selector: 'app-create-correspondence',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ToastModule, CardModule, ButtonModule],
  templateUrl: './create-correspondence.component.html',
  styleUrl: './create-correspondence.component.css'
})
export class CreateCorrespondenceComponent implements OnInit{
  public form: FormGroup;
  customers: CustomerI[] = [];
  services: ServicelI[] = []; 
  
  correspondenceService = inject(CorrespondenceService);
  customerService = inject(CustomerService);
  serviceService = inject(ServicelService);

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
  ) 
  { 
    this.form=this.formBuilder.group({
    correspondenceType: ['', [Validators.required]],
    weight: ['', [Validators.required]],
    dimensions: ['', [Validators.required]],
    shipmentDate: ['', [Validators.required]],
    deliveryDate: ['', [Validators.required]],
    sender: ['', [Validators.required]],
    receiver: ['', [Validators.required]],
    service: ['', [Validators.required]],
  });
  }

  ngOnInit(): void {
    this.loadCustomers();
    this.loadServices();
  }

  loadCustomers(): void {
    this.customerService.getAllCustomer().subscribe(
      (customers: CustomerI[]) => {
        this.customers = customers; // Asigna las sucursales obtenidas
      },
      err => {
        console.error('Error loading customers', err);
      }
    );
  }

  loadServices(): void {
    this.serviceService.getAllServicel().subscribe(
      (services: ServicelI[]) => {
        this.services = services;
      },
      err => {
        console.error('Error loading branches', err);
      }
    )
  }

  onSubmit(): void {
    const formValue: CorrespondenceI = this.form.value;
    console.log(formValue);
    this.correspondenceService.createCorrespondence(formValue).subscribe(
      () => {
        console.log(formValue)
        this.router.navigateByUrl('shipments/correspondence/show');
      },
      err => {

        console.log(err);
        console.log('It was not created correctly.');
      }
    );
  }

  cancel() {
    this.router.navigateByUrl('/shipments/correspondence/show');
  }

  get correspondenceType() { return this.form.get('correspondenceType'); }
  get weight() { return this.form.get('weight'); }
  get dimensions() { return this.form.get('dimensions'); }
  get shipmentDate() { return this.form.get('shipmentDate'); }
  get deliveryDate() { return this.form.get('deliveryDate'); }
  get sender() { return this.form.get('sender'); }
  get receiver() { return this.form.get('receiver'); }
  get service() { return this.form.get('service'); }
  
}
