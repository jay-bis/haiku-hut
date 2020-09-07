import {gql} from 'apollo-boost';

export const GET_ALL_POEMS = gql`
  query poems {
    feed {
      id
      title
      content
      createdAt
      isHaiku
      author {
        name
      }
    }
  }
`;