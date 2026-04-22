import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import UserDashboard from './users/pages/userDashboard'
import Categories from './users/pages/Categories'
import OrganizerDashboard from './organizer/pages/OrrganizerDashboard'
import AdminDashboard from './admin/pages/AdminDashboard'
import Auth from './pages/Auth'
import AddEvent from './organizer/pages/AddEvent'
import UserHome from './users/pages/UserHome'
import AdminHome from './admin/pages/AdminHome'
import AdminCareers from './admin/pages/AdminCarrers'
import AdminEvents from './admin/pages/AdminEvents'
import AdminSettings from './admin/pages/AdminSettings'
import OrganizerSection from './pages/OrganizerSection'
import UserSection from './pages/UserSection'
import AdminUsers from './admin/pages/AdminUsers'
import AdminLayout from './admin/components/AdminLayout'
import AdminOrganizers from './admin/pages/AdminOrganizers'
import PaymentSuccess from './users/pages/PaymentSuccess'
import PaymentFailed from './users/pages/PaymentFailed'
import About from './users/pages/About'
import Contact from './users/pages/Contact'
import OrgAbout from './organizer/pages/OrgAbout'
import OrgContact from './organizer/pages/OrgContact'

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Auth />} />
        <Route path='/user-home' element={<UserHome />} />
        <Route path='/user-events' element={<UserDashboard />} />
        <Route path='/user/categories' element={<Categories />} />
        <Route path='/user/about' element={<About />} />
        <Route path='/user/contact' element={<Contact />} />
        <Route path='/user-s' element={<UserSection />} />
        <Route path="/payment-success" element={<PaymentSuccess />} />
        <Route path="/payment-failed" element={<PaymentFailed />} />

        <Route path='/organizer' element={<OrganizerDashboard />} />
        <Route path='/organizer/add-event' element={<AddEvent />} />
        <Route path='/organizer-s' element={<OrganizerSection />} />
        <Route path='/organizer-about' element={<OrgAbout />} />
        <Route path='/organizer-contact' element={<OrgContact />} />

        <Route path='/admin' element={<AdminLayout><AdminDashboard /></AdminLayout>} />
        <Route path='/admin-h' element={<AdminHome />} />
        <Route path='/admin-c' element={<AdminCareers />} />
        <Route path='/admin-e' element={<AdminEvents />} />
        <Route path='/admin-s' element={<AdminSettings />} />
        <Route path='/admin/users' element={<AdminUsers />} />
        <Route path='/admin/organizers' element={<AdminOrganizers />} />
      </Routes>
    </>
  )
}

export default App
