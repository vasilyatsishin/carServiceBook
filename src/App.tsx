import { Provider } from "react-redux";
import "./App.css";
import Router from "./router/Router";
import NavBar from "./shared/components/NavBar/NavBar";
import { store } from "./redux/store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <NavBar />
          <Router />
        </QueryClientProvider>
      </Provider>
    </>
  );
}

export default App;
