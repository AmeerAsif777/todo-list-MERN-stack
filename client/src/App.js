
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Container } from '@material-ui/core';

// components
import Header from './components/Header';
import TodoForm from './components/TodoForm';
import Todos from './components/Todos';
import Auth from './components/Auth/Auth';
import Navbar from './components/Navbar/Navbar';
import CreateForm from './components/createForm/CreateForm'
import GetForm from './components/getForm/GetForm'
// import Header from './components/header/Header'
import EditForm from './components/editForm/EditForm'

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
      <Routes>
        <Route path="/" exact element={<Auth />} />
        {/*
        <Route path="/home" exact component={Home} /> 
         */}
        <Route path="/home" element={<GetForm />} />
          <Route path="/create" element={<CreateForm />} />
        <Route path="/home/edit/:userId" element={<EditForm />} />
       
      </Routes>
    </Container>
  </BrowserRouter>
);
export default App;
