(function($) {

  function autoincrementIdFactory() {
    var counter = 0;

    return function() {
      counter = counter + 1;
      return counter;
    };
  }

  var autoIncrementComponentId = autoincrementIdFactory();

  var components = [];

  $(document).ready(function() {
    _.each(components, function(component) {
      ReactDOM.unmountComponentAtNode(component.container);
    });

    $('[data-component]').each(function() {
      var componentClass = $(this).data('component') + 'Component';
      var componentId = autoIncrementComponentId();
      $(this).attr('id', componentId);
      var component = ReactDOM.render(React.createElement(window.reactComponents[componentClass], null), document.getElementById(componentId));
      components.push({component: component, container: document.getElementById(componentId)});
    });
  });


})(jQuery);
