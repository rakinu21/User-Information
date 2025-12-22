
import './App.css'
import {createBrowserRouter , RouterProvider} from 'react-router-dom';
import { Users } from './pages/Users';
import { Create } from './pages/Create';
import { Update } from './pages/Update';
import { SingleUser } from './pages/SingleUser';


const router = createBrowserRouter ([

  {
    path:'/',
    element : <Users/>
  },
    {
    path:'/create',
    element : <Create/>
  },
    {
    path:'/:id',
    element : <Update/>
  },
    {
    path:'/:id',
    element : <SingleUser/>
  },

])

function App() {
 

  return (
     <div className="app">
       <RouterProvider router={router}/>
     </div>
  )
}

export default App
