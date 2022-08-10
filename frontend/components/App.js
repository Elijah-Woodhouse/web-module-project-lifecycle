import React from 'react'
import axios from 'axios'
import Form from "./Form"
import TodoList from "./TodoList"


const URL = 'http://localhost:9000/api/todos'

const initialState = {
    todos: [{
      id: "",
      name: "",
      completed: false,
    }],
    textInput: "",
    error: "",
    display: true,
}


export default class App extends React.Component {

  constructor() {
    super();
    this.state = initialState;
  }

  onTextInputChange = event => {
    const { value } = event.target
    this.setState({ ...this.state, textInput: value})
    console.log(this.state);
  }



  resetForm = () => this.setState({ ...this.state, textInput: ' '})
  setResponseError = err => this.setState({ ...this.state, error: err.response.data.message })



  postTodo = () => {
    axios.post(URL, { name: this.state.textInput })
      .then(res => {
        this.setState({ ...this.state, quotes: this.state.todos.concat(res.data.data) })
        this.resetForm()
        this.fetchAllTodos()
      })
      .catch(err => {
        this.setResponseError()
      })
  }


  onSubmit = event => {
    event.preventDefault()
    this.postTodo()
  }


  fetchAllTodos = () => {
    axios.get(URL)
    .then(res => {
      this.setState({...this.state, todos: res.data.data})
      console.log(res.data.data);
    })
    .catch(this.setResponseError)
      //debugger
  }

  toggleCompleted = id => () =>{
    axios.patch(`${URL}/${id}`)
    .then(res => {this.setState({
       ...this.state, todos: this.state.todos.map(todo => {
         if (todo.id !== id) return todo
         return res.data.data
      })
    })
  })
    .catch(this.setResponseError)
}


  toggleFinished = () => {
    this.setState({ ...this.state, display: !this.state.display })
  }

  componentDidMount() {
    this.fetchAllTodos()
  }

  render() {
    return (
        <div>
          <div id="error">{this.state.error}</div>
          <TodoList
          display={this.state.display}
          toggleCompleted={this.toggleCompleted}
          todos={this.state.todos}
          />
          <Form
          onTextInputChange={this.onTextInputChange}
          toggleFinished={this.toggleFinished}
          onSubmit={this.onSubmit}
          display={this.state.display}
          textInput={this.state.textInput}
          />
        </div>
    )

  }
}
