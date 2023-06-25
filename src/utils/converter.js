export const convertImageLinkForMarkdown = (title, link) => {
  const updatedLink = link.replace(/\\/g, '/')
  const fileName = updatedLink.split('/').pop()
  const encodedFileName = encodeURIComponent(fileName)
  const baseUrl = `${process.env.REACT_APP_API_URL}ContentImage/`
  const finalLink = baseUrl + encodedFileName
  return `\n\n![${title}](${finalLink})\n\n`
}

export const generateTableMarkdownTemplate = (columns, rows) => {
  let markdown = ''

  // Generate header row
  markdown += '|'
  for (let i = 0; i < columns; i++) {
    markdown += ` header |`
  }
  markdown += '\n'

  // Generate header separator row
  markdown += '|'
  for (let i = 0; i < columns; i++) {
    markdown += ' --- |'
  }
  markdown += '\n'

  // Generate data rows
  for (let row = 0; row < rows; row++) {
    markdown += '|'
    for (let col = 0; col < columns; col++) {
      markdown += ' data |'
    }
    markdown += '\n'
  }

  return markdown
}
