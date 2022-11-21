 
import { useEffect } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import setAuthToken  from './assets/utils/setAuthToken'
import { loadUser } from './assets/actions/auth'
import PrivateRoute from './assets/components/router/privateRoutes'
import Diners from './assets/components/Diners';
import Home from './assets/components/Home'

//neum components
import NavBar from './assets/components/NavBar'

//

//redux import
import { Provider } from 'react-redux'
import store from './assets/store'
//

const App = () =>  {
 
  if(localStorage.token) {
    setAuthToken(localStorage.token)
  }

  useEffect(() => {
    store.dispatch(loadUser())
  }, [])

  return (
    <div style={{
      backgroundImage: 
      "url('https://freefrontend.com/assets/img/css-triangle-backgrounds/2-triangles-background.png')",
      display: 'flex',
      height:'100vh',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      flexDirection: 'column'}}>
    <Provider store={store} >
      <Router>
      
        {/* <Navbar/> */}
        <NavBar/>
        
        <section className="container">
          <Switch>
            <Route exact path={"/"} component={Home}/>
            <PrivateRoute exact path={"/diners"} component={Diners}/>
          </Switch>
        </section>
        
      </Router>
    </Provider>
    </div>
  )
}

export default App
