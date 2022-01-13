import React from "react";
import ReactDOM from "react-dom";
import { composeWithDevTools } from "redux-devtools-extension";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";

import MomentUtils from "@date-io/moment";
import "reset-css";

import { MuiThemeProvider, createTheme } from "@material-ui/core/styles";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";

import reducers from "store";

import AppContainer from "./AppContainer";

import "index.css";

const middlewares = [thunk];
if (process.env.NODE_ENV === "development") {
  // DEV
  // const { createLogger } = require("redux-logger");
  // const logger = createLogger();
  // middlewares.push(logger);
}

const persistConfig = {
  key: "flare-dispatch-v1",
  whitelist: ["auth", "version", "i18n", "filters"],
  storage,
};
const persistedReducer = persistReducer(persistConfig, reducers);
const store = createStore(
  persistedReducer,
  composeWithDevTools(applyMiddleware(...middlewares))
);
(window as any).__store__ = store;
const persistor = persistStore(store);

ReactDOM.render(
  <MuiThemeProvider theme={createTheme()}>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <MuiPickersUtilsProvider utils={MomentUtils}>
          <AppContainer />
        </MuiPickersUtilsProvider>
      </PersistGate>
    </Provider>
  </MuiThemeProvider>,
  document.getElementById("root")
);

declare const module: { hot: any };
if (module.hot) {
  module.hot.accept("./App", () => {
    const HotApp = require("./App").default;
    ReactDOM.render(<HotApp />, document.getElementById("root"));
  });
}
