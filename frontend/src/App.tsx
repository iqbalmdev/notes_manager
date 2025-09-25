import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import HomePage from './pages/HomePage';
import NotesListPage from './pages/NotesListPage';
import CreateNotePage from './pages/CreateNotePage';
import NoteDetailPage from './pages/NoteDetailPage';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Navigation />
        <main className="app-main">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/notes" element={<NotesListPage />} />
            <Route path="/notes/create" element={<CreateNotePage />} />
            <Route path="/notes/:id" element={<NoteDetailPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;