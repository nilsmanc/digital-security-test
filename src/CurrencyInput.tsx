import PropTypes from 'prop-types'

import './currencyInput.css'

type CurrencyInputProps = {
  onAmountChange: (number: number | string) => void
  onCurrencyChange: (string: string) => void
  currencies: string[]
  amount: number
  currency: string
}

export const CurrencyInput: React.FC<CurrencyInputProps> = (props) => {
  return (
    <div className='group'>
      <input
        type='text'
        value={props.amount}
        onChange={(e) => props.onAmountChange(e.target.value)}
      />
      <select value={props.currency} onChange={(e) => props.onCurrencyChange(e.target.value)}>
        {props.currencies.map((currency) => (
          <option key={currency} value={currency}>
            {currency}
          </option>
        ))}
      </select>
    </div>
  )
}

CurrencyInput.propTypes = {
  amount: PropTypes.number.isRequired,
  currency: PropTypes.string.isRequired,
  currencies: PropTypes.array,
  onAmountChange: PropTypes.func,
  onCurrencyChange: PropTypes.func,
}
