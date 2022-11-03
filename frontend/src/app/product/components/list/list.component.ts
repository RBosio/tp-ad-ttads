import { Component, OnDestroy, OnInit } from '@angular/core';
import { QueryRef } from 'apollo-angular';
import { Subscription } from 'rxjs';
import { CategoryService } from 'src/app/category/services/category.service';
import { CategoryI } from 'src/app/models/category.model';
import { ProductI } from 'src/app/models/product.model';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit, OnDestroy {
  categorySubscription: Subscription
  productSubscription: Subscription

  productsQuery: QueryRef<ProductI[]>

  categories: CategoryI[]
  products: ProductI[]
  productsFiltered: ProductI[]
  BASE_URL: string

  constructor(
    private categoryService: CategoryService,
    private productService: ProductService
  ) {
    this.BASE_URL = 'http://localhost:3000/img/'
    this.productsQuery = this.productService.getProducts()
  }

  ngOnInit(): void {
    this.categorySubscription = this.categoryService.getAll().valueChanges.subscribe((result: any) => {
      this.categories = result?.data.getCategories
      this.categories = this.categories.filter(category => category.status)
    })
    this.productSubscription = this.productService.getProducts().valueChanges.subscribe((result: any) => {
      this.products = result?.data?.getProducts.filter(product => product.status)
      this.productsFiltered = this.products
    })
    this.productsQuery.refetch()
  }

  filterByCategory({ target }){
    const value = target.value
    if(value != 0) {
      this.productsFiltered = this.products.filter(p => p.category.id == value)
    }
  }

  ngOnDestroy(): void {
    this.categorySubscription.unsubscribe()
    this.productSubscription.unsubscribe()
  }
}