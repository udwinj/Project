
// var initialTimeState = {}

// // The reducer is named with leading "_" to avoid having: state.time.time (time twice) when reading
// // from state. So it's just a personal preference here and you may not need this depending on
// // how your reducers are named and what properties they expose in Redux's store.
// export function _time(state = initialTimeState, action) {
//   console.log('_time reducer called with state ', state , ' and action ', action);



let switchReducer = function (state=[], action){
   console.log('switchReducer', state , ' and action ', action);
   //avoid too much states storing
   state = [state[state.length-1]]
    switch (action.type) {
        case 'Goto':
            return [
                ...state,
                action.value,
                
            ]
        default:
            return state;
    }
}
export default switchReducer