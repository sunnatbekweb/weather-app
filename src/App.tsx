import React from "react";
import WeatherComponent from "./weatherComponent"
import { Provider } from "react-redux";
import store from "./store/store";

const App: React.FC = () => {

  return (
    <Provider store={store}>
      <WeatherComponent />
    </Provider>
  )
}

export default App;
