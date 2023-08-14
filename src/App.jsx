import React from 'react';
import ReactDOM from 'react-dom/client';
import { Container, Row, Col } from "reactstrap";
import ToDoList from './components/ToDoList';

function App() {
  return (
    <>
      <React.StrictMode>

        <Container fluid className='d-flex min-vh-100 flex-column'>
          <Row className='p-4 bg-dark text-white'>
            <h3>To-Do List Using React</h3>
          </Row>
          
          <Row className='row flex-grow-1 align-items-center p-5' style={{background: "#d6d6d2"}}>
            <Col className='p-0'>
              <ToDoList></ToDoList>
            </Col>
          </Row>

          <Row className='p-3 bg-dark text-center text-white'>
                    <Col xs="12">
                        Made with ❤️ by Ryan Daniels
                    </Col>
                </Row>
        </Container>

      </React.StrictMode>
    </>
  )
}

export default App
