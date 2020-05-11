import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import { connectAutoComplete } from 'react-instantsearch-dom'
import AutoSuggest from 'react-autosuggest'

class AutoComplete extends Component {
  static propTypes = {
    hits: PropTypes.arrayOf(PropTypes.object).isRequired,
    currentRefinement: PropTypes.string.isRequired,
    refine: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)

    this.state = {
      value: this.props.currentRefinement,
    }
  }

  onChange = (event, { newValue }) => {
    this.setState({
      value: newValue,
    })
  }

  onSuggestionSelected = () => {
    this.setState({
      value: '',
    })
  }

  onSuggestionsFetchRequested = ({ value }) => {
    this.props.refine(value)
  }

  onSuggestionsClearRequested = () => {
    this.props.refine()
  }

  getSuggestionValue(hit) {
    return hit.fields.slug
  }

  renderSuggestion(hit) {
    return <Link to={hit.fields.slug}>{hit.frontmatter.title}</Link>
  }

  renderSectionTitle(section) {
    return section.index
  }

  getSectionSuggestions(section) {
    return section.hits
  }

  render() {
    const { hits } = this.props
    const { value } = this.state

    const inputProps = {
      placeholder: 'Rechercher un article',
      title: 'Rechercher un article',
      onChange: this.onChange,
      value,
    }

    return (
      <AutoSuggest
        suggestions={hits}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        getSuggestionValue={this.getSuggestionValue}
        onSuggestionSelected={this.onSuggestionSelected}
        renderSuggestion={this.renderSuggestion}
        inputProps={inputProps}
        renderSectionTitle={this.renderSectionTitle}
        getSectionSuggestions={this.getSectionSuggestions}
      />
    )
  }
}

export default connectAutoComplete(AutoComplete)
