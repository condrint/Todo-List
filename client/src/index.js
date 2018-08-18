const React = require('react');
const ReactDOM = require('react-dom');
const { Login } = require('./login');
const { ListItem } = require('./listitem');
const axios = require('axios');


class App extends React.Component {

  constructor(){ 
    super();
    this.state = {
      items: [],
      inputValue: '',
      loggedIn: ''
    }

    this.userLogin = this.userLogin.bind(this);
    this.delete = this.delete.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  
  handleChange(e){
    this.setState({inputValue: e.target.value});
  }

  handleSubmit(e){
    e.preventDefault();
    if (!this.state.inputValue){
      //prevent blank items from being added
      alert('Input is empty!');
      return;
    }
    if (!this.state.loggedIn){
      alert('Must be logged in to add todos!');
      return;
    }
    //add value of input text to todo list array
    let newItems = this.state.items; 
    let owner = this.state.loggedIn;
    newItems.push(this.state.inputValue);
    
    axios.post('/api/updatetodo', { newItems, owner })
      .then(response => {
        this.setState({
          items: newItems,
          inputValue: ''
        });
      }).catch(error => {
          alert(error);
      });
    

  }

  userLogin(newItems, user){
    this.setState({
      items: newItems,
      loggedIn: user
    });
  }

  delete(index){
    if (window.confirm("Are you sure you want to delete '" + this.state.items[index] + "'?")){
      let owner = this.state.loggedIn;
      let newItems = this.state.items;
      newItems.splice(index, 1);
      axios.post('/api/updatetodo', { newItems, owner })
      .then(response => {
        this.setState({
          items: newItems
        });
      }).catch(error => {
          alert(error);
      });
    }
  }

  render() {
    var username = this.state.loggedIn;
    return (
      <div>
        <div id="welcomeContainer" align="center">
          { username ? (
            <h1> Welcome, {username}!</h1>
          ) : (
            <h1> Todo App </h1>
          )}
        </div>
        <hr/>
        <div id="appContainer">
          <div id="loginContainer">
              <Login login={this.userLogin}/>
          </div>
          <hr/>
          <div id="inputContainer">
            <form onSubmit={this.handleSubmit}>
              <input className="input" id="todoInput" type="text" value={this.state.inputValue} onChange={this.handleChange}/>
              <input className="button" id="todoAddInput" type="submit" value="add"/>
            </form>
          </div>
          <div id="listContainer">
            <ListItem items={this.state.items} delete={this.delete}/>
          </div>
        </div>
      </div>
    );
  }
}
  

  
  // ========================================
  
ReactDOM.render(
  <App/>,
  document.getElementById('root')
);
