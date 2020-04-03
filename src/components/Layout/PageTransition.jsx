import React from 'react'
import {
  TransitionGroup,
  Transition as ReactTransition,
} from 'react-transition-group'

const timeout = 125
const getTransitionStyles = {
  entering: {
    position: `absolute`,
    opacity: 0,
    transform: 'translateY(10px)',
  },
  entered: {
    transition: `all ${timeout}ms ease-in-out`,
    opacity: 1,
    transform: 'translateY(0)',
  },
  exiting: {
    transition: `all ${timeout}ms ease-in-out`,
    opacity: 0,
    transform: 'translateY(10px)',
  },
}

class Transition extends React.PureComponent {
  render() {
    const { children, location } = this.props

    return (
      <TransitionGroup className="flex-1">
        <ReactTransition
          key={location.pathname}
          timeout={{
            enter: timeout,
            exit: timeout,
          }}
        >
          {(status) => (
            <div
              style={{
                ...getTransitionStyles[status],
              }}
            >
              {children}
            </div>
          )}
        </ReactTransition>
      </TransitionGroup>
    )
  }
}

export default Transition
