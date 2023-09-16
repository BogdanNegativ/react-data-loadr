import logo from './logo.svg';
import './App.css';
import UsersLoader from './components/UsersLoader';
import React from 'react';

class MyList extends React.Component {
  render() {
    console.log(this.props);
    return (
      <section>
        <h2>List of something</h2>
        <ul>{this.props.children}</ul>
      </section>
    )
  }
}
class MyItem extends React.Component {
  render() {
    const { title } = this.props;
    return (
      <li>{title}</li>
    )
  }
}

function App() {
  return (
    <>
      <UsersLoader />
      <MyList >
        <MyItem title="title#1" />
        <MyItem title="title#2" />
        <MyItem title="title#3" />
      </MyList>
    </>
  );
}

export default App;
