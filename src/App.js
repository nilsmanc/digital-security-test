import { CurrencyInput } from './CurrencyInput'
import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'

function App() {
  const [amountFrom, setAmountFrom] = useState(1)
  const [amountTo, setAmountTo] = useState(1)
  const [currencyFrom, setCurrencyFrom] = useState('USD')
  const [currencyTo, setCurrencyTo] = useState('EUR')
  const [rates, setRates] = useState([])

  useEffect(() => {
    axios
      .get('https://api.apilayer.com/fixer/latest?base=USD&apikey=vxc9aAtpVA6uSmfQl4HvpJEP6dBPpJnm')
      .then((response) => {
        setRates(response.data.rates)
      })
  }, [])

  useEffect(() => {
    if (!!rates) {
      handleAmountFromChange(1)
    }
  }, [rates])

  const format = (number) => {
    return number.toFixed(4)
  }

  const handleAmountFromChange = (amountFrom) => {
    setAmountTo(format((amountFrom * rates[currencyTo]) / rates[currencyFrom]))
    setAmountFrom(amountFrom)
  }

  const handleCurrencyFromChange = (currencyFrom) => {
    setAmountTo(format((amountFrom * rates[currencyTo]) / rates[currencyFrom]))
    setCurrencyFrom(currencyFrom)
  }

  const handleAmountToChange = (amountTo) => {
    setAmountFrom(format((amountTo * rates[currencyFrom]) / rates[currencyTo]))
    setAmountTo(amountTo)
  }

  const handleCurrencyToChange = (currencyTo) => {
    setAmountFrom(format((amountTo * rates[currencyFrom]) / rates[currencyTo]))
    setCurrencyTo(currencyTo)
  }

  return (
    <div>
      <h1>Currency converter</h1>
      <CurrencyInput
        onAmountChange={handleAmountFromChange}
        onCurrencyChange={handleCurrencyFromChange}
        currencies={Object.keys(rates)}
        amount={amountFrom}
        currency={currencyFrom}
      />
      <CurrencyInput
        onAmountChange={handleAmountToChange}
        onCurrencyChange={handleCurrencyToChange}
        currencies={Object.keys(rates)}
        amount={amountTo}
        currency={currencyTo}
      />
    </div>
  )
}

export default App
