import { Route, Routes } from 'react-router';
import { AppLayout } from './layouts/AppLayout';
import { LearningRepositoriesPage } from './pages/LearningRepositoriesPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { PersonalProjectsPage } from './pages/PersonalProjectsPage';
import { ProfilePage } from './pages/ProfilePage';

export default function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route index element={<ProfilePage />} />
        <Route path="personal-projects" element={<PersonalProjectsPage />} />
        <Route path="learning-repositories" element={<LearningRepositoriesPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
