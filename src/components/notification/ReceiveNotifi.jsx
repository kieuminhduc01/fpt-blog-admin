import { HubConnectionBuilder } from '@microsoft/signalr'
import { message, notification } from 'antd'
import { GetPagingNotification } from 'api/notificationAPI'
import { BASE_URL } from 'api/request'
import { notiFyContentAtom } from 'components/atom/store'
import { useAtom } from 'jotai'
import { memo, useEffect, useState } from 'react'
import { formatDate } from 'utils/formatDate'

const PERPAGE = 1
const CURRENTPAGE = 1

const ReceiveNotifi = ({ update }) => {
  const [connection, setConnection] = useState()
  const [, setNotifyContent] = useAtom(notiFyContentAtom)
  useEffect(() => {
    const connect = new HubConnectionBuilder()
      .withUrl(`${BASE_URL}notificationHub`)
      .withAutomaticReconnect()
      .build()

    setConnection(connect)
  }, [])

  useEffect(() => {
    if (connection) {
      connection
        .start()
        .then(() => {
          connection.on('ReceiveMsg', (Message) => {
            notification.open({
              description: Message,
            })
            const dataReq = {
              perPage: PERPAGE,
              currentPage: CURRENTPAGE,
            }
            GetPagingNotification(dataReq)
              .then((res) => {
                const dataRes = res.data.result
                update(dataRes.totalUnreaded)
                const newDataFormatDate = dataRes.items.map((item) => ({
                  ...item,
                  created: formatDate(item.created),
                }))
                setNotifyContent((pre) => [...newDataFormatDate, ...pre])
              })
              .catch((err) => {
                message.error(err)
              })
          })
        })
        .catch((error) => console.log(error))
    }
  }, [connection])

  return <></>
}

export default memo(ReceiveNotifi)
