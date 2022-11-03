import { gql } from "apollo-angular";

export const GET_CATEGORIES = gql`
  {
    getCategories {
      id
      name
      status
    }
  }
`