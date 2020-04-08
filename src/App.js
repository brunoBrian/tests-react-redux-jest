import React, { Component } from 'react';
import Header from './component/header';
import Headline from './component/headline';
import SharedButton from './component/button';
import ListItem from './component/listItem';
import { connect } from 'react-redux';
import { fetchPosts } from './actions';
import { fetchUser} from './actions/getUser';
import './app.scss';
import Images from  './component/images';

/* This const is not used within our app.
   Although we are passing it to the Headline Component
   it is only here as an exampleof testing PropTypes */
const tempArr = [{
  fName: 'Bruno',
  lName: 'Sousa',
  email: 'bruno.brian@gmail.com',
  age: 25,
  onlineStatus: true
}];

const initialState = {
  hideBtn: false
};

class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      ...initialState
    }
    this.fetch = this.fetch.bind(this);
  }

  componentDidMount() {
    this.props.fetchUser();
  }

  fetch(){
    this.props.fetchPosts();
    this.exampleMethod_updatesState();
  }

  exampleMethod_updatesState() {
    const { hideBtn } = this.state;
    this.setState({
      hideBtn: !hideBtn
    });
  }

  exampleMethod_returnsAValue(number) {
    return number + 1;
  }

  render() {
    const { items, user } = this.props.data;
    const { hideBtn } = this.state;

    const configButton = {
      buttonText: 'Get posts',
      emitEvent: this.fetch
    }

    return (
      <div className="App" data-test="appComponent">
        <Header />
        <section className="main">
          <Images />
          <Headline header="Posts" desc="Click the button to render posts!" tempArr={tempArr} />
          <h2>Bem vindo @{user.login}</h2>
          
          {!hideBtn &&
            <SharedButton {...configButton} />
          }
          
          {items.length > 0 &&
            <div>
              {items.map((post, index) => {
                const { title, body } = post;
                const configListItem = {
                  title,
                  desc: body
                };
                return (
                  <ListItem key={index} {...configListItem} />
                )
              })}
            </div>
          }
        </section>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    data: state.data
  }
}

export default connect(mapStateToProps, {fetchPosts, fetchUser})(App);
