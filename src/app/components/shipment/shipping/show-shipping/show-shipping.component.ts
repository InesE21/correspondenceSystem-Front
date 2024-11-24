import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ShippingI } from '../../../../models/shipment';
import { ShippingService } from '../../../../services/shipments/shipping.service';

@Component({
  selector: 'app-show-shipping',
  standalone: true,
  imports: [RouterModule, TableModule, ButtonModule, CardModule],
  templateUrl: './show-shipping.component.html',
  styleUrl: './show-shipping.component.css'
})
export class ShowShippingComponent implements OnInit{
  public shippings:ShippingI[] = []

  constructor(
    private shippingService: ShippingService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.showShippings()
  }

  showShippings() {
    this.shippingService.getAllShipping()
      .subscribe({
        next: (data) => {
          this.shippings = data
        }
      })
  }

  delete(id: number): void{
    this.router.navigateByUrl('/shipments/shipping/');
    this.shippingService.deleteShipping(id).subscribe(
      () => {
        this.showShippings();
      },
      err => {
        console.log('error')
        this.router.navigateByUrl('/shipments/shipping/');

      }
    );
  }

}