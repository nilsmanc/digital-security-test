import { CurrencyInput } from './CurrencyInput'
import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'

function App() {
  const [amountFrom, setAmountFrom] = useState(1)
  const [amountTo, setAmountTo] = useState(1)
  const [currencyFrom, setCurrencyFrom] = useState('USD')
  const [currencyTo, setCurrencyTo] = useState('USD')
  const [rates, setRates] = useState([])

  useEffect(() => {
    axios
      .get('https://api.apilayer.com/fixer/latest?base=USD&apikey=vxc9aAtpVA6uSmfQl4HvpJEP6dBPpJnm')
      .then((response) => {
        setRates(response.data.rates)
      })
  }, [])
  return (
    <div>
      <CurrencyInput
        onAmountChange={setAmountFrom}
        onCurrencyChange={setCurrencyFrom}
        currencies={Object.keys(rates)}
        amount={amountFrom}
        currency={currencyFrom}
      />
      <CurrencyInput
        onAmountChange={setAmountTo}
        onCurrencyChange={setCurrencyTo}
        currencies={Object.keys(rates)}
        amount={amountTo}
        currency={currencyTo}
      />
    </div>
  )
}

export default App
