import React, { useState, forwardRef, useImperativeHandle } from 'react'
import Proptypes from 'prop-types'

const Togglable = forwardRef(({ label, children }, refs) => {
  const [visible, setVisible] = useState(false)
  const toggleVisible = () => setVisible((prev) => !prev)
  const getStyle = () => ({ display: visible ? 'block' : 'none' })
  useImperativeHandle(refs, () => {
    return { toggleVisible }
  })
  return (
    <div>
      {!visible && <button onClick={toggleVisible}>{label}</button>}
      <div style={getStyle()}>
        {children}
        <button onClick={toggleVisible}>Cancel</button>
      </div>
    </div>
  )
})

Togglable.displayName = 'Togglable'

Togglable.propTypes = {
  label: Proptypes.string.isRequired,
}

export default Togglable
