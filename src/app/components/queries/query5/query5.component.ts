import { Component, OnInit } from '@angular/core';
import { query5I } from '../../../models/queries/query5';
import { Query5Service } from '../../../services/queries/query5.service';
import { CommonModule } from '@angular/common'

@Component({
  selector: 'app-query5',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './query5.component.html',
  styleUrl: './query5.component.css'
})
export class Query5Component implements OnInit {
  query5: query5I[] = [];

  constructor(private query5Service: Query5Service) {}

  ngOnInit(): void {
    this.query5Service.getQuery5().subscribe(data => {
      this.query5 = data;
    });
  }
}