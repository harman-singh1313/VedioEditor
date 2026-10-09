
import { Route, Routes } from 'react-router-dom'
import Navbar from './Components/Layout/Navbar'
import About from './Pages/About'
import Contact from './Pages/Contact'
import Home from './Pages/Home'
import Services from './Pages/Services'
import Footer from './Components/Layout/Footer'
import Admin from './Pages/admin/Admin'
import Project from './Pages/admin/Project'
import Leads from './Pages/admin/Leads'
import AdminLayout from './Components/Common/AdminLayout'
import FloatingContact from './Components/Common/FloatingContact'
import AdminLogin from './Pages/admin/AdminLogin'
import ProtectedRoute from './Components/Common/ProtectedRoute'
import Settings from './Pages/admin/Settings'
import ForgotPassword from './Pages/admin/ForgotPassword'
import ScrollToTop from './Components/Common/ScrollToTop'

const App = () => {
  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white">

        {/* Scroll to top whenever page changes */}
        <ScrollToTop />

        <Routes>

          {/* =========================
              PUBLIC WEBSITE
          ========================== */}
          <Route
            path="/*"
            element={
              <>
                <Navbar />

                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/services" element={<Services />} />
                  <Route path="/contact" element={<Contact />} />
                </Routes>

                <FloatingContact />
                <Footer />
              </>
            }
          />

          {/* =========================
              ADMIN LOGIN
          ========================== */}
          <Route
            path="/admin/login"
            element={<AdminLogin />}
          />

          {/* =========================
              FORGOT PASSWORD
          ========================== */}
          <Route
            path="/admin/forgot-password"
            element={<ForgotPassword />}
          />

          {/* =========================
              PROTECTED ADMIN ROUTES
          ========================== */}
          <Route element={<ProtectedRoute />}>

            <Route element={<AdminLayout />}>

              <Route
                path="/admin"
                element={<Admin />}
              />

              <Route
                path="/project"
                element={<Project />}
              />

              <Route
                path="/leads"
                element={<Leads />}
              />

              <Route
                path="/admin/settings"
                element={<Settings />}
              />

            </Route>

          </Route>

        </Routes>

      </div>
    </>
  )
}

export default App

