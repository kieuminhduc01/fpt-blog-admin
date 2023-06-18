export const convertLinkForMarkdown = (title, link) => {
  const updatedLink = link.replace(/\\/g, '/')
  const fileName = updatedLink.split('/').pop()
  const encodedFileName = encodeURIComponent(fileName)
  const baseUrl = `${process.env.REACT_APP_API_URL}ContentImage/`
  const finalLink = baseUrl + encodedFileName
  return `![${title}](${finalLink})`
}
