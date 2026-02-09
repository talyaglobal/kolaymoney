import { Route, Switch, Redirect } from 'wouter'
import { AuthProvider, useAuthContext } from './contexts/AuthContext'
import { PasswordGate } from './components/auth/PasswordGate'
import { AdminLogin } from './pages/admin/Login'
import { AdminDashboard } from './pages/admin/Dashboard'
import { AdminApplications } from './pages/admin/Applications'
import { ApplicationPage } from './pages/ApplicationPage'
import { ApplicationDetail } from './components/admin/ApplicationDetail'
import { AdminLayout } from './components/admin/AdminLayout'
import Home from './pages/Home'

// Protected Route Component
function ProtectedRoute({ component: Component, ...rest }: any) {
  const { isAdmin, loading } = useAuthContext()

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <p className="mono-text">Yükleniyor...</p>
      </div>
    )
  }

  if (!isAdmin) {
    return <Redirect to="/admin/login" />
  }

  return <Component {...rest} />
}

function AppRoutes() {
  return (
    <Switch>
      {/* Public Routes */}
      <Route path="/" component={Home} />
      <Route path="/basvuru" component={ApplicationPage} />
      
      {/* Admin Routes */}
      <Route path="/admin/login" component={AdminLogin} />
      <Route path="/admin" component={() => <ProtectedRoute component={AdminDashboard} />} />
      <Route path="/admin/applications" component={() => <ProtectedRoute component={AdminApplications} />} />
      <Route path="/admin/applications/:id">
        {(params) => (
          <ProtectedRoute
            component={() => (
              <AdminLayout>
                <ApplicationDetail applicationId={params.id} />
              </AdminLayout>
            )}
          />
        )}
      </Route>

      {/* 404 */}
      <Route component={() => <div className="min-h-screen bg-white flex items-center justify-center"><p className="mono-text">404 - Sayfa bulunamadı</p></div>} />
    </Switch>
  )
}

export function App() {
  return (
    <PasswordGate>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </PasswordGate>
  )
}
