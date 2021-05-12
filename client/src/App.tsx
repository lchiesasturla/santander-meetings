import { FunctionComponent } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import AuthState from './context/auth/AuthState';
import AuthPage from './pages/auth/AuthPage';
import MainPage from './pages/meetings/MainPage';
import MeetingCreatePage from './pages/meetings/MeetingCreatePage';
import MeetingDetailPage from './pages/meetings/MeetingDetailPage';
import MeetingState from './context/meetings/MeetingState';

const App: FunctionComponent = () => {
  return (
    <MeetingState>
      <AuthState>
        <Router>
          <Switch>
            <Route exact path="/" component={AuthPage} />
            <Route exact path="/home" component={MainPage} />
            <Route exact path="/meeting/create" component={MeetingCreatePage} />
            <Route exact path="/meeting/detail/:id" component={MeetingDetailPage} />
          </Switch>
        </Router>
      </AuthState>
    </MeetingState>
  );
}

export default App;
