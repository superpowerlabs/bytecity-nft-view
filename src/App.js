// import logo from './logo.svg';
import './App.css';
import { Provider } from "react-redux";
import store from "./store";
import { ConfigProvider } from "antd";
import Routes from './routes';
function App() {
  return (
    <ConfigProvider
      autoInsertSpaceInButton={false}
      theme={{
        token: {
          colorPrimary: "#27AE60",
        },
      }}
    > 
      <div className="App">
        <Provider store={store}>
            <Routes />
        </Provider>
      </div>
    </ConfigProvider>
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
  );
}

export default App;
