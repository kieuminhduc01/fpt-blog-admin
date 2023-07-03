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
  p {
    font-size: 18px;
    text-align: justify;
    font-family: 'Lexend', sans-serif;
    @media (min-width: 576px) {
      font-size: 19px;
    }
    @media (min-width: 768px) {
      font-size: 20px;
    }
  }
  li {
    font-size: 18px;
    text-align: justify;
    font-family: 'Lexend', sans-serif;
    @media (min-width: 576px) {
      font-size: 19px;
    }
    @media (min-width: 768px) {
      font-size: 20px;
    }
  }
  img {
    width: 100%;
  }
  pre {
    background-color: rgb(203 203 203 / 55%);
    border-radius: 4px;
    padding: 10px;
  }
  table {
    width: 100%;
  }
  .centered-sub {
    display: flex;
    justify-content: center;
    font-size: 14px;
    margin-top: 8px;
    margin-bottom: 8px;
  }
`

export default MarkdownEditorWrapper
