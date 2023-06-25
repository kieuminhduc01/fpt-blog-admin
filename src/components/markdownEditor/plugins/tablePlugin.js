import { publish } from 'utils/event'
import * as React from 'react'
import { PluginComponent } from 'react-markdown-editor-lite'

export default class Table extends PluginComponent {
  static pluginName = 'd-table'
  static align = 'left'
  static defaultConfig = {}

  constructor(props) {
    super(props)

    this.handleClick = this.handleClick.bind(this)
  }

  handleClick() {
    publish(`openTableModal`, 'null')
    // this.editor.insertText(
    //   '![Stormtroopocat](https://octodex.github.com/images/stormtroopocat.jpg "The Stormtroopocat")',
    // )
  }

  render() {
    return (
      <span className="button button-type-counter" title="Table" onClick={this.handleClick}>
        <i className="rmel-iconfont rmel-icon-grid"></i>
      </span>
    )
  }
}
