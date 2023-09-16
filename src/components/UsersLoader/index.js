import React, { Component } from 'react';
import Spinner from '../Spinner';
import * as API from '../../api';

const ListUsers = ({ users }) => {
  const renderUser = ({ login: { uuid }, name: { first: firstName, last: lastName } }) => {
    return <li key={uuid}>{firstName} {lastName}</li>
  }
  return (
    <ul>
      {users.map(renderUser)}
    </ul>
  );
}
class UsersLoader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      isLoading: false,
      page: 1,
      isError: false,
      nationality: 'ua',
      gender: 'all',
    }
    console.log('constructor');
  }

  load() {
    this.setState({ isLoading: true });
    const { page, nationality, gender } = this.state;
    API.getUsers({ page, results: 5, nat: nationality, gender })
      .then(data => this.setState({
        users: data.results,
      }))
      .catch(error => this.setState({
        isError: true,
      }))
      .finally(() => this.setState({
        isLoading: false
      }));
  }

  componentDidMount() {
    console.log('componentDidMount');
    this.load();
  }
  componentDidUpdate(prevProps, prevState) {
    console.log('componentDidUpdate');
    if (this.state.page === prevState.page) {
      return;
    }
    this.load();

  }
  prevPage = () => {
    this.setState({ page: this.state.page - 1 })
  }
  nextPage = () => {
    this.setState({ page: this.state.page + 1 })
  }

  handleGenderChange = (event) => {
    this.setState({ gender: event.target.value });
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      this.state.page !== prevState.page ||
      this.state.nationality !== prevState.nationality ||
      this.state.gender !== prevState.gender
    ) {
      this.load();
    }
  }

  render() {
    console.log('render');
    const { users, isLoading, page, isError } = this.state;
    if (isError) {
      return <p>Error...</p>
    }
    return (
      <section>
        <h2>Users List:</h2>
        <button disabled={page === 1} onClick={this.prevPage}>{"<"}</button>
        <span>page:{page}</span>
        <button onClick={this.nextPage}>{">"}</button>
        {/* {
          isLoading ? <Spinner /> : <ListUsers users={users} />
        } */}
        <ListUsers users={users} />
        {isLoading && <Spinner />}
        <div>
          <h2>Стать:</h2>
          <label>
            <input
              type="radio"
              value="all"
              checked={this.state.gender === 'all'}
              onChange={this.handleGenderChange}
            />
            Усі
          </label>
          <label>
            <input
              type="radio"
              value="male"
              checked={this.state.gender === 'male'}
              onChange={this.handleGenderChange}
            />
            Чоловіки
          </label>
          <label>
            <input
              type="radio"
              value="female"
              checked={this.state.gender === 'female'}
              onChange={this.handleGenderChange}
            />
            Жінки
          </label>
        </div>

      </section>
    );
  }
}

export default UsersLoader;










