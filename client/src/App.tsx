import {FunctionComponent} from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import AuthPage from './pages/auth/AuthPage';
import MainPage from './pages/meetings/MainPage';
import MeetingCreatePage from './pages/meetings/MeetingCreatePage';
import MeetingDetailPage from './pages/meetings/MeetingDetailPage';

const App: FunctionComponent = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={AuthPage} />
        <Route exact path="/home" component={MainPage} />
        <Route exact path="/meeting/create" component={MeetingCreatePage} />
        <Route exact path="/meeting/detail" component={MeetingDetailPage} />
      </Switch>
    </Router>
  );
}

export default App;
