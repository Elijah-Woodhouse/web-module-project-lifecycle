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
    onError: "Your good. No Errors"
}


// export default class Form extends React.Component {
//
//   render() {
//     return (
//       <div>
//
//       </div>
//     )
//   }
// }


export default class App extends React.Component {

  constructor() {
    super();
    this.state = initialState;
  }

  fetchAllTodos = () => {
    axios.get(URL)
    .then(res => {
      this.setState({...this.state, todos: res.data.data})
      console.log(res.data.data);
    })
    .catch(err => {
      debugger
    })
  }

  componentDidMount() {
    this.fetchAllTodos();
  }

  render() {
    return (
        <div>
          <div>{this.state.error}</div>
          <div>Todos:</div>
          <ul>
          {
            this.state.todos.map(todo => (
              <li key={todo.id}>
              {todo.name} <button>Del</button>
              </li>
            ))
          }
          </ul>
          <form>
            <label>
              <input
              type="text"
              />
            </label>
          </form>
          <button>Add Task</button>
        </div>
    )

  }
}
