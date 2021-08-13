import { VFC, memo } from 'react';
import { Route, Switch } from 'react-router-dom';

import { Home } from '../components/pages/Home';
import { Login } from '../components/pages/Login';
import { Page404 } from '../components/pages/Page404';
import { User } from '../components/pages/User';
import { HeaderLayout } from '../components/templates/HeaderLayout';
import { SignUp } from '../components/pages/SignUp';
import { Archive } from '../components/pages/Archive';


export const Router: VFC = memo(() => {
  return(
    <Switch>
      <Route exact path="/">
        <Login />
      </Route>
      <Route path="/home">
        <HeaderLayout><Home /></HeaderLayout>
      </Route>
      <Route path="/archive">
        <HeaderLayout><Archive /></HeaderLayout>
      </Route>
      <Route path="/signup">
        <SignUp />
      </Route>
      <Route path="/user">
        <HeaderLayout><User /></HeaderLayout>
      </Route>
      <Route path="*">
        <Page404 />
      </Route>
    </Switch>
  );

});
