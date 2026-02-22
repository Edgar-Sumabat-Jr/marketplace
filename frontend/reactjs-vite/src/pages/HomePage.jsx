import React, { useState, useEffect } from 'react'

import { Row, Col, Container } from 'react-bootstrap'

import axios from 'axios'

// import products from '../products'

// components
import Product from '../components/Product'


import { useDispatch, useSelector } from 'react-redux'
import { listProducts } from '../actions/productActions'


import Loader from '../components/Loader'
import Message from '../components/Message'

function HomePage() {
  const dispatch = useDispatch()
  const productList = useSelector(state => state.productList)
  const { error, loading, products } = productList
  useEffect(() => {
    dispatch(listProducts())
  }, [])

  return (
    <div>
      HomePage

      <Container>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          Array.isArray(products) && products.length > 0 ? (
            <Row>
              {products.map((product) => (
                <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                  <Product product={product} />
                </Col>
              ))}
            </Row>
          ) : (
            <h3>No products available</h3>
          )
        )}
      </Container>

    </div>
  )
}

export default HomePage