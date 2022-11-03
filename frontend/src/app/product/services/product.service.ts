import { Injectable } from '@angular/core';
import { ApolloQueryResult } from '@apollo/client/core';
import { Apollo, MutationResult, QueryRef } from 'apollo-angular';
import { Observable } from 'rxjs';
import { ProductI, ProductModel1 } from 'src/app/models/product.model';
import { GET_PRODUCT, GET_PRODUCTS, EDIT_PRODUCT } from 'src/app/queries/product.query';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private apollo: Apollo) { }

  getProducts(): QueryRef<ProductI[]> {
    return this.apollo.watchQuery<ProductI[]>({
      query: GET_PRODUCTS
    })
  }
  
  getProduct(id: number): QueryRef<ProductI> {
    return this.apollo.watchQuery<ProductI>({
      query: GET_PRODUCT,
      variables: {
        id
      }
    })
  }
  
  editProduct(product: ProductModel1): Observable<MutationResult<string>> {
    return this.apollo.mutate<string>({
      mutation: EDIT_PRODUCT,
      variables: {
        values: product
      }
    })
  }
}
