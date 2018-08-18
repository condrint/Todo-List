const React = require('react');
const axios = require('axios');

class Login extends React.Component{
    constructor(props){ 
        super(props);
        this.state = {
            usernameValue: '',
            passwordValue: '',
            loggedIn: false
          }
      
          this.handleLogoutSubmit = this.handleLogoutSubmit.bind(this);
          this.handleUsernameChange = this.handleUsernameChange.bind(this);
          this.handlePasswordChange = this.handlePasswordChange.bind(this);
          this.handleLoginSubmit = this.handleLoginSubmit.bind(this); 
          this.handleRegisterSubmit = this.handleRegisterSubmit.bind(this);
        }
      
        handleUsernameChange(e){
            this.setState({usernameValue: e.target.value});
        }    

        handlePasswordChange(e){
            this.setState({passwordValue: e.target.value});
        }    


        handleLogoutSubmit(){
            this.setState({loggedIn: false});
            this.props.login([], '');
        }

        handleLoginSubmit(){
            const username = this.state.usernameValue;
            const password = this.state.passwordValue;
    
            axios.post('/api/login', { username, password })
            .then(response => {
                this.setState({
                    usernameValue: '',
                    passwordValue: '', 
                    loggedIn: true
                });
                this.props.login(response.data.todos, response.data.user);
            }).catch(error => {
                alert('Username or (inclusive) password does not match database');
            });
        }

        handleRegisterSubmit(){
            const username = this.state.usernameValue;
            const password = this.state.passwordValue;

            axios.post('/api/register', { username, password })
            .then(response => {
                const genBlankTodo = [];
                this.setState({
                    usernameValue: '',
                    passwordValue: '', 
                    loggedIn: true
                });
                this.props.login(genBlankTodo, response.data.user);
            }).catch(error => {
                alert('Error registering user');
            });
            
        }
        
      render() {
        var isLoggedIn = this.state.loggedIn;
        return (
            <div>
            { isLoggedIn ? (
                <button className="button" id="logoutButton" value="logout" name="logout" onClick={this.handleLogoutSubmit}>logout</button>
            ) : (
                <div>
                    <input className="input" id="usernameInput" type="text" placeholder="username" value={this.state.usernameValue} onChange={this.handleUsernameChange}/>
                    <input className="input" id="passwordInput" type="text" placeholder="password" value={this.state.passwordValue} onChange={this.handlePasswordChange}/>
                    <button className="button" id="loginButton" value="login" name="login"  onClick={this.handleLoginSubmit}>login</button>
                    <button className="button" id="registerButton" value="register" name="register" onClick={this.handleRegisterSubmit}>register</button>
                </div>
            )}
            </div>
        );
      }
    }

export { Login };