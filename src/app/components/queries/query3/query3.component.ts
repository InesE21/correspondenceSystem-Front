import { Component, OnInit } from '@angular/core';
import { query3I } from '../../../models/queries/query3';
import { Query3Service } from '../../../services/queries/query3.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-query3',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './query3.component.html',
  styleUrl: './query3.component.css'
})
export class Query3Component implements OnInit {
  query3: query3I[] = [];

  constructor(private query3Service: Query3Service) {}

  ngOnInit(): void {
    this.query3Service.getQuery3().subscribe(data => {
      this.query3 = data;
    });
  }
}