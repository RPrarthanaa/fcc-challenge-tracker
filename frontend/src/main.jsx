import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'

const params = new URLSearchParams(window.location.search)
const redirect = params.get('redirect')

if (redirect) {
  window.history.replaceState(
    null,
    '',
    `/fcc-challenge-tracker${redirect}`
  )
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter basename="/fcc-challenge-tracker">
      <App />
    </BrowserRouter>
  </StrictMode>,
)
