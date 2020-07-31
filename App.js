console.warn = () => {};
import React from "react";
import MainComponent from "./components/MainComponent";
import { Provider } from "react-redux";
import { configureStore } from "./redux/configeStore";
import { PersistGate } from "redux-persist/es/integration/react";
import Loading from "./components/LoadingComponent";

const { persistor, store } = configureStore();

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={<Loading />} persistor={persistor}>
        <MainComponent />
      </PersistGate>
    </Provider>
  );
}
