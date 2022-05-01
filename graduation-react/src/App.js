import React, { Component } from 'react'; 
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from './screens/main_screen';
import Test from './screens/test_screen';
import Report from './screens/report_screen';
import Check from './screens/check_screen';

class App extends Component {
  render() {
    return(
      <div>
        <BrowserRouter>
          <Routes> 
            <Route path="/" element={<Main />}/>
            <Route path="/check" element={<Check />}/>
            <Route path="/test" element={<Test />}/>
            <Route path="/report" element={<Report />}/> 
          </Routes>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
