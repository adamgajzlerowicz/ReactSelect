import React from 'react';
var ReactDom = require('react-dom');
var Radium = require('radium');

class Unstyled extends React.Component {
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
            selectedItemLabel: ''
        });
        document.addEventListener('click', this.handleOutsideClick, false);
    }

    componentDidMount = () => {
        this.getVisibleItems()
    };

    componentWillUnmount = () => {
        document.removeEventListener('click', this.handleOutsideClick, false);
    };

    toggle = (value) => {
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

    getVisibleItems = () => {
        const visibleItems = [];
        Object.keys(this.props.items).forEach(key=> {

            if (!this.state.filter || this.props.items[key].indexOf(this.state.filter) !== -1) {

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
                        style={{
                            padding: "6px 6px 6px 14px",
                            cursor: 'pointer',
                            ':hover': {
                                backgroundColor: 'rgb(88, 151, 251)'
                            },
                            fontFamily:'"Helvetica Neue", Helvetica, Arial, sans-serif',
                            fontSize:15

                        }}
                    >{this.props.items[key]}
                    </div>)
            }
        });

        if (visibleItems.length === 0) {
            visibleItems.push(
                <div
                    key={null}
                    style={{
                        padding: "6px 6px 6px 14px",
                        fontFamily:'"Helvetica Neue", Helvetica, Arial, sans-serif'

                    }}
                >No results found</div>
            )
        }

        this.setState({
            visibleItems: visibleItems
        })
    };

    handleOutsideClick = (e) => {
        if (!ReactDom.findDOMNode(this).contains(e.target)) {
            this.setState({
                open: false,
                filter: ''
            },()=> {
                this.getVisibleItems();
            })
        }
    };

    render() {
        return (

            <div style={{position:'relative'}}>

                <div
                    onClick={()=> {
                        this.toggle(!this.state.open)
                    }}
                    style={{
                        borderRadius: this.state.open ? '6px 6px 0 0 ' : '6px',
                        borderTop: '1px rgb(170, 170, 170) solid',
                        borderLeft: '1px rgb(170, 170, 170) solid',
                        borderRight: '1px rgb(170, 170, 170) solid',
                        borderBottom: this.state.open ? 'none' : '1px solid rgb(170, 170, 170)',
                        width: '100%',
                        cursor: 'pointer',
                        fontFamily:'"Helvetica Neue", Helvetica, Arial, sans-serif'
                    }}>
                    <div style={{padding: '5px 7px'}}>{this.state.selectedItemLabel ? this.state.selectedItemLabel : 'Please select...'}</div>
                </div>

                <div style={{
                    display: this.state.open ? 'block' : 'none',
                    borderRadius: '0 0 6px 6px',
                    border: '1px rgb(170, 170, 170) solid',
                    fontSize: 15,
                    position: 'absolute',
                    backgroundColor: 'white',
                    width: '100%',
                    zIndex: '9999'
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
                                },()=>{
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

export const Select = Radium(Unstyled);
