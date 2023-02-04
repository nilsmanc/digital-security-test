import { useState, useEffect } from 'react'
import axios from 'axios'

import { CurrencyInput } from './CurrencyInput'

import './App.css'

function App() {
  const [amountFrom, setAmountFrom] = useState<number>(1)
  const [amountTo, setAmountTo] = useState<number>(1)
  const [currencyFrom, setCurrencyFrom] = useState<string>('USD')
  const [currencyTo, setCurrencyTo] = useState<string>('EUR')
  const [rates, setRates] = useState<[]>([])

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

  const format = (number: number) => {
    return +number.toFixed(4)
  }

  const handleAmountFromChange = (amountFrom: number) => {
    setAmountTo(format((amountFrom * rates[currencyTo]) / rates[currencyFrom]))
    setAmountFrom(amountFrom)
  }

  const handleCurrencyFromChange = (currencyFrom: string) => {
    setAmountTo(format((amountFrom * rates[currencyTo]) / rates[currencyFrom]))
    setCurrencyFrom(currencyFrom)
  }

  const handleAmountToChange = (amountTo: number) => {
    setAmountFrom(format((amountTo * rates[currencyFrom]) / rates[currencyTo]))
    setAmountTo(amountTo)
  }

  const handleCurrencyToChange = (currencyTo: string) => {
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
