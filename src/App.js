import logo from "./logo.svg";
import "./App.css";
import { Helmet } from "react-helmet-async";

function App() {
  return (
    <>
      <Helmet>
        <script src="/flutter/flutter.js" defer></script>
        <script src="/flutter_init.js" defer></script>
      </Helmet>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <div
            style={{
              height: 720,
              width: 1152,
            }}
            id="flutter_target"
          ></div>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    </>
  );
}

export default App;
