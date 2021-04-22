import './App.css';
import React, { useEffect, useState } from 'react'

import gql from 'graphql-tag';
import { useQuery, useMutation } from '@apollo/react-hooks';

const USERS_QUERY = gql`
  query {
    hello
    queryUsers {
      firstName
      lastName
      email
    }
  }
`

const ADD_MUTATION = gql`
  mutation add_user($firstName: String!, $lastName: String!, $email: String!) {
    addUser(firstName: $firstName, lastName: $lastName, email: $email) {
      firstName
      lastName
    }
  }
`

const DELETE_MUTATION = gql`
  mutation delete_user {
    deleteUser {
      firstName
      lastName
    }
  }
`

function App() {
  const { loading, error, data } = useQuery(USERS_QUERY);
  const [add_user] = useMutation(ADD_MUTATION);
  const [delete_user] = useMutation(DELETE_MUTATION);
  const [state, setState] = useState([])

  const handleAddUser = () => {
    add_user({ variables: { firstName: 'james', lastName: 'poter', email: 'jamespoter@gmail.com' }})
    .then(
      response => {
        setState(response.data.addUser);
      }
    )
  }

  const handleDeleteUser = () => {
    delete_user()
    .then(
      response => {
        setState(response.data.deleteUser);
      }
    )
  }

  useEffect(() => {
    if(data) {
      setState(data.queryUsers);
    }
  }, [data])

  if (loading) {
    return 'Loading ................';
  }
  if (error) {
    return error.message;
  }
  
  return (
      <div className="App">
        <div className="button-group">
          <button className="button" onClick={handleAddUser}>
            Add User
          </button>
          <button className="button" onClick={handleDeleteUser}>
            Delete User
          </button>
        </div>
        {
          state.map((user, index) => (
            <div key={index} className="name-element">
              <div> {user.firstName} </div>
              <div> &nbsp;{user.lastName} </div>
            </div>
          ))
        }
      </div>
  );
  
}

export default App;
