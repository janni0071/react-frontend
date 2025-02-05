import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Layout from './components/Layout';
import Home from './pages/Home';
import NotFound from './pages/NotFound';

import Lehrbetriebe from './pages/Lehrbetriebe/Lehrbetriebe';
import Lehrbetrieb from './pages/Lehrbetriebe/Lehrbetrieb';
import LehrbetriebErstellen from './pages/Lehrbetriebe/LehrbetriebErstellen';
import LehrbetriebAnpassen from './pages/Lehrbetriebe/LehrbetriebAnpassen';

import Lernende from './pages/Lernende/Lernende';
import Lehrling from './pages/Lernende/Lehrling';
import LehrlingErstellen from './pages/Lernende/LehrlingErstellen';
import LehrlingAnpassen from './pages/Lernende/LehrlingAnpassen';

import Dozenten from './pages/Dozenten/Dozenten';
import Dozent from './pages/Dozenten/Dozent';
import DozentErstellen from './pages/Dozenten/DozentErstellen';
import DozentAnpassen from './pages/Dozenten/DozentAnpassen';

import Laender from './pages/Laender/Laender';
import Land from './pages/Laender/Land';
import LandErstellen from './pages/Laender/LandErstellen';
import LandAnpassen from './pages/Laender/LandAnpassen';

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
                    <Route path="/lehrling-anpassen/:id" element={<LehrlingAnpassen />} />

                    <Route path="dozenten" element={<Dozenten />} />
                    <Route path="dozenten/:id" element={<Dozent />} />
                    <Route path="dozent-erstellen" element={<DozentErstellen />} />
                    <Route path="/dozent-anpassen/:id" element={<DozentAnpassen />} />

                    <Route path="laender" element={<Laender />} />
                    <Route path="laender/:id" element={<Land />} />
                    <Route path="land-erstellen" element={<LandErstellen />} />
                    <Route path="/land-anpassen/:id" element={<LandAnpassen />} />

                    {/* The 404 Route */}
                    <Route path="*" element={<NotFound />} />

                </Route>
            </Routes>
        </Router>
    );
}

export default App;
