import { Component, OnInit } from '@angular/core';
import { query1I } from '../../../models/queries/query1';
import { Query1Service } from '../../../services/queries/query1.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-query1',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './query1.component.html',
  styleUrl: './query1.component.css'
})
export class Query1Component implements OnInit {
  query1: query1I[] = [];
  dni: number = 0;
  searched = false;

  constructor(private query1Service: Query1Service) {}

  ngOnInit(): void {

  }

  fetchPendingShipments(): void {
    if (this.dni) {
      this.query1Service.getQuery1(this.dni).subscribe(data => {
        this.query1 = data;
        this.searched = true;
      });
    } else {
      alert('Please, turnt a valid DNI.');
      this.searched = true;
    }
  }

}