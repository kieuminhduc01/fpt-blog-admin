import { PluginComponent } from 'react-markdown-editor-lite'
import { publish } from 'utils/event'

export default class Link extends PluginComponent {
  static pluginName = 'd-link'
  static align = 'left'
  static defaultConfig = {}

  constructor(props) {
    super(props)

    this.handleClick = this.handleClick.bind(this)
  }

  handleClick() {
    publish(`openLinkModal`, 'null')
    // this.editor.insertText(
    //   '![Stormtroopocat](https://octodex.github.com/images/stormtroopocat.jpg "The Stormtroopocat")',
    // )
  }

  render() {
    return (
      <span className="button button-type-counter" title="link" onClick={this.handleClick}>
        <i className="rmel-iconfont rmel-icon-link"></i>
      </span>
    )
  }
}
