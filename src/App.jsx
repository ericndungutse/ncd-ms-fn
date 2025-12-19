import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import CreateCampaignForm from './features/dashboard/CreateCampaignForm';
import { RegisterUserForm } from './features/users';
import Account from './pages/Account';
import AssessmentsPage from './pages/AssessmentsPage';
import RecordAssessmentPage from './pages/RecordAssessmentPage';
import CampaignsPage from './pages/CampaignsPage';
import DashboardPage from './pages/DashboardPage';
import IndicatorsPage from './pages/IndicatorsPage';
import LoginPage from './pages/LoginPage';
import UsersPage from './pages/UsersPage';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path='/login' element={<LoginPage />} />
      <Route path='/' element={<Navigate to='/login' replace />} />

      {/* Protected Layout */}
      <Route
        path='/'
        element={
          <ProtectedRoute>
            <Account />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate replace to='dashboard' />} />
        <Route path='dashboard' element={<DashboardPage />} />

        {/* Assessments */}
        <Route path='assessments' element={<AssessmentsPage />} />
        <Route path='assessments/record' element={<RecordAssessmentPage />} />

        {/* Campaigns (nested) */}
        <Route path='campaigns'>
          {/* default => Campaigns page */}
          <Route index element={<CampaignsPage />} />

          {/* /campaigns/create */}
          <Route path='create' element={<CreateCampaignForm />} />
        </Route>

        {/* Indicators */}
        <Route path='indicators' element={<IndicatorsPage />} />

        {/* Users (nested) */}
        <Route path='users'>
          {/* default => Users page */}
          <Route index element={<UsersPage />} />

          {/* /users/register */}
          <Route path='register' element={<RegisterUserForm />} />
        </Route>
      </Route>

      {/* Fallback */}
      <Route path='*' element={<Navigate to='/dashboard' replace />} />
    </Routes>
  );
}

export default App;
