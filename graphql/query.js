// npm install graphql-tag  this is used to make query and mutaion using graphql tag. and nuxtjs/apollo.
import gql from "graphql-tag";

export const GetCourses=gql`

query{
    courses{
    level
      price
      title
      duration
      summary
      sections{
        is_featured
      }
    }
  }
`