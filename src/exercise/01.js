// Code splitting
// http://localhost:3000/isolated/exercise/01.js

import * as React from 'react'

// 🐨 use React.lazy to create a Globe component which uses a dynamic import
// to get the Globe component from the '../globe' module.
let Globe = React.lazy(() => import('../globe'))

function App() {
  const [showGlobe, setShowGlobe] = React.useState(false)

  // 🐨 wrap the code below in a <React.Suspense /> component
  // with a fallback.
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
        height: '100%',
        padding: '2rem',
      }}
    >
      <label
        style={{marginBottom: '1rem'}}
        onMouseEnter={loadGlobe}
        onFocus={loadGlobe}
      >
        <input
          type="checkbox"
          checked={showGlobe}
          onChange={e => setShowGlobe(e.target.checked)}
        />
        {' show globe'}
      </label>
      <div style={{width: 400, height: 400}}>
        <React.Suspense fallback={<div>Loading...</div>}>
          {showGlobe ? <Globe /> : null}
        </React.Suspense>
      </div>
    </div>
  )
}

function loadGlobe() {
  import('../globe')
    .then(module => {
      Globe = module.default
    })
    .catch(error => console.error(error))
}

// 🦉 Note that if you're not on the isolated page, then you'll notice that this
// app actually already has a React.Suspense component higher up in the tree
// where this component is rendered, so you *could* just rely on that one.

export default App
