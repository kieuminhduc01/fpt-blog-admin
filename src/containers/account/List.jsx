import { Breadcrumb, Input } from 'antd'
import DCard from 'components/Base/DCard'
import { Link } from 'react-router-dom'
import AccountTable from 'containers/account/components/AccountTable'
import { useEffect, useState } from 'react'
import { apiAccountPaging } from 'api/accountAPI'

const AccountListBreadcrumb = () => {
  return (
    <Breadcrumb
      style={{ margin: '16px 0' }}
      items={[
        {
          title: <Link to="/">Danh sách người đăng ký</Link>,
        },
      ]}
    />
  )
}

const AccountListContainer = () => {
  const DEFAULT_PAGE = 1
  const PER_PAGE = 5

  const [accounts, setAccounts] = useState({
    perPage: PER_PAGE,
    currentPage: DEFAULT_PAGE,
    keyWord: '',
    rows: [],
  })

  const [loading, setLoading] = useState(false)

  const callApiAccountPaging = (query) => {
    setLoading(true)

    const data = {
      perPage: query.perPage,
      currentPage: query.currentPage,
      keyWord: query.keyWord,
    }

    apiAccountPaging(data)
      .then((res) => {
        const rows = res.data.result.items.map((item) => ({
          key: item.id,
          name: item.name,
          userName: item.userName,
          email: item.email,
          linkWeb: item.linkWeb,
        }))

        console.log('res.data.result.total', res.data.result.total)
        setAccounts((pre) => ({ ...pre, rows, total: res.data.result.total }))
      })
      .finally(() => setLoading(false))
  }

  const handleChangePage = (value) => {
    const newAccountsSate = { ...accounts, currentPage: value }
    setAccounts(newAccountsSate)

    callApiAccountPaging(newAccountsSate)
  }

  const handleSearch = (value) => {
    const newAccountsSate = { ...accounts, keyWord: value.trim(), currentPage: DEFAULT_PAGE }
    setAccounts(newAccountsSate)

    callApiAccountPaging(newAccountsSate)
  }

  useEffect(() => {
    callApiAccountPaging(accounts)
  }, [])

  return (
    <>
      <AccountListBreadcrumb />
      <DCard>
        <Input.Search
          allowClear
          placeholder="Nhập từ khóa"
          onSearch={handleSearch}
          style={{ width: 200 }}
        />
        <AccountTable
          loading={loading}
          rows={accounts?.rows ?? []}
          total={accounts.total}
          current={accounts.currentPage}
          onChangePage={handleChangePage}
        />
      </DCard>
    </>
  )
}

export default AccountListContainer
