// import react, react-markdown-editor-lite, and a markdown parser you like
import ImagePlugin from 'components/markdownEditor/plugins/imagePlugin'
import LinkPlugin from 'components/markdownEditor/plugins/linkPlugin'
import TablePlugin from 'components/markdownEditor/plugins/tablePlugin'
import MarkdownIt from 'markdown-it'
import insert from 'markdown-it-ins'
import { useEffect, useRef, useState } from 'react'
import ReactMarkdownEditorLite from 'react-markdown-editor-lite'
import 'react-markdown-editor-lite/lib/index.css'
import { convertImageLinkForMarkdown, generateTableMarkdownTemplate } from 'utils/converter'
import { subscribe, unsubscribe } from 'utils/event'
import ImageModal from 'components/markdownEditor/modals/imageModal'
import MarkdownEditorWrapper from 'components/markdownEditor/MarkdownEditor.styled'
import LinkModal from 'components/markdownEditor/modals/linkModal'
import TableModal from 'components/markdownEditor/modals/tableModal'

ReactMarkdownEditorLite.use(ImagePlugin)
ReactMarkdownEditorLite.use(LinkPlugin)
ReactMarkdownEditorLite.use(TablePlugin)
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
  'd-table',
  'd-image',
  'd-link',
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

mdParser.renderer.rules.image = (tokens, idx, options, env, self) => {
  const token = tokens[idx]
  const src = token.attrs[token.attrIndex('src')][1]
  const alt = token.content

  return `<img src="${src}" alt="${alt}" /><span class="centered-sub">${alt}</span>`
}

export default function Editor({ disabled, value, onChange }) {
  const [openImageModal, setOpenImageModal] = useState(false)
  const [openLinkModal, setOpenLinkModal] = useState(false)
  const [openTableModal, setOpenTableModal] = useState(false)

  const editorRef = useRef()
  useEffect(() => {
    subscribe('openImageModal', (_) => {
      setOpenImageModal(true)
    })
    subscribe('openLinkModal', (_) => {
      setOpenLinkModal(true)
    })
    subscribe('openTableModal', (_) => {
      setOpenTableModal(true)
    })
    return () => {
      unsubscribe('openImageModal')
      unsubscribe('openLinkModal')
      unsubscribe('openTableModal')
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
      {openImageModal && (
        <ImageModal
          onCancel={() => {
            setOpenImageModal(false)
          }}
          onSubmit={(value) => {
            editorRef.current.insertText(convertImageLinkForMarkdown(value.title, value.link))
            setOpenImageModal(false)
          }}
        />
      )}
      {openLinkModal && (
        <LinkModal
          onCancel={() => {
            setOpenLinkModal(false)
          }}
          onSubmit={(value) => {
            editorRef.current.insertText(`[${value.title}](${value.link})`)
            setOpenLinkModal(false)
          }}
        />
      )}
      {openTableModal && (
        <TableModal
          onCancel={() => {
            setOpenTableModal(false)
          }}
          onSubmit={(value) => {
            editorRef.current.insertText(generateTableMarkdownTemplate(value.column, value.row))
            setOpenTableModal(false)
          }}
        />
      )}
    </MarkdownEditorWrapper>
  )
}
