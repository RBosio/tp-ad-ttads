import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProductI } from 'src/app/models/product.model';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit, OnDestroy {
  id: number
  BASE_URL: string
  product: ProductI
  productSubscription: Subscription
  routeSubscription: Subscription

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
    ) {
      this.BASE_URL = 'http://localhost:3000/img/'
    }

  ngOnInit(): void {
    this.routeSubscription = this.route.params.subscribe(params => {
      this.id = Number(params['id'])
      this.productSubscription = this.productService.getProduct(this.id).valueChanges.subscribe((result: any) => {
        this.product = result?.data?.getProduct
      })
    })
  }

  ngOnDestroy(): void {
    this.routeSubscription.unsubscribe()
    this.productSubscription.unsubscribe()
  }
}
