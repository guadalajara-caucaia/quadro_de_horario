import './App.css';
import { timetableData } from './data';
import Timetable from './components/Timetable';

function App() {
  return (
    <div className="App">
      <h1>Horário do 6º ao 9º Ano – Manhã – Ano Letivo 2025 (01.09)</h1>
      <Timetable data={timetableData} />
    </div>
  );
}

export default App;