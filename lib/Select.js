'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Select = undefined;

var _index2 = require('/Users/adam/projects/ReactSelect/node_modules/redbox-react/lib/index.js');

var _index3 = _interopRequireDefault(_index2);

var _index4 = require('/Users/adam/projects/ReactSelect/node_modules/react-transform-catch-errors/lib/index.js');

var _index5 = _interopRequireDefault(_index4);

var _react2 = require('react');

var _react3 = _interopRequireDefault(_react2);

var _index6 = require('/Users/adam/projects/ReactSelect/node_modules/react-transform-hmr/lib/index.js');

var _index7 = _interopRequireDefault(_index6);

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _components = {
    Select: {
        displayName: 'Select'
    }
};

var _UsersAdamProjectsReactSelectNode_modulesReactTransformHmrLibIndexJs2 = (0, _index7.default)({
    filename: 'src/Select.js',
    components: _components,
    locals: [module],
    imports: [_react3.default]
});

var _UsersAdamProjectsReactSelectNode_modulesReactTransformCatchErrorsLibIndexJs2 = (0, _index5.default)({
    filename: 'src/Select.js',
    components: _components,
    locals: [],
    imports: [_react3.default, _index3.default]
});

function _wrapComponent(id) {
    return function (Component) {
        return _UsersAdamProjectsReactSelectNode_modulesReactTransformHmrLibIndexJs2(_UsersAdamProjectsReactSelectNode_modulesReactTransformCatchErrorsLibIndexJs2(Component, id), id);
    };
}

var ReactDom = require('react-dom');

var Select = exports.Select = _wrapComponent('Select')(function (_React$Component) {
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
                tabIndex: this.props.tabIndex ? this.props.tabIndex : null,
                currentlyHighlighted: {
                    index: -1,
                    key: ''
                }
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
                        open: false,
                        filter: ''
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
        key: 'trigger',
        value: function trigger(value) {
            var _this4 = this;

            this.props.onChange(value);
            this.setState({
                selectedItem: value,
                selectedItemLabel: this.props.items[value],
                open: false,
                currentlyHighlighted: {
                    index: -1,
                    key: ''
                }
            }, function () {
                _this4.getVisibleItems();
            });
        }
    }, {
        key: 'getVisibleItems',
        value: function getVisibleItems(isSearching) {
            var _this5 = this;

            var count = 0;
            var visibleItems = [];
            Object.keys(this.props.items).forEach(function (key) {
                if (!_this5.state.filter || _this5.props.items[key].toLowerCase().indexOf(_this5.state.filter.toLowerCase().trim()) !== -1) {
                    var className = '';
                    if (isSearching) {
                        if (count == 0) {
                            className = 'item item-selected';
                            _this5.setState({
                                currentlyHighlighted: {
                                    index: 0,
                                    key: [key]
                                }
                            });
                        } else {
                            className = 'item';
                        }
                    } else {
                        className = "item" + (key == _this5.state.selectedItem ? " item-selected" : "") + (_this5.state.currentlyHighlighted.key == key ? " item-highlighted" : "");
                    }
                    visibleItems.push(_react3.default.createElement(
                        'div',
                        {
                            onClick: function onClick() {
                                _this5.trigger(key);
                            },
                            key: key,
                            className: className
                        },
                        _this5.props.items[key]
                    ));
                    count = count + 1;
                }
            });

            if (visibleItems.length === 0) {
                visibleItems.push(_react3.default.createElement(
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
            var _this6 = this;

            if (!ReactDom.findDOMNode(this).contains(e.target)) {
                this.setState({
                    open: false,
                    filter: ''
                }, function () {
                    _this6.getVisibleItems();
                });
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _this7 = this;

            return _react3.default.createElement(
                'div',
                { className: 'select-react-redux-container' },
                _react3.default.createElement(
                    'a',
                    { href: '#',
                        tabIndex: this.state.tabIndex,
                        onClick: function onClick() {
                            _this7.toggle(!_this7.state.open);
                        },
                        onKeyPress: function onKeyPress(e) {
                            _this7.setState({
                                open: true
                            });
                        },
                        ref: function ref(e) {
                            _this7.link = e;
                        },
                        onKeyDown: function onKeyDown(e) {
                            if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
                                _this7.setState({
                                    open: true
                                });
                            }
                        },
                        className: this.state.open ? 'selected selected-open' : 'selected'
                    },
                    _react3.default.createElement(
                        'div',
                        {
                            className: Object.keys(this.state.items).length == 0 ? 'top-bar top-bar-empty' : 'top-bar' },
                        this.state.selectedItemLabel ? this.state.selectedItemLabel : Object.keys(this.state.items).length == 0 ? 'No options available' : 'Please select...'
                    )
                ),
                _react3.default.createElement(
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
                    _react3.default.createElement(
                        'div',
                        { style: {
                                padding: '5px 7px'
                            } },
                        _react3.default.createElement('input', {
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
                                    _this7.toggle(!_this7.state.open);
                                }
                                if (e.key === 'Enter') {
                                    _this7.trigger(_this7.state.currentlyHighlighted.key);
                                    _this7.toggle(!_this7.state.open);
                                    _this7.link.focus();
                                }
                            },
                            onChange: function onChange(e) {
                                _this7.setState({
                                    filter: e.target.value
                                }, function () {
                                    _this7.getVisibleItems(true);
                                });
                            },
                            onKeyDown: function onKeyDown(e) {
                                if (e.key === 'ArrowDown') {
                                    var index = _this7.state.currentlyHighlighted.index == _this7.state.visibleItems.length - 1 ? _this7.state.currentlyHighlighted.index : _this7.state.currentlyHighlighted.index + 1;
                                    _this7.setState({
                                        currentlyHighlighted: {
                                            key: _this7.state.visibleItems[index].key,
                                            index: index
                                        }
                                    }, function () {
                                        _this7.getVisibleItems();
                                    });
                                }
                                if (e.key === 'ArrowUp') {
                                    var _index = _this7.state.currentlyHighlighted.index == -1 ? _this7.state.currentlyHighlighted.index : _this7.state.currentlyHighlighted.index - 1;
                                    _this7.setState({
                                        currentlyHighlighted: {
                                            key: _index === -1 ? '' : _this7.state.visibleItems[_index].key,
                                            index: _index
                                        }
                                    }, function () {
                                        _this7.getVisibleItems();
                                    });
                                }
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
}(_react3.default.Component));