'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Select = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ReactDom = require('react-dom');

var Select = exports.Select = function (_React$Component) {
    _inherits(Select, _React$Component);

    function Select(props) {
        _classCallCheck(this, Select);

        var _this = _possibleConstructorReturn(this, (Select.__proto__ || Object.getPrototypeOf(Select)).call(this, props));

        _this.getVisibleItems = _this.getVisibleItems.bind(_this);
        _this.handleOutsideClick = _this.handleOutsideClick.bind(_this);
        return _this;
    }

    _createClass(Select, [{
        key: 'componentWillMount',
        value: function componentWillMount() {
            this.setState({
                open: false,
                items: this.props.items ? this.props.items : {},
                filter: '',
                selectedItem: '',
                selectedItemLabel: '',
                visibleItems: [],
                tabIndex: this.props.tabIndex ? this.props.tabIndex : null
            });
            document.addEventListener('click', this.handleOutsideClick, false);
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _this2 = this;

            this.getVisibleItems();
            document.addEventListener('keydown', function (e) {
                if (e.key === "Escape") {
                    _this2.setState({
                        open: false
                    });
                    if (ReactDom.findDOMNode(_this2).contains(e.target)) {
                        _this2.link.focus();
                    }
                }
            });
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            document.removeEventListener('click', this.handleOutsideClick, false);
        }
    }, {
        key: 'toggle',
        value: function toggle(value) {
            this.setState({
                open: value
            });
            if (value == false) {
                this.setState({
                    filter: ''
                });
            }
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            var _this3 = this;

            if (nextProps.items !== this.state.items) {
                this.setState({ items: nextProps.items }, function () {
                    _this3.getVisibleItems();
                });
            }
        }
    }, {
        key: 'getVisibleItems',
        value: function getVisibleItems() {
            var _this4 = this;

            var visibleItems = [];
            Object.keys(this.props.items).forEach(function (key) {
                if (!_this4.state.filter || _this4.props.items[key].toLowerCase().indexOf(_this4.state.filter.toLowerCase().trim()) !== -1) {
                    visibleItems.push(_react2.default.createElement(
                        'div',
                        {
                            onClick: function onClick() {
                                _this4.props.onChange(key);
                                _this4.setState({
                                    selectedItem: key,
                                    selectedItemLabel: _this4.props.items[key],
                                    open: false
                                }, function () {
                                    _this4.getVisibleItems();
                                });
                            },
                            key: key,
                            className: key == _this4.state.selectedItem ? "item item-selected" : "item"
                        },
                        _this4.props.items[key]
                    ));
                }
            });
            if (visibleItems.length === 0) {
                visibleItems.push(_react2.default.createElement(
                    'div',
                    {
                        key: null,
                        className: 'item item-no-results'
                    },
                    'No results found'
                ));
            }

            this.setState({
                visibleItems: visibleItems
            });
        }
    }, {
        key: 'handleOutsideClick',
        value: function handleOutsideClick(e) {
            var _this5 = this;

            if (!ReactDom.findDOMNode(this).contains(e.target)) {
                this.setState({
                    open: false,
                    filter: ''
                }, function () {
                    _this5.getVisibleItems();
                });
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _this6 = this;

            return _react2.default.createElement(
                'div',
                { className: 'select-react-redux-container' },
                _react2.default.createElement(
                    'a',
                    { href: '#',
                        tabIndex: this.state.tabIndex,
                        onClick: function onClick() {
                            _this6.toggle(!_this6.state.open);
                        },
                        onKeyPress: function onKeyPress(e) {
                            if (e.key === 'Enter' || e.key === ' ') {
                                _this6.toggle(!_this6.state.open);
                            }
                        },
                        ref: function ref(e) {
                            _this6.link = e;
                        },
                        className: this.state.open ? 'selected selected-open' : 'selected'
                    },
                    _react2.default.createElement(
                        'div',
                        {
                            className: Object.keys(this.state.items).length == 0 ? 'top-bar top-bar-empty' : 'top-bar' },
                        this.state.selectedItemLabel ? this.state.selectedItemLabel : Object.keys(this.state.items).length == 0 ? 'No options available' : 'Please select...'
                    )
                ),
                _react2.default.createElement(
                    'div',
                    { style: {
                            display: this.state.open ? 'block' : 'none',
                            borderRadius: '0 0 6px 6px',
                            borderBottom: '1px rgb(170, 170, 170) solid',
                            borderLeft: '1px rgb(170, 170, 170) solid',
                            borderRight: '1px rgb(170, 170, 170) solid',
                            fontSize: 15,
                            position: 'absolute',
                            backgroundColor: 'white',
                            width: '100%',
                            zIndex: '9999',
                            maxHeight: 300,
                            overflow: 'auto'
                        } },
                    _react2.default.createElement(
                        'div',
                        { style: {
                                padding: '5px 7px'
                            } },
                        _react2.default.createElement('input', {
                            type: 'text',
                            autoCorrect: 'off',
                            autoCapitalize: 'off',
                            spellCheck: 'false',
                            autoComplete: 'off',
                            ref: function ref(search) {
                                return search && search.focus();
                            },
                            value: this.state.filter,
                            onKeyPress: function onKeyPress(e) {
                                if (e.key === 'Esc') {
                                    _this6.toggle(!_this6.state.open);
                                }
                            },
                            onChange: function onChange(e) {
                                _this6.setState({
                                    filter: e.target.value
                                }, function () {
                                    _this6.getVisibleItems();
                                });
                            },
                            style: {
                                fontSize: 15,
                                width: '100%',
                                boxSizing: 'border-box',
                                padding: '4px'
                            }
                        })
                    ),
                    this.state.visibleItems
                )
            );
        }
    }]);

    return Select;
}(_react2.default.Component);