'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _index = require('../lib/index');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const items = {
    'item1': 'Mercedes Benz C40',
    'item2': 'Mazda X11'
};

const onChange = val => {
    console.log('selected ' + val);
};

(0, _reactDom.render)(_react2.default.createElement(
    'div',
    null,
    _react2.default.createElement(_index.Select, { items: items, onChange: onChange })
), document.getElementById('app'));