import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { ReactiveFormsModule, FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { IncidentService } from '../../../../services/shipments/incident.service';
import { CorrespondenceService } from '../../../../services/shipments/correspondence.service';
import { CorrespondenceI, IncidentI } from '../../../../models/shipment';

@Component({
  selector: 'app-create-incident',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ToastModule, CardModule, ButtonModule],
  templateUrl: './create-incident.component.html',
  styleUrl: './create-incident.component.css'
})
export class CreateIncidentComponent implements OnInit{
  public form: FormGroup;
  correspondences: CorrespondenceI[] = [];
  
  incidentService = inject(IncidentService);
  correspondenceService = inject(CorrespondenceService);
  
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
  ) 
  { 
    this.form=this.formBuilder.group({
    description: ['', [Validators.required]],
    incidentDate: ['', [Validators.required]],
    resolutionStatus: ['', [Validators.required]],
    correspondence: ['', [Validators.required]],
  });
  }

  ngOnInit(): void {
    this.loadCorrespondences();
  }

  loadCorrespondences(): void {
    this.correspondenceService.getAllCorrespondence().subscribe(
      (correspondences: CorrespondenceI[]) => {
        this.correspondences = correspondences; // Asigna las sucursales obtenidas
      },
      err => {
        console.error('Error loading correspondences', err);
      }
    );
  }

  onSubmit(): void {
    const formValue: IncidentI = this.form.value;
    console.log(formValue);
    this.incidentService.createIncident(formValue).subscribe(
      () => {
        console.log(formValue)
        this.router.navigateByUrl('shipments/incident/show');
      },
      err => {

        console.log(err);
        console.log('It was not created correctly.');
      }
    );
  }

  cancel() {
    this.router.navigateByUrl('/shipments/incident/show');
  }

  get description() { return this.form.get('description'); }
  get incidentDate() { return this.form.get('incidentDate'); }
  get resolutionStatus() { return this.form.get('resolutionStatus'); }
  get correspondence() { return this.form.get('correspondence'); }
}
