import React, { Component } from 'react'; 
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from './screens/main/main_screen';
import Test from './screens/test/test_screen';
import Report from './screens/report/report_screen';
import Check from './screens/check/check_screen';
import Guide from './screens/guide/guide_screen';

class App extends Component {
  render() {
    return(
      <div>
        <BrowserRouter>
          <Routes> 
            <Route path="/" element={<Main />}/>
            <Route path="/check" element={<Check />}/>
            <Route path="/guide" element={<Guide />}/>
            <Route path="/test" element={<Test />}/>
            <Route path="/report" element={<Report />}/> 
          </Routes>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
