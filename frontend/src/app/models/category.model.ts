export interface CategoryI{
  id: number
  name: string
  created_at?: Date
  status?: boolean
}

export class CategoryModel{
  id: number
  name: string
  created_at?: Date
  status?: boolean
}