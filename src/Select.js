import React from 'react';
var ReactDom = require('react-dom');

export class Select extends React.Component {
    constructor(props) {
        super(props);
        this.getVisibleItems = this.getVisibleItems.bind(this);
        this.handleOutsideClick = this.handleOutsideClick.bind(this);
        this.inputOnChange = this.inputOnChange.bind(this);
        this.inputOnKeyPress = this.inputOnKeyPress.bind(this);
        this.inputOnKeyDown = this.inputOnKeyDown.bind(this);
        this.linkOnKeyDown = this.linkOnKeyDown.bind(this);
    }

    componentWillMount() {
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

    componentDidMount() {
        this.getVisibleItems();
        document.addEventListener('keydown', (e)=> {
            if (e.key === "Escape") {
                this.setState({
                    open: false,
                    filter: ''
                });
                if (ReactDom.findDOMNode(this).contains(e.target)) {
                    this.link.focus();
                }

            }
        });
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
        }else{
            // if(this.state.selectedItem){
            //     this.setState({
            //         currentlyHighlighted: {
            //             index: 1,
            //             key: this.state.selectedItem
            //         }
            //     });
            // }

        }
    };

    componentWillReceiveProps(nextProps) {
        if (nextProps.items !== this.state.items) {
            this.setState({items: nextProps.items}, () => {
                this.getVisibleItems();
            });
        }
    }

    submit(value) {
        this.props.onChange(value);
        this.setState({
            selectedItem: value,
            selectedItemLabel: this.props.items[value],
            open: false,
            currentlyHighlighted: {
                index: -1,
                key: ''
            }
        }, ()=> {
            this.getVisibleItems();
        })
    }

    getVisibleItems(isSearching) {
        var first = true;
        const visibleItems = [];
        Object.keys(this.props.items).forEach((key)=> {
            if (
                !this.state.filter
                ||
                this.props.items[key].toLowerCase().indexOf(this.state.filter.toLowerCase().trim())
                !== -1
            ) {
                var className = '';
                if (isSearching) {
                    if (first == true) {
                        first = false;
                        className = 'item item-selected';
                        this.setState({
                            currentlyHighlighted: {
                                index: 0,
                                key: [key]
                            }
                        })
                    } else {
                        className = 'item'
                    }
                } else {
                    className = (
                        (key == this.state.currentlyHighlighted.key && this.state.selectedItem == '')
                        ||
                        (key == this.state.selectedItem && this.state.currentlyHighlighted.key == '')
                        ||
                        (
                            this.state.currentlyHighlighted.key != ''
                        &&
                            this.state.selectedItem != ''
                        &&
                            key == this.state.currentlyHighlighted.key
                        )
                    )
                        ? 'item item-selected' : 'item';
                }
                visibleItems.push(
                    <div
                        onClick={() => {
                            this.submit(key);
                        }}
                        key={key}
                        className={className}
                    >{this.props.items[key]}
                    </div>
                );

            }
        });

        if (visibleItems.length === 0) {
            visibleItems.push(
                <div
                    key={null}
                    className="item item-no-results"
                >No results found</div>
            );
            this.setState({
                currentlyHighlighted: {
                    key: '',
                    index: -1
                }
            })
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

    inputOnKeyDown(e) {
        if (e.key === 'ArrowDown') {
            let index = this.state.currentlyHighlighted.index == this.state.visibleItems.length - 1
                ? this.state.currentlyHighlighted.index : this.state.currentlyHighlighted.index + 1;
            this.setState({
                currentlyHighlighted: {
                    key: this.state.visibleItems[index].key,
                    index: index
                }
            }, ()=> {
                this.getVisibleItems();
            });
        }

        if (e.key === 'ArrowUp') {
            let index = this.state.currentlyHighlighted.index == -1
                ? this.state.currentlyHighlighted.index : this.state.currentlyHighlighted.index - 1;
            this.setState({
                currentlyHighlighted: {
                    key: index === -1 ? '' : this.state.visibleItems[index].key,
                    index: index
                }
            }, ()=> {
                this.getVisibleItems();
            });
        }
    }

    inputOnKeyPress(e) {
        if (e.key === 'Esc') {
            this.toggle(!this.state.open)
        }
        if (e.key === 'Enter') {
            console.log(this.state.currentlyHighlighted.key);
            if (this.state.currentlyHighlighted.index > -1) {
                this.submit(this.state.currentlyHighlighted.key);
                this.toggle(!this.state.open);
                this.link.focus();
            }
        }
    }

    inputOnChange(e) {
        this.setState({
            filter: e.target.value
        }, ()=> {
            this.getVisibleItems(true);
        });
    }

    linkOnKeyDown(e) {
        if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
            this.setState({
                open: true
            })
        }
    }

    render() {
        return (

            <div className="select-react-redux-container">
                <a href="#"
                   tabIndex={this.state.tabIndex}
                   onClick={()=> {
                       this.toggle(!this.state.open)
                   }}
                   onKeyPress={()=> {
                       this.setState({open: true})
                   }}
                   ref={(e) => {
                       this.link = e;
                   }}
                   onKeyDown={this.linkOnKeyDown}
                   className={this.state.open ? 'selected selected-open' : 'selected'}
                >
                    <div
                        className={Object.keys(this.state.items).length == 0 ? 'top-bar top-bar-empty' : 'top-bar'}>
                        {this.state.selectedItemLabel
                            ? this.state.selectedItemLabel
                            : Object.keys(this.state.items).length == 0 ? 'No options available' : 'Please select...'}</div>
                </a>

                <div className={this.state.open ? 'results-container open' : 'results-container' }>

                    <div className="input-container">
                        <input
                            type="text"
                            autoCorrect="off"
                            autoCapitalize="off"
                            spellCheck="false"
                            autoComplete="off"
                            ref={search => search && search.focus()}
                            value={this.state.filter}
                            onKeyPress={this.inputOnKeyPress}
                            onChange={this.inputOnChange}
                            onKeyDown={this.inputOnKeyDown}
                        />
                    </div>
                    {this.state.visibleItems}
                </div>
            </div>
        );
    }
}
