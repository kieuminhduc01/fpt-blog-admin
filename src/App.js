import './App.css'
import { Route, Routes } from 'react-router-dom'
import AccountListPage from 'pages/Account/list'
import PostDetailPage from 'pages/Post/detail'
import CommonSetupPage from 'pages/SettingUp/commonSetup'
import PostListPage from 'pages/Post/list'
import PostCreatePage from 'pages/Post/create'

function App() {
  return (
    <Routes>
      <Route path="/a" element={<AccountListPage />} />
      <Route path="/setup" element={<CommonSetupPage />} />
      <Route path="/post" element={<PostListPage />} />
      <Route path="/post/create" element={<PostCreatePage />} />
      <Route path="/post/:slug" element={<PostDetailPage />} />
      <Route path="/setting" element={<CommonSetupPage />} />
    </Routes>
  )
}

export default App
