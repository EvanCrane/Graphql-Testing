import { gql } from 'apollo-boost';

export class QuerySchemas {
  GET_USERS = gql`
  {
    getUsers {
      id,
      name,
      job_title,
      email, 
      state,
      location
    }
  }
`;

  VIEW_USER_BY_ID = gql`
  query($id: Int){
    getUserInfo(id: $id) {
      id,
      name,
      job_title,
      email,
      state,
      location
    }
  }
`;

  VIEW_USERS_BY_STATE = gql`
  query($state: Boolean) {
    getUsersByState(state: $state) {
      name,
      email,
    }
  }
`;
}

export class MutationSchemas {
  ADD_USER = gql`
  mutation($name: String, $email: String, $job_title: String, $state: Boolean, $location: String) {
    createUser (name: $name, email: $email, job_title: $job_title, state: $state, location: $location)
  }
`;

  EDIT_USER = gql`
  mutation($id: Int, $name: String, $email: String, $job_title: String) {
    updateUserInfo (id: $id, name: $name, email: $email, job_title: $job_title)
  }
`;

  DELETE_USER = gql`
  mutation($id: Int) {
    deleteUser(id: $id)
  }
`

  UPDATE_USER_STATE = gql`
  mutation($state: Boolean, $id: Int) {
    updateUserState(state: $state, id: $id)
  }
`;
}
