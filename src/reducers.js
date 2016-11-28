import actions from './actions';

function getVisibleItems(items, visibilityFilter) {
    let visibleItems = {};
    Object.keys(items).map((key) => {
        if (
            !visibilityFilter
            ||
            items[key].toLowerCase().indexOf(visibilityFilter.toLowerCase().trim())
            !== -1
        ) {
            visibleItems.push();
        }
    });
    return visibleItems;
}

const itemsReducer = (state = {}, action) => {

    switch (action) {
        case actions.SET_ITEMS:
            return Object.assign({},
                ...state,
                {items: state}
            )
    }
    return state;
};

const filterReducer = (state = {}, action) => {
    return state;
};
const internalStateReducer = (state = {
    selected: '',
    open: false,
    selectedItem: '',
    selectedItemLabel: '',
    currentlyHighlighted: ''
}, action) => {
    return state;
};

export const reducers = (state = {}, action) => {
    return {
        items: itemsReducer(
            state.items,
            action
        ),
        visibilityFilter: filterReducer(
            state.visibilityFilter,
            action
        ),
        internalState: internalStateReducer(
            state.internalState,
            action
        )
    }
}