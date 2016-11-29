export const reducers = (state = {}, action) => {
    switch (action.type) {
        case 'SET_ITEMS': {
            return {
                ...state,
                items: action.payload,
                visibleItems: action.payload,
                currentlyHighlighted: Object.keys(action.payload)[0] || ''
            };
        }
        case 'SET_FILTER': {
            let visibleItems = {};
            Object.keys(state.items).map((key) => {
                if (
                    !state.visibilityFilter
                    ||
                    state.items[key].toLowerCase().indexOf(state.visibilityFilter.toLowerCase().trim())
                    !== -1
                ) {
                    visibleItems[key] = state.items[key];
                }
            });
            return {
                ...state,
                visibilityFilter: action.payload,
                visibleItems: visibleItems
            };
        }
        case 'TOGGLE_OPEN': {
            return {
                ...state,
                open: !state.open
            };
        }

        case 'SET_OPEN': {
            return {
                ...state,
                open: action.payload
            };
        }
        case 'SET_NEXT_HIGHLIGHTED': {
            let keys = Object.keys(state.visibleItems);
            let currentIndex = keys.indexOf(state.currentlyHighlighted);

            let newIndex = 0;
            if (currentIndex < keys.length - 1 && currentIndex != -1) {
                newIndex = currentIndex + 1;
            }
            return {
                ...state,
                currentlyHighlighted: keys[newIndex]
            };
        }

        case 'SET_PREV_HIGHLIGHTED': {
            let keys = Object.keys(state.visibleItems);
            let currentIndex = keys.indexOf(state.currentlyHighlighted);

            let newIndex = 0;
            if (currentIndex > 0) {
                newIndex = currentIndex - 1;
            }

            return {
                ...state,
                currentlyHighlighted: keys[newIndex]
            };
        }

        case 'SET_HIGHLIGHTED': {
            return {
                ...state,
                currentlyHighlighted: action.payload
            }
        }
        case 'SET_SELECTED': {
            return {
                ...state,
                currentlyHighlighted: action.payload,
                selected: action.payload
            }
        }
    }
    return state;
};
