import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'

import '../styles/footer.css'

function Footer() {
  return (
    <footer className='custom-footer shadow-lg'>
        <Container>
            <Row>
                <Col className='text-center py-4'>
                    Copyright &copy; Ecommerce
                </Col>
            </Row>
        </Container>
    </footer>
  )
}

export default Footer