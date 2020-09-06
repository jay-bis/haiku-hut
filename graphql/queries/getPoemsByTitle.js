import {gql} from 'apollo-boost';

export const GET_POEMS_BY_TITLE = gql`
  query findPoemByTitle($title: String!) {
    findPoemByTitle(title: $title) {
      id
      title
      content
      createdAt
      author {
        name
      }
    }
  }
`;