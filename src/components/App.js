import React, {Component} from 'react'
import Footer from './Footer'
import AddTodo from '../containers/AddTodo'
import VisibleTodoList from '../containers/VisibleTodoList'
import { fetchData } from '../actions'

class App extends Component {
  componentDidMount() {
    console.log('hi');
    console.log(fetchData())
  }

  render() {
    return (
      <div>
        <AddTodo />
        <VisibleTodoList />
        <Footer />
      </div>
    )
  }
}

export default App
