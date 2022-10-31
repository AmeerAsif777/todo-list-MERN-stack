
import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Container } from '@material-ui/core';

// components
import Header from './components/Header';
import TodoForm from './components/TodoForm';
import Todos from './components/Todos';
import Auth from './components/Auth/Auth';
import Navbar from './components/Navbar/Navbar';


function Home() {
  return (
    <div>
      <Header />
      <TodoForm />
      <Todos />
    </div>
  );
}
const App = () => (
  <BrowserRouter>
    <Container maxWidth="lg">
      <Navbar />
      <Switch>
      <Route path="/" exact component={Auth} />
        <Route path="/home" exact component={Home} />
      </Switch>
    </Container>
  </BrowserRouter>
);
export default App;
