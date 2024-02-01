import React from 'react'

function Checkbox({handleCheckBox,todoCheck}) {
  return (
    <div>
      <input type='checkbox' checked={todoCheck} onChange={handleCheckBox} />
    </div>
  )
}

export default Checkbox
