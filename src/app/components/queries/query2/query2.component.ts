import { Component, OnInit } from '@angular/core';
import { query2I } from '../../../models/queries/query2';
import { Query2Service } from '../../../services/queries/query2.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-query2',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './query2.component.html',
  styleUrl: './query2.component.css'
})
export class Query2Component implements OnInit {
  query2: query2I[] = [];  // Usamos la interface aquí

  constructor(private query2Service: Query2Service) {}

  ngOnInit(): void {
    this.query2Service.getQuery2().subscribe(data => {
      this.query2 = data;
    });
  }
}