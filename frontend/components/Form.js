import React from 'react'

export default class Form extends React.Component {
  render() {

    return(
      <div>
        <form onSubmit={this.props.onSubmit}>
          <input
            value={this.props.textInput}
            onChange={this.props.onTextInputChange}
            type="text"
            placeholder="Add Task"/>
          <input
            type="submit"/>
        </form>
        <button
          onClick={this.props.toggleFinished}
          >{this.props.display ? "hide" : "show"} Clear Finished Tasks
        </button>
      </div>
    )
  }
}
