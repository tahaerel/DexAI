import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App";
import AppContracts from "./App_Contract";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

let isAppContractsVisible = true;

function toggleAppContracts() {
  isAppContractsVisible = !isAppContractsVisible;
  root.render(
    <StrictMode>
      {isAppContractsVisible ? <AppContracts /> : <App toggleAppContracts={toggleAppContracts} />}
    </StrictMode>
  );
}

toggleAppContracts();
