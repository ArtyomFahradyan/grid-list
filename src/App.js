import { useState } from 'react';
import './App.scss';
import Column from './components/Column';

function App() {
  const [prosList, setProsList] = useState([]);
  const [consList, setConsList] = useState([]);

  const handlePrint = () => {
    console.log(prosList, consList);
  };

  return (
    <div className="App">
        <div>
            <Column
                list={prosList}
                setList={setProsList}
                secondaryList={consList}
                setSecondaryList={setConsList}
                title="Pros"
            />
            <Column
                list={consList}
                setList={setConsList}
                secondaryList={prosList}
                setSecondaryList={setProsList}
                title="Cons"
            />
        </div>
        <button className="print-button" onClick={handlePrint}>Print</button>
    </div>
  );
}

export default App;
