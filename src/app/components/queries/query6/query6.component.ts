import { Component, OnInit } from '@angular/core';
import { query6I } from '../../../models/queries/query6';
import { Query6Service } from '../../../services/queries/query6.service';
import { CommonModule } from '@angular/common'

@Component({
  selector: 'app-query6',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './query6.component.html',
  styleUrl: './query6.component.css'
})
export class Query6Component implements OnInit {
  query6: query6I[] = [];

  constructor(private query6Service: Query6Service) {}

  ngOnInit(): void {
    this.query6Service.getQuery6().subscribe(data => {
      this.query6 = data;
    });
  }
}