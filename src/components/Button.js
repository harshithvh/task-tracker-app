import React from 'react'
const Button = ({ color, text, onAdd }) => {
  return <button style={{ backgroundColor: color }} onClick={onAdd} className='btn'>{text}</button>
}

Button.defaultProps = {
    color: 'red'
}

export default Button
