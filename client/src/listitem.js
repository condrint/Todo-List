const React = require('react');

class ListItem extends React.Component {
    constructor(props){
      super(props);
    }
    render() {
      return (
      <ul id="todoList">
        { this.props.items && this.props.items.map((item, index) => <li key={index} onClick={() => {this.props.delete(index)}}> {item.toString()} </li>) }
      </ul>
      );
    }
  }
  
  export {ListItem};