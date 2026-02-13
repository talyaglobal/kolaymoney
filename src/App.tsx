import { Route, Switch, Redirect } from 'wouter'
import { AuthProvider, useAuthContext } from './contexts/AuthContext'
import { AnalyticsProvider } from './contexts/AnalyticsContext'
import { PasswordGate } from './components/auth/PasswordGate'
import { AdminLogin } from './pages/admin/Login'
import { AdminDashboard } from './pages/admin/Dashboard'
import { AdminApplications } from './pages/admin/Applications'
import { FinancialDataManager } from './pages/admin/FinancialDataManager'
import { ComplianceApplications } from './pages/admin/ComplianceApplications'
import { QuestionManager } from './pages/admin/QuestionManager'
import { AnalyticsDashboard } from './pages/admin/AnalyticsDashboard'
import { ActivityLog } from './pages/admin/ActivityLog'
import { DocumentManager } from './pages/admin/DocumentManager'
import { NotificationsManager } from './pages/admin/NotificationsManager'
import { AdminUsersManager } from './pages/admin/AdminUsersManager'
import { StatisticsDashboard } from './pages/admin/StatisticsDashboard'
import { ApplicationPage } from './pages/ApplicationPage'
import { ComplianceApplicationForm } from './components/compliance/ComplianceApplicationForm'
import { ApplicationDetail } from './components/admin/ApplicationDetail'
import { AdminLayout } from './components/admin/AdminLayout'
import Home from './pages/Home'
import { SectorsListPage } from './pages/SectorsListPage'
import { SectorPage } from './pages/sectors/SectorPage'
import { SectorApplicationPage } from './pages/sectors/SectorApplicationPage'
import { UseCaseApplicationPage } from './pages/sectors/UseCaseApplicationPage'
import { BlogListPage } from './pages/blog/BlogListPage'
import { BlogPostPage } from './pages/blog/BlogPostPage'
import { WhyNotFactoringPage } from './pages/WhyNotFactoringPage'
import { FactoringTransitionGuidePage } from './pages/FactoringTransitionGuidePage'
import { VDMKFactoringCalculator } from './components/calculators/VDMKFactoringCalculator'
import { Navigation } from './components/layout/Navigation'
import { Footer } from './components/layout/Footer'
import { PreApplicationService } from './pages/services/PreApplicationService'
import { FundReferralService } from './pages/services/FundReferralService'
import { OriginatorScoringService } from './pages/services/OriginatorScoringService'

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
      <Route path="/basvuru-yeni">
        {() => <ComplianceApplicationForm />}
      </Route>
      
      {/* Sector Routes */}
      <Route path="/sektorler" component={SectorsListPage} />
      <Route path="/sektor/:slug/senaryo/:useCaseId/basvuru">
        {() => <UseCaseApplicationPage />}
      </Route>
      <Route path="/sektor/:slug/basvuru">
        {() => <SectorApplicationPage />}
      </Route>
      <Route path="/sektor/:slug">
        {() => <SectorPage />}
      </Route>
      
      {/* Blog Routes */}
      <Route path="/blog" component={BlogListPage} />
      <Route path="/blog/:slug">
        {() => <BlogPostPage />}
      </Route>
      
      {/* Calculator */}
      <Route path="/hesaplayici">
        {() => (
          <div className="min-h-screen flex flex-col bg-white">
            <Navigation variant="default" />
            <main className="flex-1 py-20 bg-gray-50">
              <div className="container max-w-6xl mx-auto">
                <VDMKFactoringCalculator />
              </div>
            </main>
            <Footer />
          </div>
        )}
      </Route>
      
      {/* Factoring Comparison */}
      <Route path="/neden-factoring-degil" component={WhyNotFactoringPage} />
      <Route path="/factoring-gecis-rehberi" component={FactoringTransitionGuidePage} />
      
      {/* Service Routes */}
      <Route path="/hizmetler/on-basvuru-degerlendirme" component={PreApplicationService} />
      <Route path="/hizmetler/fonlara-referral" component={FundReferralService} />
      <Route path="/hizmetler/originator-scoring" component={OriginatorScoringService} />
      
      {/* Admin Routes */}
      <Route path="/admin/login" component={AdminLogin} />
      <Route path="/admin" component={() => <ProtectedRoute component={AdminDashboard} />} />
      <Route path="/admin/applications" component={() => <ProtectedRoute component={AdminApplications} />} />
      <Route path="/admin/compliance-applications" component={() => <ProtectedRoute component={ComplianceApplications} />} />
      <Route path="/admin/question-manager" component={() => <ProtectedRoute component={QuestionManager} />} />
      <Route path="/admin/financial-data" component={() => <ProtectedRoute component={FinancialDataManager} />} />
      <Route path="/admin/analytics" component={() => <ProtectedRoute component={AnalyticsDashboard} />} />
      <Route path="/admin/statistics" component={() => <ProtectedRoute component={StatisticsDashboard} />} />
      <Route path="/admin/activity-log" component={() => <ProtectedRoute component={ActivityLog} />} />
      <Route path="/admin/documents" component={() => <ProtectedRoute component={DocumentManager} />} />
      <Route path="/admin/notifications" component={() => <ProtectedRoute component={NotificationsManager} />} />
      <Route path="/admin/users" component={() => <ProtectedRoute component={AdminUsersManager} />} />
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
      <AnalyticsProvider>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </AnalyticsProvider>
    </PasswordGate>
  )
}
