import React from 'react';
import ReactDOM from 'react-dom';

import Header from './Header';
import Home from './Home';
import Footer from './layouts/Footer';

function App() {
    return (
        <div>
        <br/>
            <Header/>
         
            <Footer/>
        </div>
       
    );
}

export default App;

if (document.getElementById('app')) {
    ReactDOM.render(<App />, document.getElementById('app'));
}
