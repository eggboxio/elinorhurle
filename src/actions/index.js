import 'whatwg-fetch';

let nextTodoId = 0
export const addTodo = (text) => ({
  type: 'ADD_TODO',
  id: nextTodoId++,
  text
})

export const setVisibilityFilter = (filter) => ({
  type: 'SET_VISIBILITY_FILTER',
  filter
})

export const toggleTodo = (id) => ({
  type: 'TOGGLE_TODO',
  id
})

const receiveYourData = payload => ({
  type: 'RECEIVE_DATA',
  payload: payload
})

export function fetchData() {
  return (dispatch) => {
    return fetch('https://picasaweb.google.com/data/feed/base/user/112447402726197626187?alt=json&kind=album&hl=en_GB')
      .then(response => response.json())
      .then(data => dispatch(receiveYourData(data)))
      .catch(err => console.log(err));
  }
}

