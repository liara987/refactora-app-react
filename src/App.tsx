import { getResultData } from "./service/resultService";
import ResultView from "./view/ResultView";
const data = getResultData();

function App() {
  return (
    <div>
      <ResultView data={data} />
    </div>
  );
}

export default App;
