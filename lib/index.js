'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Select = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ReactDom = require('react-dom');
require('./style.css');

let Select = exports.Select = class Select extends _react2.default.Component {
    constructor(props) {
        super(props);
        this.getVisibleItems = this.getVisibleItems.bind(this);
        this.handleOutsideClick = this.handleOutsideClick.bind(this);
    }

    componentWillMount() {
        this.setState({
            open: false,
            items: this.props.items,
            filter: '',
            selectedItem: '',
            selectedItemLabel: '',
            visibleItems: []
        });
        document.addEventListener('click', this.handleOutsideClick, false);
    }

    componentDidMount() {
        this.getVisibleItems();
    }

    componentWillUnmount() {
        document.removeEventListener('click', this.handleOutsideClick, false);
    }

    toggle(value) {
        this.setState({
            open: value
        });
        if (value == false) {
            this.setState({
                filter: ''
            });
        } else {}
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.items !== this.state.items) {
            this.setState({ items: nextProps.items }, () => {
                this.getVisibleItems();
            });
        }
    }

    getVisibleItems() {
        const visibleItems = [];
        Object.keys(this.props.items).forEach(key => {

            if (!this.state.filter || this.props.items[key].toLowerCase().indexOf(this.state.filter.toLowerCase()) !== -1) {
                visibleItems.push(_react2.default.createElement(
                    'div',
                    {
                        onClick: () => {
                            this.props.onChange(key);
                            this.setState({
                                selectedItem: key,
                                selectedItemLabel: this.props.items[key],
                                open: false
                            }, () => {
                                this.getVisibleItems();
                            });
                        },
                        key: key,
                        className: key == this.state.selectedItem ? "item item-selected" : "item"
                    },
                    this.props.items[key]
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

    handleOutsideClick(e) {
        if (!ReactDom.findDOMNode(this).contains(e.target)) {
            this.setState({
                open: false,
                filter: ''
            }, () => {
                this.getVisibleItems();
            });
        }
    }

    render() {
        return _react2.default.createElement(
            'div',
            { className: 'select-react-redux-container' },
            _react2.default.createElement(
                'div',
                {
                    onClick: () => {
                        this.toggle(!this.state.open);
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
                        ref: search => search && search.focus(),
                        value: this.state.filter,
                        onChange: e => {
                            this.setState({
                                filter: e.target.value
                            }, () => {
                                this.getVisibleItems();
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
};