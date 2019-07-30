import React from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import './App.css';
import Start from './Components/StartingPage/Start.js';
import SignUp from './Components/SignUp/SignUp.js';
import SignIn from './Components/SignIn/SignIn.js';
import ControllerProfile from './Components/ProfilePage/ControllerProfile.js';
import ControllerWeeklyGoal from './Components/Goal/ControllerWeeklyGoal.js';
import ControllerAdminPage from './Components/AdminPage/ControllerAdminPage.js';
import ControllerQuiz from './Components/Quiz/ControllerQuiz.js';
import NotFound from './Components/NotFound/NotFound';

function App() {
  return (
    <div>
      
<Router basename={'/'}>  
  <Route exact path= {process.env.PUBLIC_URL + "/"} component={Start} />
  <Route path={`${process.env.PUBLIC_URL}/signup`} component={SignUp} />
  <Route path={`${process.env.PUBLIC_URL}/signin`} component={SignIn} />
  <Route path={`${process.env.PUBLIC_URL}/quiz`} component={ControllerQuiz} />
  <Route path={`${process.env.PUBLIC_URL}/myProfile`} component={ControllerProfile} />
  <Route path={`${process.env.PUBLIC_URL}/weekly_goal`} component={ControllerWeeklyGoal} />
  <Route path={`${process.env.PUBLIC_URL}/monthly_goal`} component={ControllerWeeklyGoal} />
  <Route path={`${process.env.PUBLIC_URL}/annual_goal`} component={ControllerWeeklyGoal} />
  <Route path={`${process.env.PUBLIC_URL}/adminPage`} component={ControllerAdminPage} />
  <Route path={`${process.env.PUBLIC_URL}/404`} component={NotFound} />
</Router>  
    </div>
  );
}

export default App;