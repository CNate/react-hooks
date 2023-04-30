import * as React from 'react'

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = {error: null}
  }

  static getDerivedStateFromError(error) {
    console.log(error)
    return {error}
  }

  render() {
    if (this.state.error) {
      return (
        <>
          <h2>Error:</h2>
          <label>{this.state.error.message}</label>
        </>
      )
    }

    return this.props.children
  }
}
