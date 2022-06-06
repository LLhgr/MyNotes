import React from 'react'
import Radio from '@mui/material/Radio';

import './style.css'

export default function RadioButton({selectedValue, handleChange}) {

// const [selectedValue, setSelectedValue] = React.useState('');

//   const handleChange = (event) => {
//     setSelectedValue(event.target.value);
//   };

  const controlProps = (item) => ({
    name: 'color-radio-button-demo',
    inputProps: { 'aria-label': item },
  });

  return (
    <div className='radioOptions'>
      <Radio
      checked = {selectedValue === 'all'}
      onChange ={e => handleChange(e.target)}
      value="all"
        {...controlProps('a')}
        sx={{
          color: '#b07fff',
          '&.Mui-checked': {
            color: '#8940ff',
          },
        }}
      />
      <span>Todos</span>
      <Radio
      checked = {selectedValue === 'false'}
      onChange ={e => handleChange(e.target)}
      value="false"
        {...controlProps('b')}
        sx={{
          color: '#b07fff',
          '&.Mui-checked': {
            color: '#8940ff',
          },
        }}
      />
      <span>Normal</span>
      <Radio
      checked = {selectedValue === 'true'}
      onChange ={e => handleChange(e.target)}
      value="true"
        {...controlProps('c')}
        sx={{
          color: '#b07fff',
          '&.Mui-checked': {
            color: '#8940ff',
          },
        }}
      />
      <span>Prioridade</span>
    </div>
  )
}
