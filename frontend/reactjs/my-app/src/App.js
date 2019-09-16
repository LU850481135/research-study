import React from 'react';
import { Button } from 'antd';

function App(props) {
  const numbers = props.numbers;
  return (
    <div className="App">
      <header className="App-header">
        <Welcome name="liulu" />
        <Clock />
        <Toggle />
        <LoginControl />
        <NumberList numbers={numbers} />
      </header>
    </div>
  );
}

function ListItem(props) {
  return <li>{props.value}</li>
}

function NumberList(props) {
  debugger
  const numbers = props.numbers;
  const ListItems = numbers.map((number) =>
    <ListItem key={number.toString()} value={number} />
  );
  return (
    <ul>
      {ListItems}
    </ul>
  );
}

function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}

function Login(props) {
  return (
    <Button onClick={props.onClick}>
      Login
    </Button>
  );
}

function Logout(props) {
  return (
    <button onClick={props.onClick}>
      Logout
    </button>
  );
}

 class LoginControl extends React.Component {
   constructor(props) {
     super(props);
     this.handleLoginClick = this.handleLoginClick.bind(this);
     this.handleLogoutClick = this.handleLogoutClick.bind(this);
     this.state = {isLoggedIn: false};
   }
   handleLoginClick() {
      this.setState({isLoggedIn: true});
    }

    handleLogoutClick() {
      this.setState({isLoggedIn: false});
    }
    render() {
      const isLoggedIn = this.state.isLoggedIn;
      let button;
      let tip;
  
      if (isLoggedIn) {
        button = <Logout onClick={this.handleLogoutClick} />;
        tip = "已登录";
      } else {
        button = <Login onClick={this.handleLoginClick} />;
        tip = "登录";
      }
  
      return (
        <div>
          {button}
          <h1>{tip}</h1>
        </div>
      );
    }
 }


class Toggle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {isToggleOn: true};

    // 为了在回调中使用 `this`，这个绑定是必不可少的
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState(state => ({
      isToggleOn: !state.isToggleOn
    }));
  }

  render() {
    return (
      <button onClick={this.handleClick}>
        {this.state.isToggleOn ? 'ON' : 'OFF'}
      </button>
    );
  }
}

class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }
  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }
  componentWillUnmount() {
    clearInterval(this.timerID);
  }
  tick() {
    this.setState({
      date: new Date()
    });
  }
  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}

export default App;
