import './App.css';
import { Navigate, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import DashboardLayout from './layouts/DashboardLayout';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import AssessmentsPage from './pages/AssessmentsPage';
import CampaignsPage from './pages/CampaignsPage';
import IndicatorsPage from './pages/IndicatorsPage';
import RecordAssessmentForm from './features/dashboard/RecordAssessmentForm';
import CreateCampaignForm from './features/dashboard/CreateCampaignForm';

function App() {
  return (
    <AuthProvider>
      <Routes>
        {/* Public Routes */}
        <Route path='/' element={<Navigate to='/login' replace />} />
        <Route path='/login' element={<LoginPage />} />

        {/* Protected Routes */}
        <Route
          path='/dashboard'
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <DashboardPage />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path='/assessments'
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <AssessmentsPage />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path='/assessments/record'
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <div className='max-w-4xl'>
                  <RecordAssessmentForm />
                </div>
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path='/campaigns'
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <CampaignsPage />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path='/campaigns/create'
          element={
            <ProtectedRoute requiredRoles='admin'>
              <DashboardLayout>
                <div className='max-w-4xl'>
                  <CreateCampaignForm />
                </div>
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path='/indicators'
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <IndicatorsPage />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        {/* Fallback */}
        <Route path='*' element={<Navigate to='/dashboard' replace />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
