import { CategoryI, CategoryModel } from "./category.model"

export interface ProductI{
  id: number
  name: string
  price: number
  stock: number
  created_at?: Date
  category?: CategoryI
  image?: string
  status?: boolean
}

export class ProductModel{
  id: number
  name: string
  price: number
  stock: number
  created_at?: Date
  category?: CategoryI
  image?: string
  status?: boolean
}

export class ProductModel1{
  id?: number
  name: string
  price: number
  stock: number
  created_at?: Date
  category: number
  image?: string
  status?: boolean
}