import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Layout from './components/Layout';
import Home from './pages/Home';
import Lehrbetriebe from './pages/Lehrbetriebe/Lehrbetriebe';
import Lehrbetrieb from './pages/Lehrbetriebe/Lehrbetrieb';
import LehrbetriebErstellen from './pages/Lehrbetriebe/LehrbetriebErstellen';
import LehrbetriebAnpassen from './pages/Lehrbetriebe/LehrbetriebAnpassen';
import NotFound from './pages/NotFound';
import Lernende from './pages/Lernende/Lernende';
import Lehrling from './pages/Lernende/Lehrling';
import LehrlingErstellen from './pages/Lernende/LehrlingErstellen';
import LehrlingAnpassen from './pages/Lernende/LehrlingAnpassen';

function App() {
    return (
        <Router>
            <Routes>
                {/* Layout Component Wrapping Pages */}
                <Route path="/" element={<Layout />}>

                    <Route index element={<Home />} /> {/* Default route */}

                    <Route path="lehrbetriebe" element={<Lehrbetriebe />} />
                    <Route path="lehrbetriebe/:id" element={<Lehrbetrieb />} />
                    <Route path="lehrbetrieb-erstellen" element={<LehrbetriebErstellen />} />
                    <Route path="/lehrbetrieb-anpassen/:id" element={<LehrbetriebAnpassen />} />

                    <Route path="lernende" element={<Lernende />} />
                    <Route path="lernende/:id" element={<Lehrling />} />
                    <Route path="lehrling-erstellen" element={<LehrlingErstellen />} />
                    <Route path="lehrling-anpassen/:id" element={<LehrlingAnpassen />} />

                    {/* The 404 Route */}
                    <Route path="*" element={<NotFound />} />

                </Route>
            </Routes>
        </Router>
    );
}

export default App;
