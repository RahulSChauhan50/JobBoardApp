import "./App.css";

import { Provider } from "react-redux";
import JobBoard from "./components/jobBoard/jobBoard";
import { store } from "./redux/store";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <JobBoard />
      </div>
    </Provider>
  );
}

export default App;
