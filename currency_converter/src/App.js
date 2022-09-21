import './App.css';
import { useState, useEffect } from "react";

import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Form } from 'react-bootstrap'

function App() {
  document.title = `CurrencyConvert`
  const [items, setItems] = useState()
  const [amount, setAmount] = useState()
  const [fromCurrency, setFromCurrency ] = useState()
  const [toCurrency, setToCurrency ] = useState()
  const [convertedAmount, setConvertedAmount] = useState()

  var myHeaders = new Headers();
  myHeaders.append("apikey", "2zRC0Yd8aOB0KRAn2UBzeG8acInDZCFJ");

  var requestOptions = {
      method: 'GET',
      redirect: 'follow',
      headers: myHeaders
     };

  useEffect (()=>{
     function getData(){

         fetch("https://api.apilayer.com/fixer/symbols", requestOptions)
        .then(response => response.json())
        .then(result =>  setItems(result.symbols))
        .catch(error => console.log('error', error));

    }
    getData()

  }, []) //That will ensure the useEffect only runs once.

  useEffect (()=>{
     function getConverter(){

         fetch(`https://api.apilayer.com/fixer/convert?to=${toCurrency}&from=${fromCurrency}&amount=${amount}`, requestOptions)
         .then(response => response.json())
         .then(result => setConvertedAmount(result.result.toFixed(2)))
         .catch(error => console.log('error', error));

    }

    if (amount && fromCurrency && toCurrency){
      console.log('getConverter fun if statemint')
      getConverter()
     }

  }, [amount, fromCurrency, toCurrency])

  return (
  <Container fluid className="ContainerParent">
      <Row className="ContainerChildOne"></Row>
      <Row className="ContainerChildTwo justify-content-center mx-auto Border rounded g-0">
        <Row className="g-0 justify-content-center">
          <Col md="auto">
            <Form.Control type="number" className="form-control-sm" onChange={e => (setAmount(e.target.value))} aria-label="Text input with dropdown button" />
          </Col>
          <Col md="auto">
            {items ?  <select className="no-scroll form-select form-select-sm mb-3 custom-dropdown" onChange={e => (setFromCurrency(e.target.value))} > {Object.keys(items).map(element => <option className="dropdown-item" value={element}>{items[element]}</option>)} </select>:null }
          </Col>
        </Row>
        <Row className="g-0 justify-content-center">
          <Col md="auto">
            <Form.Control readOnly disabled type="number" value={convertedAmount} className="form-control-sm disabled-input" aria-label="Text input with dropdown button" />
          </Col>
          <Col md="auto">
            {items ?  <select className="no-scroll form-select form-select-sm mb-3 custom-dropdown" onChange={e => (setToCurrency( e.target.value))}> {Object.keys(items).map(element => <option className="dropdown-item" value={element}>{items[element]}</option>)} </select>:null}
          </Col>
        </Row>
        <Row>
            {convertedAmount ? <><p className=" text-center mb-0 mt-3 text-muted">{amount} {items[fromCurrency]} equals</p>
                    <h1 className=" text-center display-6">{convertedAmount} {items[toCurrency]}</h1></>: null }
        </Row>
      </Row>
  </Container>

  );
}


export default App;
