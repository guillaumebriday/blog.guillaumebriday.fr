import React, { Component } from 'react'
import Carousel, { Modal, ModalGateway } from 'react-images'
import Img from 'gatsby-image'

export default class extends Component {
  state = {
    selectedIndex: 0,
    lightboxIsOpen: false,
  }

  toggleLightbox = (selectedIndex) => {
    this.setState((state) => ({
      lightboxIsOpen: !state.lightboxIsOpen,
      selectedIndex,
    }))
  }

  renderGallery() {
    const { images } = this.props

    if (!images) return

    const gallery = images.map((obj, i) => {
      return (
        <article key={i}>
          <div
            className="inline cursor-pointer"
            onClick={() => this.toggleLightbox(i)}
            onKeyDown={() => this.toggleLightbox(i)}
            role="button"
            tabIndex="0"
          >
            <Img fluid={obj.fluid} />
          </div>
        </article>
      )
    })

    return <>{gallery}</>
  }

  render() {
    const { images } = this.props
    const { selectedIndex, lightboxIsOpen } = this.state

    return (
      <>
        <div className="gallery-wrapper">{this.renderGallery()}</div>

        <ModalGateway>
          {lightboxIsOpen ? (
            <Modal onClose={this.toggleLightbox}>
              <Carousel
                currentIndex={selectedIndex}
                frameProps={{ autoSize: 'height' }}
                views={images}
                styles={{
                  view: (base) => ({
                    ...base,
                    alignItems: 'center',
                    display: 'flex ',
                    height: 'calc(100vh - 54px)',
                    justifyContent: 'center',
                    '& > img': {
                      maxHeight: 'calc(100vh - 94px)',
                    },
                  }),
                }}
              />
            </Modal>
          ) : null}
        </ModalGateway>
      </>
    )
  }
}
