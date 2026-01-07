import { Provider } from "react-redux";
import "./App.css";
import Router from "./router/Router";
import NavBar from "./shared/components/NavBar/NavBar";
import { store } from "./redux/store";

function App() {
  return (
    <>
      <Provider store={store}>
        <NavBar />
        <Router />
      </Provider>
    </>
  );
}

export default App;
