const { styled } = require('styled-components')

const MarkdownEditorWrapper = styled.div`
  .rc-md-editor textarea[name='textarea'] {
    opacity: ${(props) => (props.disabled ? 0.6 : 1)};
    pointer-events: ${(props) => (props.disabled ? 'none' : 'auto')};
  }
  .rc-md-editor .navigation-nav.left {
    opacity: ${(props) => (props.disabled ? 0.6 : 1)};
    pointer-events: ${(props) => (props.disabled ? 'none' : 'auto')};
  }
`

export default MarkdownEditorWrapper
