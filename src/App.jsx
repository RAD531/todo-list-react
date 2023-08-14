import React from 'react';
import ReactDOM from 'react-dom/client';
import AudioPlayer from './components/AudioPlayer';
import { Container, Row, Col } from "reactstrap";

function App() {
  return (
    <>
      <React.StrictMode>

        <Container fluid className='text-center d-flex min-vh-100 flex-column'>
          <Row className='p-4 bg-dark text-white' style={{height: "15vh"}}>
            <h3>Audio Player Using React</h3>
          </Row>
          
          <Row className='row flex-grow-1 align-items-center bg-secondary'>
            <Col className='p-0'>
              <AudioPlayer></AudioPlayer>
            </Col>
          </Row>
        </Container>

      </React.StrictMode>
    </>
  )
}

export default App
