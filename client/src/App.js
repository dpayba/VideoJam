import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './Login'
import Video from './Video'
import Dashboard from './Dashboard'

// Get url parameters
const code = new URLSearchParams(window.location.search).get('code')

function App() {
  return code ? <Dashboard code={code} /> : <Login/>
}

export default App;
