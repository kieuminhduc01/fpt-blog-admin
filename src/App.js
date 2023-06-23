import './App.css'
import { Route, Routes } from 'react-router-dom'
import AccountListPage from 'pages/Account/list'
import PostDetailPage from 'pages/Post/detail'
import CommonSetupPage from 'pages/SettingUp/commonSetup'
import PostListPage from 'pages/Post/list'
import PostCreatePage from 'pages/Post/create'
import LoginPage from 'pages/Auth/login'
import HeaderFooterLayout from 'layouts/HeaderFooterLayout'
import PrivateRoute from 'router/privateRouter'
import ChangePassPage from 'pages/Auth/changePass'
import ResetPassPage from 'pages/Auth/resetPass'

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <PrivateRoute>
            <HeaderFooterLayout>
              <AccountListPage />
            </HeaderFooterLayout>
          </PrivateRoute>
        }
      />
      <Route
        path="/post"
        element={
          <PrivateRoute>
            <HeaderFooterLayout>
              <PostListPage />
            </HeaderFooterLayout>
          </PrivateRoute>
        }
      />
      <Route
        path="/post/create"
        element={
          <PrivateRoute>
            <HeaderFooterLayout>
              <PostCreatePage />
            </HeaderFooterLayout>
          </PrivateRoute>
        }
      />
      <Route
        path="/post/:slug"
        element={
          <PrivateRoute>
            <HeaderFooterLayout>
              <PostDetailPage />
            </HeaderFooterLayout>
          </PrivateRoute>
        }
      />
      <Route
        path="/setting"
        element={
          <PrivateRoute>
            <HeaderFooterLayout>
              <CommonSetupPage />
            </HeaderFooterLayout>
          </PrivateRoute>
        }
      />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/changePass" element={<ChangePassPage />} />
      <Route path="/resetPass" element={<ResetPassPage />} />
    </Routes>
  )
}

export default App
