import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import ProtectedRoute from './components/ProtectedRoute';
import CreateCampaignForm from './features/dashboard/CreateCampaignForm';
import RecordAssessmentForm from './features/dashboard/RecordAssessmentForm';
import DashboardLayout from './layouts/DashboardLayout';
import AssessmentsPage from './pages/AssessmentsPage';
import CampaignsPage from './pages/CampaignsPage';
import DashboardPage from './pages/DashboardPage';
import IndicatorsPage from './pages/IndicatorsPage';
import LoginPage from './pages/LoginPage';

function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path='/login' element={<LoginPage />} />
      <Route path='/' element={<Navigate to='/login' replace />} />

      {/* Protected Routes */}
      <Route
        path='/'
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate replace to='dashboard' />} />
        <Route path='dashboard' element={<DashboardPage />} />
        <Route path='assessments' element={<AssessmentsPage />} />
        <Route
          path='assessments/record'
          element={
            <div className='max-w-4xl'>
              <RecordAssessmentForm />
            </div>
          }
        />
        <Route path='campaigns' element={<CampaignsPage />} />
        <Route
          path='campaigns/create'
          element={
            <ProtectedRoute requiredRoles='admin'>
              <div className='max-w-4xl'>
                <CreateCampaignForm />
              </div>
            </ProtectedRoute>
          }
        />
        <Route path='indicators' element={<IndicatorsPage />} />
      </Route>

      {/* Fallback */}
      <Route path='*' element={<Navigate to='/dashboard' replace />} />
    </Routes>
  );
}

export default App;
