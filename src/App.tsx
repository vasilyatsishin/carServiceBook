import { Provider } from "react-redux";
import "./App.css";
import Router from "./router/Router";
import { store } from "./redux/store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastProvider } from "./shared/providers/ToastProvider";

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <ToastProvider>
            <Router />
          </ToastProvider>
        </QueryClientProvider>
      </Provider>
    </>
  );
}

export default App;
