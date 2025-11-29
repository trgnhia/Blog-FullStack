
import AdminLayout from './components/layouts/AdminLayout';
import HomePage from './pages/home/HomePage';
import BlogCreatePage from './pages/blog/BlogCreatePage';
import './App.css'
import {Routes, Route} from 'react-router'

function App() {

  return (
    <Routes>
      <Route index element={<AdminLayout><HomePage/></AdminLayout>}></Route>
      <Route path="/blogs/create" element={<AdminLayout><BlogCreatePage/></AdminLayout>}></Route>
    </Routes>
  )
}

export default App;
