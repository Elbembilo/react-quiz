import Layout from "./hoc/Layout/layout";
import Quiz from "./Containers/Quiz/Quiz"
import {Route, Switch} from 'react-router-dom'
import Auth from './Containers/Auth/Auth'
import QuizCreator from "./Containers/QuizCreator/QuizCreator";
import QuizList from "./Containers/QuizList/QuizList";



function App() {
  return (
   <Layout>
        <Switch>
            <Route path='/auth' component={Auth}/>
            <Route path='/quiz-creator' component={QuizCreator}/>
            <Route path='/quiz/:id' component={Quiz}/>
            <Route path='/' component={QuizList}/>
        </Switch>
   </Layout>
  );
}

export default App;
