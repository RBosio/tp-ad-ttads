import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CategoryService } from 'src/app/category/services/category.service';
import { CategoryI } from 'src/app/models/category.model';
import { ProductI, ProductModel1 } from 'src/app/models/product.model';
import { ProductService } from '../../services/product.service';

import { environment } from '../../../../environments/environment'

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit, OnDestroy {
  categorySubscription: Subscription
  productSubscription: Subscription
  routeSubscription: Subscription

  categories: CategoryI[]
  id: number
  BASE_URL: string
  product: ProductI

  constructor(
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService
    ) {
      this.BASE_URL = environment.BASE_URL
    }

    ngOnInit(): void {
      this.categorySubscription = this.categoryService.getAll().valueChanges.subscribe((result: any) => {
      this.categories = result?.data?.getCategories
      this.categories = this.categories.filter(category => category.status)
    })
    this.routeSubscription = this.route.params.subscribe(params => {
      this.id = Number(params['id'])
      this.productSubscription = this.productService.getProduct(this.id).valueChanges.subscribe((result: any) => {
        this.product = result?.data.getProduct
      })
    })
  }

  editProduct($event: any, name: HTMLInputElement, price: HTMLInputElement, stock: HTMLInputElement, category: HTMLSelectElement){
    $event.preventDefault()
    if(name.value != "" && price.value != "" && stock.value != "" && category.value != "0"){
      const id = this.product.id
      const product: ProductModel1 = {
        id: Number(id),
        name: name.value,
        price: Number(price.value),
        stock: Number(stock.value),
        category: Number(category.value)
      }
      
      this.productService.editProduct(product).subscribe(() => {
        this.router.navigateByUrl('product')
      })
    }
  }

  ngOnDestroy(): void {
    this.routeSubscription.unsubscribe()
    this.categorySubscription.unsubscribe()
    this.productSubscription.unsubscribe()
  }
}
