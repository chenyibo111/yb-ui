import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "@yb/tokens/styles.css"
import "@yb/ui/styles.css"

import { App } from "./App"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
