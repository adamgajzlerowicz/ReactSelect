'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ReactDom = require('react-dom');
var Radium = require('radium');

var Unstyled = function (_React$Component) {
    _inherits(Unstyled, _React$Component);

    function Unstyled(props) {
        _classCallCheck(this, Unstyled);

        var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

        _this.componentDidMount = function () {
            _this.getVisibleItems();
        };

        _this.componentWillUnmount = function () {
            document.removeEventListener('click', _this.handleOutsideClick, false);
        };

        _this.toggle = function (value) {
            _this.setState({
                open: value
            });
            if (value == false) {
                _this.setState({
                    filter: ''
                });
            } else {}
        };

        _this.getVisibleItems = function () {
            var visibleItems = [];
            Object.keys(_this.props.items).forEach(function (key) {

                if (!_this.state.filter || items[key].indexOf(_this.state.filter) !== -1) {

                    visibleItems.push(_react2.default.createElement(
                        'div',
                        {
                            onClick: function onClick() {
                                onChange(key);
                                _this.setState({
                                    selectedItem: key,
                                    selectedItemLabel: items[key],
                                    open: false
                                });
                            },
                            key: key,
                            style: {
                                padding: "6px 6px 6px 14px",
                                cursor: 'pointer',
                                ':hover': {
                                    backgroundColor: 'rgb(88, 151, 251)'
                                },
                                fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
                                fontSize: 15

                            }
                        },
                        items[key]
                    ));
                }
            });

            if (visibleItems.length === 0) {
                visibleItems.push(_react2.default.createElement(
                    'div',
                    {
                        key: null,
                        style: {
                            padding: "6px 6px 6px 14px",
                            fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif'

                        }
                    },
                    'No results found'
                ));
            }

            _this.setState({
                visibleItems: visibleItems
            });
        };

        _this.handleOutsideClick = function (e) {
            if (!ReactDom.findDOMNode(_this).contains(e.target)) {
                _this.setState({
                    open: false,
                    filter: ''
                }, function () {
                    _this.getVisibleItems();
                });
            }
        };

        _this.getVisibleItems = _this.getVisibleItems.bind(_this);
        return _this;
    }

    Unstyled.prototype.componentWillMount = function componentWillMount() {
        this.setState({
            open: true,
            items: this.props.items,
            filter: '',
            selectedItem: '',
            selectedItemLabel: ''
        });
        document.addEventListener('click', this.handleOutsideClick, false);
    };

    Unstyled.prototype.render = function render() {
        var _this2 = this;

        return _react2.default.createElement(
            'div',
            { style: { position: 'relative' } },
            _react2.default.createElement(
                'div',
                {
                    onClick: function onClick() {
                        _this2.toggle(!_this2.state.open);
                    },
                    style: {
                        borderRadius: this.state.open ? '6px 6px 0 0 ' : '6px',
                        borderTop: '1px rgb(170, 170, 170) solid',
                        borderLeft: '1px rgb(170, 170, 170) solid',
                        borderRight: '1px rgb(170, 170, 170) solid',
                        borderBottom: this.state.open ? 'none' : '1px solid rgb(170, 170, 170)',
                        width: '100%',
                        cursor: 'pointer',
                        fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif'
                    } },
                _react2.default.createElement(
                    'div',
                    { style: { padding: '5px 7px' } },
                    this.state.selectedItemLabel ? this.state.selectedItemLabel : 'Please select...'
                )
            ),
            _react2.default.createElement(
                'div',
                { style: {
                        display: this.state.open ? 'block' : 'none',
                        borderRadius: '0 0 6px 6px',
                        border: '1px rgb(170, 170, 170) solid',
                        fontSize: 15,
                        position: 'absolute',
                        backgroundColor: 'white',
                        width: '100%',
                        zIndex: '9999'
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
                        onChange: function onChange(e) {
                            _this2.setState({
                                filter: e.target.value
                            }, function () {
                                _this2.getVisibleItems();
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
    };

    return Unstyled;
}(_react2.default.Component);

exports.Select = Radium(Unstyled);