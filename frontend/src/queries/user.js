import gql from 'graphql-tag';

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

const createCabinQuery = gql`
  mutation createCabin(
    $name: String!
    $about: String!
    $owner: ID!
    $users: [ID!]!
  ) {
    createCabin(
      input: {
        data: { name: $name, about: $about, owner: $owner, users: $users }
      }
    ) {
      cabin {
        name
      }
    }
  }
`;

const cabinByIdQuery = gql`
  query cabin($id: ID!) {
    cabin(id: $id) {
      id
      users {
        name
        id
      }
      not_approved_users {
        name
        id
      }
    }
  }
`;

const joinCabinQuery = gql`
  mutation updateCabin($id: ID!, $not_approved_users: [ID!]!) {
    updateCabin(
      input: {
        where: { id: $id }
        data: { not_approved_users: $not_approved_users }
      }
    ) {
      cabin {
        id
      }
    }
  }
`;

const updateApprovedUsersQuery = gql`
  mutation updateCabin($id: ID!, $users: [ID!]!, $not_approved_users: [ID!]!) {
    updateCabin(
      input: {
        where: { id: $id }
        data: { users: $users, not_approved_users: $not_approved_users }
      }
    ) {
      cabin {
        id
      }
    }
  }
`;

const userQuery = gql`
  query {
    self {
      name
      image {
        url
      }
      id
      cabins_awaiting_approval {
        name
        id
      }
      cabins {
        id
        name
        about
        owner {
          id
        }
        location
        image {
          url
        }
        users {
          name
          id
        }
        not_approved_users {
          name
          id
        }
        bookings {
          start
          end
          user {
            name
            id
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

const updateBookingsQuery = gql`
  mutation updateCabin(
    $id: ID!
    $bookings: [editComponentBookingBookingInput!]!
  ) {
    updateCabin(input: { where: { id: $id }, data: { bookings: $bookings } }) {
      cabin {
        bookings {
          start
          end
          user {
            name
            id
          }
        }
      }
    }
  }
`;

export default {
  registerQuery,
  loginQuery,
  createCabinQuery,
  cabinByIdQuery,
  joinCabinQuery,
  updateApprovedUsersQuery,
  userQuery,
  updateUserInfoQuery,
  updateCabinAboutQuery,
  updateFixedRoutinesQuery,
  updateShoppingListQuery,
  updateBookingsQuery,
};
