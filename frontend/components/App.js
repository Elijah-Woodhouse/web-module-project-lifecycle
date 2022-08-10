import React from 'react'
import axios from 'axios'


const URL = 'http://localhost:9000/api/todos'

const initialState = {
    todos: [{
      id: "",
      name: "",
      completed: false,
    }],
    textInput: "",
    error: ""
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

  componentDidMount() {
    this.fetchAllTodos()
  }

  render() {
    return (
        <div>
          <div id="error">{this.state.error}</div>
          <div id="todos">
            <h2>Todos: </h2>
          {
            this.state.todos.map(todo => (
              <div key={todo.id} onClick={this.toggleCompleted(todo.id)}>
              {todo.name} {todo.completed ? "👌😎🥹😇😘🥰" : ""}
              </div>
            ))
          }
          </div>

          <form onSubmit={this.onSubmit}>
            <input value={this.state.textInput} onChange={this.onTextInputChange} type="text" placeholder="Add Task"/>
            <input type="submit"/>
            <button>Clear Finished Tasks</button>
          </form>
        </div>
    )

  }
}
