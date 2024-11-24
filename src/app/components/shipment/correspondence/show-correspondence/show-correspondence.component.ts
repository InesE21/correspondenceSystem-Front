import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { CorrespondenceI } from '../../../../models/shipment';
import { CorrespondenceService } from '../../../../services/shipments/correspondence.service';

@Component({
  selector: 'app-show-correspondence',
  standalone: true,
  imports: [RouterModule, TableModule, ButtonModule, CardModule],
  templateUrl: './show-correspondence.component.html',
  styleUrl: './show-correspondence.component.css'
})
export class ShowCorrespondenceComponent implements OnInit{
  public correspondences:CorrespondenceI[] = []

  constructor(
    private correspondenceService: CorrespondenceService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.showCorrespondences()
  }

  showCorrespondences() {
    this.correspondenceService.getAllCorrespondence()
      .subscribe({
        next: (data) => {
          this.correspondences = data
        }
      })
  }

  delete(id: number): void{
    this.router.navigateByUrl('/shipments/correspondence/');
    this.correspondenceService.deleteCorrespondence(id).subscribe(
      () => {
        this.showCorrespondences();
      },
      err => {
        console.log('error')
        this.router.navigateByUrl('/shipments/correspondence/');

      }
    );
  }

}