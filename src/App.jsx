import { Toaster } from "@/components/ui/toaster"
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { LanguageProvider } from './lib/LanguageContext';
import PageNotFound from './lib/PageNotFound';
import AppLayout from './components/layout/AppLayout.jsx';

import Home from './pages/Home';
import Classes from './pages/Classes';
import ClassDetail from './pages/ClassDetail.jsx';
import Tables from './pages/Tables';
import SquaresCubes from './pages/SquaresCubes';
import Formulas from './pages/Formulas.jsx';
import Definitions from './pages/Definitions';
import Games from './pages/Games.jsx';
import Quiz from './pages/Quiz';
import GeneralMath from './pages/GeneralMath';
import DailyChallenge from './pages/DailyChallenge';
import Workbook from './pages/Workbook';
import Worksheets from './pages/Worksheets';
import Mathematicians from './pages/Mathematicians';
import VedicMath from './pages/VedicMath';
import MathTricks from './pages/MathTricks';
import MathModels from './pages/MathModels';
import Patravachan from './pages/Patravachan';
import AISolver from './pages/AISolver';
import VirtualLab from './pages/VirtualLab';
import Settings from './pages/Settings';
import MathGlossary from './pages/MathGlossary';
import InteractiveModels from './pages/InteractiveModels';
import MathModels100 from './pages/MathModels100';
import ProgressDashboard from './pages/ProgressDashboard';

const queryClientInstance = new QueryClient({
  defaultOptions: {
    queries: { refetchOnWindowFocus: false, retry: 1 },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClientInstance}>
      <LanguageProvider>
        {/* basename fixed for GitHub Pages subdirectory */}
        <Router basename="/NKG-MATH">
          <Routes>
            <Route element={<AppLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/classes" element={<Classes />} />
              <Route path="/class/:classNum" element={<ClassDetail />} />
              <Route path="/tables" element={<Tables />} />
              <Route path="/squares-cubes" element={<SquaresCubes />} />
              <Route path="/formulas" element={<Formulas />} />
              <Route path="/definitions" element={<Definitions />} />
              <Route path="/games" element={<Games />} />
              <Route path="/quiz" element={<Quiz />} />
              <Route path="/general-math" element={<GeneralMath />} />
              <Route path="/daily-challenge" element={<DailyChallenge />} />
              <Route path="/workbook" element={<Workbook />} />
              <Route path="/worksheets" element={<Worksheets />} />
              <Route path="/mathematicians" element={<Mathematicians />} />
              <Route path="/vedic-math" element={<VedicMath />} />
              <Route path="/math-tricks" element={<MathTricks />} />
              <Route path="/math-models" element={<MathModels />} />
              <Route path="/patravachan" element={<Patravachan />} />
              <Route path="/ai-solver" element={<AISolver />} />
              <Route path="/virtual-lab" element={<VirtualLab />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/glossary" element={<MathGlossary />} />
              <Route path="/interactive-models" element={<InteractiveModels />} />
              <Route path="/math-models-100" element={<MathModels100 />} />
              <Route path="/progress" element={<ProgressDashboard />} />
            </Route>
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </Router>
        <Toaster />
      </LanguageProvider>
    </QueryClientProvider>
  );
}

export default App;
