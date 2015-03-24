var R = require('ramda');

var PropertyGetter = require('./property-getter');

ddescribe('PropertyGetter', function() {
  var data = {
    title: 'This is a title',
    author: {
      name: 'Tyler'
    }
  };

  it('should return a property on an object', function() {
    var result = PropertyGetter('title').invoke(data);
    expect(result).toBe(data.title);
  });

  it('should return undefined if the initial value is undefined', function() {
    var result = PropertyGetter('title').invoke(undefined);
    expect(result).toBe(undefined);
  });

  it('should return undefined if the initial value does not have the defined property', function() {
    var result = PropertyGetter('title').invoke(5);
    expect(result).toBe(undefined);
  });

  it('should have a bind function', function() {
    var getTitleThenDescription = PropertyGetter('title').bind(function() {
      return PropertyGetter('description');
    });

    expect(getTitleThenDescription.invoke(data)).toBe(undefined);
  });

  it('should have a bind function', function() {
    var getAuthorName = PropertyGetter('author').bind(function() {
      return PropertyGetter('name');
    });

    console.log(getAuthorName);

    expect(getAuthorName.invoke(data)).toBe('Tyler');
  });


  xit('should return an array item if the initial value is an array', function() {
    PropertyGetter = PropertyGetterFactory([1, 2]);
    expect(PropertyGetter.get('0')).toBeAPropertyGetterWithValue(1);
  });
});
