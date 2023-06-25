import { useRef, useState } from 'react'

import ReactCrop, { centerCrop, makeAspectCrop } from 'react-image-crop'
import { useDebounceEffect } from './useDebounceEffect'

import 'react-image-crop/dist/ReactCrop.css'
import { canvasPreview } from './canvaPreview'
import { apiFileCoverImage } from 'api/fileAPI'
import { Button, Space, message } from 'antd'

function centerAspectCrop(mediaWidth, mediaHeight, aspect) {
  return centerCrop(
    makeAspectCrop(
      {
        unit: '%',
        width: 90,
      },
      aspect,
      mediaWidth,
      mediaHeight,
    ),
    mediaWidth,
    mediaHeight,
  )
}

const ASPECT = 4 / 5
const SCALE = 1
const ROTATE = 0

const ImageCrop = ({ onSubmit }) => {
  const [imgSrc, setImgSrc] = useState('')
  const previewCanvasRef = useRef(null)
  const imgRef = useRef(null)
  const blobUrlRef = useRef('')
  const [crop, setCrop] = useState()
  const [completedCrop, setCompletedCrop] = useState()
  const [messageApi, contextHolder] = message.useMessage()

  function onSelectFile(e) {
    if (e.target.files && e.target.files.length > 0) {
      setCrop(undefined) // Makes crop preview update between images.
      const reader = new FileReader()
      reader.addEventListener('load', () => setImgSrc(reader.result?.toString() || ''))
      reader.readAsDataURL(e.target.files[0])
    }
  }

  function onImageLoad(e) {
    if (ASPECT) {
      const { width, height } = e.currentTarget
      setCrop(centerAspectCrop(width, height, ASPECT))
    }
  }

  function onDownloadCropClick() {
    if (!previewCanvasRef.current) {
      throw new Error('Crop canvas does not exist')
    }

    previewCanvasRef.current.toBlob((blob) => {
      if (!blob) {
        throw new Error('Failed to create blob')
      }
      if (blobUrlRef.current) {
        URL.revokeObjectURL(blobUrlRef.current)
      }
      blobUrlRef.current = URL.createObjectURL(blob)

      var file = new File([blob], '.png')
      const formData = new FormData()
      formData.append('file', file)

      apiFileCoverImage(formData)
        .then((res) => onSubmit(res?.data?.result.src))
        .catch((err) => {
          messageApi.open({
            type: 'error',
            content: err?.response?.data?.Detail,
          })
        })
    })
  }

  useDebounceEffect(
    async () => {
      if (
        completedCrop?.width &&
        completedCrop?.height &&
        imgRef.current &&
        previewCanvasRef.current
      ) {
        // We use canvasPreview as it's much faster than imgPreview.
        canvasPreview(imgRef.current, previewCanvasRef.current, completedCrop, SCALE, ROTATE)
      }
    },
    100,
    [completedCrop, SCALE, ROTATE],
  )

  return (
    <>
      {contextHolder}
      <Space direction="vertical">
        <input type="file" accept="image/*" onChange={onSelectFile} />
        {!!imgSrc && (
          <ReactCrop
            crop={crop}
            onChange={(_, percentCrop) => setCrop(percentCrop)}
            onComplete={(c) => setCompletedCrop(c)}
            aspect={ASPECT}
          >
            <img
              width={300}
              ref={imgRef}
              alt="Crop me"
              src={imgSrc}
              style={{ transform: `scale(${SCALE}) rotate(${ROTATE}deg)` }}
              onLoad={onImageLoad}
            />
          </ReactCrop>
        )}
        {!!completedCrop && (
          <>
            <div style={{ display: 'none' }}>
              <canvas
                ref={previewCanvasRef}
                style={{
                  border: '1px solid black',
                  objectFit: 'contain',
                  width: completedCrop.width,
                  height: completedCrop.height,
                }}
              />
            </div>
            <div>
              <Button onClick={onDownloadCropClick}>Đăng tải</Button>
            </div>
          </>
        )}
      </Space>
    </>
  )
}

export default ImageCrop
