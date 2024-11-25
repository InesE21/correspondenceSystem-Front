import { Component, OnInit } from '@angular/core';
import { query7I } from '../../../models/queries/query7';
import { Query7Service } from '../../../services/queries/query7.service';
import { CommonModule } from '@angular/common'

@Component({
  selector: 'app-query7',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './query7.component.html',
  styleUrl: './query7.component.css'
})
export class Query7Component implements OnInit {
  query7: query7I[] = [];

  constructor(private query7Service: Query7Service) {}

  ngOnInit(): void {
    this.query7Service.getQuery7().subscribe(data => {
      this.query7 = data;
    });
  }
}
