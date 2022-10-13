'use strict';

(function(app) {

    app.divide = function(x,y) {
        return x / y;
    }

    app.complicatedFormula = function(x) {
        return this.divide(x * 3 + 2 + 4, x + 1 + 2 + 3 * 4);
    }

})(window.app = window.app || { })

console.log(app.complicatedFormula(50))
console.warn('This is a warning.');
console.error('This is an error.');

