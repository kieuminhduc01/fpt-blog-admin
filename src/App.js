import './App.css'
import { Route, Routes } from 'react-router-dom'
import AccountListPage from 'pages/Account/list'
import PostDetailPage from 'pages/Post/detail'

function App() {
  return (
    <Routes>
      <Route path="/a" element={<AccountListPage />} />
      <Route path="/post/:id" element={<PostDetailPage />} />
    </Routes>
  )
}

export default App
