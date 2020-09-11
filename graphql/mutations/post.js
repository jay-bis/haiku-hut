import {gql} from 'apollo-boost';

export const POST = gql`
  mutation post($title: String!, $content: String!, $isHaiku: Boolean!) {
    post(title: $title, content: $content, isHaiku: $isHaiku) {
      id
      author {
        name
        email
      }
    }
  }
`;