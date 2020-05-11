import React, { Component } from 'react'

export default class ScrollIndicator extends Component {
  constructor(props) {
    super(props)

    this.state = { scrolled: 0 }
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll)
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
  }

  handleScroll = () => {
    const height =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight

    this.setState({
      scrolled: (window.scrollY / height) * 100,
    })
  }

  render() {
    return (
      <div className="fixed w-full z-50 top-0 left-0">
        <div
          className="bg-indigo-500 h-1"
          style={{ width: this.state.scrolled + '%' }}
        />
      </div>
    )
  }
}
