'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _Select = require('./Select');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var items = {
    'foo': 'I am option 1',
    'foo2': 'I am option 2',
    'blah': 'dupa dupa dupa',
    'fekkk': 'Harry potter'
};

var onChange = function onChange(val) {
    console.log('selected ' + val);
};

(0, _reactDom.render)(_react2.default.createElement(
    'div',
    null,
    _react2.default.createElement(_Select.Select, { items: items, onChange: onChange })
), document.getElementById('app_small'));