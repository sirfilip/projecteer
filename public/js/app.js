// var ReactClass = React.createClass({
//   getInitialState: function() {
//     return {
//       isHeaderHidden: false,
//       title: 'Stateful React Component'
//     }
//   },
//
//   handleClick: function() {
//     this.setState({
//       isHeaderHidden: !this.state.isHeaderHidden
//     });
//   },
//
//   render: function() {
//     var headerElement = React.createElement('h1', {className: 'header', key: 'header'}, this.state.title);
//     var buttonElement = React.createElement('button', {className: 'btn btn-default', key: 'button', onClick: this.handleClick}, 'Toggle Header');
//
//     if (this.state.isHeaderHidden) {
//       return React.createElement('div', null, [buttonElement]);
//     } else {
//       return React.createElement('div', null, [headerElement, buttonElement]);
//     }
//   }
// });
//
// var reactComponentElement = React.createElement(ReactClass);
// var reactComponent = ReactDOM.render(reactComponentElement, document.querySelector('.container'));
