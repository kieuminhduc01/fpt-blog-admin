import { Badge, Button, message } from 'antd'
import { GetPagingNotification } from 'api/notificationAPI'
import { notiFyContentAtom } from 'components/atom/store'
import { useAtom } from 'jotai'
import { useEffect, useState } from 'react'
import { formatDate } from 'utils/formatDate'

const PERPAGE = 10

const NotifiContent = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [notifyContent, setNotifyContent] = useAtom(notiFyContentAtom)
  const handleClickNotify = (link) => {
    window.location.href = `${process.env.REACT_APP_CLIENT_URL}${link}`
  }
  const callApi = () => {
    const dataReq = {
      perPage: PERPAGE,
      currentPage: currentPage,
    }
    GetPagingNotification(dataReq)
      .then((res) => {
        const dataRes = res.data.result.items
        const newData = dataRes.map((item) => ({
          ...item,
          created: formatDate(item.created),
        }))
        if (dataRes.length > 0) {
          setNotifyContent((prevNotifyContent) => [
            ...prevNotifyContent,
            ...newData,
          ])
        }
        setCurrentPage((pre) => pre + 1)
      })
      .catch((err) => {
        message.error(err)
      })
  }
  useEffect(() => {
    callApi()
  }, [])

  const handleClickReadMore = () => {
    callApi()
  }
  return (
    <>
      <div
        style={{
          width: '300px',
          maxHeight: '82vh',
          overflowY: 'auto',
        }}
      >
        {notifyContent.map((item, index) => {
          return (
            <div
              key={index}
              onClick={() => handleClickNotify(item.link)}
              style={{ cursor: 'pointer' }}
            >
              <div style={{ fontSize: '15px' }}>{item.content}</div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div style={{ fontSize: '13px', color: 'gray' }}>
                  {item.created}
                </div>
                <Badge color={item.isRead ? '#fff' : 'red'}></Badge>
              </div>
              <hr style={{ margin: '10px 0px 10px 0px' }} />
            </div>
          )
        })}
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Button type="primary" onClick={handleClickReadMore}>
            Xem thêm
          </Button>
        </div>
      </div>
    </>
  )
}

export default NotifiContent
