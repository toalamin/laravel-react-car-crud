import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes,  Route,  Link, } from "react-router-dom";

import Home from './Home';
import Contact from './Contact';
import List from './car/List';
import Create from './car/Create';
import HeaderMenu from './layouts/HeaderMenu';


class Header extends React.Component {

state = {
    PUBLIC_URL: "/",
  };

	

  render() {



    return (
    	<Router>
    	<HeaderMenu/>
         <Routes>
         
             <Route path={`${this.state.PUBLIC_URL}`} element={<List/>} />
             <Route path={`${this.state.PUBLIC_URL}`} element={<List/>} />
             <Route path={`${this.state.PUBLIC_URL}create`} element={<Create/>} />
          
                />
          </Routes>
    	</Router>



    	)
  }
}


export default Header;




