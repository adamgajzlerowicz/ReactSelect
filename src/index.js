import React from 'react';
var ReactDom = require('react-dom');
require('./style.css');

export class Select extends React.Component {
    constructor(props) {
        super(props);
        this.getVisibleItems = this.getVisibleItems.bind(this);
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
        this.getVisibleItems()
    };

    componentWillUnmount() {
        document.removeEventListener('click', this.handleOutsideClick, false);
    };

    toggle(value) {
        this.setState({
            open: value
        });
        if (value == false) {
            this.setState({
                filter: ''
            });
        } else {
        }
    };

    componentWillReceiveProps(nextProps) {
        if (nextProps.items !== this.state.items) {
            this.setState({items: nextProps.items}, () => {
                this.getVisibleItems();
            });
        }
    }

    getVisibleItems() {
        const visibleItems = [];
        Object.keys(this.props.items).forEach(key=> {

            if (
                !this.state.filter
                ||
                this.props.items[key].toLowerCase().indexOf(this.state.filter.toLowerCase())
                !== -1) {

                visibleItems.push(
                    <div
                        onClick={() => {
                            this.props.onChange(key);
                            this.setState({
                                selectedItem: key,
                                selectedItemLabel: this.props.items[key],
                                open: false
                            })
                        }}
                        key={key}
                        className="item"
                    >{this.props.items[key]}
                    </div>)
            }
        });

        if (visibleItems.length === 0) {
            visibleItems.push(
                <div
                    key={null}
                    className="item item-no-results"
                >No results found</div>
            )
        }

        this.setState({
            visibleItems: visibleItems
        })
    };

    handleOutsideClick(e) {
        if (!ReactDom.findDOMNode(this).contains(e.target)) {
            this.setState({
                open: false,
                filter: ''
            }, ()=> {
                this.getVisibleItems();
            })
        }
    };

    render() {
        return (

            <div className="select-react-redux-container">

                <div
                    onClick={()=> {
                        this.toggle(!this.state.open)
                    }}
                    className={this.state.open ? 'selected selected-open' : 'selected'}
                >
                    <div
                        className={Object.keys(this.state.items).length == 0 ? 'top-bar top-bar-empty' : 'top-bar'}>
                        {this.state.selectedItemLabel
                            ? this.state.selectedItemLabel
                            : Object.keys(this.state.items).length == 0 ? 'No options available' : 'Please select...'}</div>
                </div>

                <div style={{
                    display: this.state.open ? 'block' : 'none',
                    borderRadius: '0 0 6px 6px',
                    border: '1px rgb(170, 170, 170) solid',
                    fontSize: 15,
                    position: 'absolute',
                    backgroundColor: 'white',
                    width: '100%',
                    zIndex: '9999',
                    maxHeight: 300,
                    overflow: 'auto'
                }}>

                    <div style={{
                        padding: '5px 7px',
                    }}>
                        <input
                            type="text"
                            autoCorrect="off"
                            autoCapitalize="off"
                            spellCheck="false"
                            autoComplete="off"
                            ref={search => search && search.focus()}
                            value={this.state.filter}
                            onChange={(e)=> {
                                this.setState({
                                    filter: e.target.value
                                }, ()=> {
                                    this.getVisibleItems();
                                });

                            }}
                            style={{
                                fontSize: 15,
                                width: '100%',
                                boxSizing: 'border-box',
                                padding: '4px',
                            }}
                        />
                    </div>

                    {this.state.visibleItems}

                </div>
            </div>
        );
    }
}