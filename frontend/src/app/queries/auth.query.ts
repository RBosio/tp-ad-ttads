import { gql } from "apollo-angular";

export const LOGIN = gql`
mutation Login($loginUserInput: LoginUserInput!){
  login(loginUserInput: $loginUserInput){
    token
  }
}
`