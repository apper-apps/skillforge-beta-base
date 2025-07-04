import { Routes, Route } from 'react-router-dom';
import Header from '@/components/organisms/Header';
import BrowseWorkshops from '@/components/pages/BrowseWorkshops';
import WorkshopDetail from '@/components/pages/WorkshopDetail';
import MyLearning from '@/components/pages/MyLearning';
import Schedule from '@/components/pages/Schedule';
import LessonViewer from '@/components/pages/LessonViewer';

function App() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        <Routes>
          <Route path="/" element={<BrowseWorkshops />} />
          <Route path="/workshop/:id" element={<WorkshopDetail />} />
          <Route path="/my-learning" element={<MyLearning />} />
          <Route path="/schedule" element={<Schedule />} />
          <Route path="/lesson/:workshopId/:moduleId/:lessonId" element={<LessonViewer />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;