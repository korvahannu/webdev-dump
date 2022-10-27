(function (app) {
  'use strict';
  app.start = function () {
    console.log('hello, world');
  };
  app.add = (x, y) => x + y;
  app.substract = (x, y) => x - y;
})(window.app = window.app || {});

// eslint-disable-next-line no-undef
module.exports = app;
