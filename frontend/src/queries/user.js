import gql from "graphql-tag";

const registerQuery = gql`
  mutation register($email: String!, $username: String!, $password: String!) {
    register(
      input: { email: $email, username: $username, password: $password }
    ) {
      user {
        id
      }
    }
  }
`;

const loginQuery = gql`
  mutation login($identifier: String!, $password: String!) {
    login(input: { identifier: $identifier, password: $password }) {
      jwt
    }
  }
`;

const cabinQuery = gql`
  query {
    self {
      id
      cabins {
        id
        name
        about
        bookings {
          start
          end
          user {
            name
          }
        }
        shopping_list {
          item
          added_by {
            name
            id
          }
          purchased
          purchased_by {
            id
            name
          }
          purchase_date
          id
        }
        fixed_routines {
          name
        }
      }
    }
  }
`;

const userQuery = gql`
  query {
    self {
      id
      name
      image {
        url
      }
    }
  }
`;

const updateUserInfoQuery = gql`
  mutation updateUser($id: ID!, $name: String!) {
    updateUser(input: { where: { id: $id }, data: { name: $name } }) {
      user {
        id
      }
    }
  }
`;

const updateCabinAboutQuery = gql`
  mutation updateCabin($id: ID!, $name: String!, $about: String!) {
    updateCabin(
      input: { where: { id: $id }, data: { name: $name, about: $about } }
    ) {
      cabin {
        id
      }
    }
  }
`;

const updateShoppingListQuery = gql`
  mutation updateCabin(
    $id: ID!
    $shopping_list: [editComponentShoppingListShoppingListInput!]!
  ) {
    updateCabin(
      input: { where: { id: $id }, data: { shopping_list: $shopping_list } }
    ) {
      cabin {
        shopping_list {
          item
        }
      }
    }
  }
`;

const updateFixedRoutinesQuery = gql`
  mutation updateCabin(
    $id: ID!
    $routines: [editComponentFixedRoutineFixedRoutineInput!]!
  ) {
    updateCabin(
      input: { where: { id: $id }, data: { fixed_routines: $routines } }
    ) {
      cabin {
        fixed_routines {
          name
        }
      }
    }
  }
`;

export default {
  registerQuery,
  loginQuery,
  cabinQuery,
  userQuery,
  updateUserInfoQuery,
  updateCabinAboutQuery,
  updateFixedRoutinesQuery,
  updateShoppingListQuery,
};
