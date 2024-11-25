import { Component, OnInit } from '@angular/core';
import { query4I } from '../../../models/queries/query4';
import { Query4Service } from '../../../services/queries/query4.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-query4',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './query4.component.html',
  styleUrl: './query4.component.css'
})
export class Query4Component implements OnInit {
  query4: query4I[] = [];
  dni: number = 0;

  constructor(private query4Service: Query4Service) {}

  ngOnInit(): void {

  }

  getIncidentsByDni(): void {
    if (this.dni) {
      this.query4Service.getQuery4(this.dni).subscribe(data => {
        this.query4 = data;
      });
    } else {
      alert('Please, turnt a valid DNI.');
    }
  }

}
