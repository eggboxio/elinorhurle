const data = (state = [], action) => {
  switch (action.type) {
    case 'RECEIVE_DATA':
      return action
    default:
      return state
  }
}

export default data