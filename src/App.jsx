
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './Pages/Home'
import AddTodo from './Pages/AddTodo'
import SingleTodo from './Pages/SingleTodo'
import Update from './Pages/Update'

function App() {

  return (
    <>
     <Routes>
       <Route path='/' element={<Home/>}/>
       <Route path='/add' element={<AddTodo/>}/>
       <Route path='/update/:id' element={<Update/>}/>
       <Route path='/more/:id' element={<SingleTodo/>}/>
     </Routes>
    </>
  )
}

export default App
