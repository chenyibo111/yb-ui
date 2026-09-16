import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "@chenyibo111/tokens/styles.css"
import "@chenyibo111/ui/styles.css"

import { App } from "./App"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
