// import react, react-markdown-editor-lite, and a markdown parser you like
import ImagePlugin from 'components/markdownEditor/plugins/imagePlugin'
import MarkdownIt from 'markdown-it'
import { useEffect, useRef, useState } from 'react'
import ReactMarkdownEditorLite from 'react-markdown-editor-lite'
import 'react-markdown-editor-lite/lib/index.css'
import { subscribe, unsubscribe } from 'utils/event'
import insert from 'markdown-it-ins'
import { Modal } from 'antd'
import ImageModal from './modals/imageModal'

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

export default function Editor() {
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
  return (
    <>
      <ReactMarkdownEditorLite
        style={{ height: '500px' }}
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
            editorRef.current.insertText(`![${value.title}](${value.link})`)
            setOpenModal(false)
          }}
        />
      )}
    </>
  )
}
