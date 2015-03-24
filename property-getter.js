var R = require('ramda');

// http://sean.voisen.org/blog/2013/10/intro-monads-maybe/

function PropertyGetter(prop) {
  // var props = makeProps(prop);

  return {

    // m a -> (a -> b) -> m b
    bind: function(fn) {
      // var concatProps = R.concat(props);
      return fn(prop);
    },
    invoke: function(obj) {
      return invokePropertyGetter(prop, obj);
    },
    props: prop
  };

  // var getProperty = function(obj) {
  //   return invokePropertyGetter(prop, obj);
  // };

  // getProperty.bind = function(fn) {
  //   return fn(prop);
  // };

  // return getProperty;
}

function makeProps(prop) {
  if(R.is(Array, prop)) {
    return prop;
  } else {
    return [prop];
  }
}

// function makeProps(props, prop) {
// }

function invokePropertyGetter(prop, obj) {
  if(R.isNil(obj)) {
    return undefined;
  } else {
    return obj[prop];
  }
}

var Nothing = function() {
  return Nothing.val;
};

Nothing.bind = R.always(Nothing);
Nothing.get  = Nothing.bind;
Nothing.val  = R.always(undefined);


module.exports = PropertyGetter;
