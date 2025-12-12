import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import CreateCampaignForm from './features/dashboard/CreateCampaignForm';
import RecordAssessmentForm from './features/dashboard/RecordAssessmentForm';
import Account from './pages/Account';
import AssessmentsPage from './pages/AssessmentsPage';
import CampaignsPage from './pages/CampaignsPage';
import DashboardPage from './pages/DashboardPage';
import IndicatorsPage from './pages/IndicatorsPage';
import LoginPage from './pages/LoginPage';
import UsersPage from './pages/UsersPage';

function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path='/login' element={<LoginPage />} />
      <Route path='/' element={<Navigate to='/login' replace />} />

      {/* Protected Layout */}
      <Route path='/' element={<Account />}>
        <Route index element={<Navigate replace to='dashboard' />} />
        <Route path='dashboard' element={<DashboardPage />} />

        {/* Assessments */}
        <Route path='assessments' element={<AssessmentsPage />} />
        <Route
          path='assessments/record'
          element={
            <div className='max-w-4xl'>
              <RecordAssessmentForm />
            </div>
          }
        />

        {/* Campaigns (nested) */}
        <Route path='campaigns'>
          {/* default => Campaigns page */}
          <Route index element={<CampaignsPage />} />

          {/* /campaigns/create */}
          <Route path='create' element={<CreateCampaignForm />} />
        </Route>

        {/* Indicators */}
        <Route path='indicators' element={<IndicatorsPage />} />

        {/* Users */}
        <Route path='users' element={<UsersPage />} />
      </Route>

      {/* Fallback */}
      <Route path='*' element={<Navigate to='/dashboard' replace />} />
    </Routes>
  );
}

export default App;
