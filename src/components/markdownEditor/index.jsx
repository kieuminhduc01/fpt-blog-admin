// import react, react-markdown-editor-lite, and a markdown parser you like
import ImagePlugin from 'components/markdownEditor/plugins/imagePlugin'
import MarkdownIt from 'markdown-it'
import insert from 'markdown-it-ins'
import { useEffect, useRef, useState } from 'react'
import ReactMarkdownEditorLite from 'react-markdown-editor-lite'
import 'react-markdown-editor-lite/lib/index.css'
import { convertLinkForMarkdown } from 'utils/converter'
import { subscribe, unsubscribe } from 'utils/event'
import ImageModal from './modals/imageModal'
import MarkdownEditorWrapper from 'components/markdownEditor/MarkdownEditor.styled'

ReactMarkdownEditorLite.use(ImagePlugin)
const plugins = [
  'header',
  'font-bold',
  'font-italic',
  'font-underline',
  'font-strikethrough',
  'list-unordered',
  'list-ordered',
  'block-quote',
  'block-wrap',
  'table',
  'd-image',
  'link',
  'clear',
  'logger',
  'mode-toggle',
  'full-screen',
  'tab-insert',
]

const mdParser = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
  highlight(str, lang) {},
}).use(insert)

export default function Editor({ disabled, value, onChange }) {
  const [openModal, setOpenModal] = useState(false)
  const editorRef = useRef()
  useEffect(() => {
    subscribe('openImageModal', (_) => {
      setOpenModal(true)
    })
    return () => {
      unsubscribe('openImageModal')
    }
  }, [])

  const onEditorChange = ({ html, text }) => {
    console.log('handleEditorChange', html, text)
    onChange(text)
  }

  return (
    <MarkdownEditorWrapper disabled={disabled}>
      <ReactMarkdownEditorLite
        value={value}
        onChange={onEditorChange}
        style={{ height: '600px' }}
        ref={editorRef}
        plugins={plugins}
        renderHTML={(text) => mdParser.render(text)}
      />
      {openModal && (
        <ImageModal
          onCancel={() => {
            setOpenModal(false)
          }}
          onSubmit={(value) => {
            editorRef.current.insertText(convertLinkForMarkdown(value.title, value.link))
            setOpenModal(false)
          }}
        />
      )}
    </MarkdownEditorWrapper>
  )
}
