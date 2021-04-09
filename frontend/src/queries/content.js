import gql from "graphql-tag";

const frontPageContentQuery = gql`
  query {
    frontPage {
      main_header
      secondary_header
      main_button
      background {
        url
      }
    }
  }
`;

const frontPageAboutQuery = gql`
  query {
    frontPageAbout {
      header
      secondary_header
      selling_points {
        header
        paragraph
        icon
      }
    }
  }
`;

const loginPageContentQuery = gql`
  query {
    login {
      background {
        url
      }
    }
  }
`;

export default {
  frontPageContentQuery,
  frontPageAboutQuery,
  loginPageContentQuery
};
