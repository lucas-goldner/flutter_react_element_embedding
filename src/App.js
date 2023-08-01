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
          <h1>Flutter Element Embedding in React</h1>
          <section className="App-Logo-Row">
            <img
              src={"./react-logo.svg"}
              className="App-logo"
              alt="React Logo"
            />
            <img
              src={"./flutter_icon.svg"}
              className="App-logo"
              alt="Flutter Logo"
            />
          </section>
          <div id="loading"></div>
          <div
            style={{
              height: 720,
              width: 1152,
            }}
            className="flutter_container"
            id="flutter_target"
          />

          <a
            className="App-link"
            href="https://github.com/lucas-goldner/flutter_react_element_embedding"
            target="_blank"
            rel="noopener noreferrer"
          >
            Visit repo
          </a>
        </header>
      </div>
    </>
  );
}

export default App;
