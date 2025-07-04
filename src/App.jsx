import React, {useState} from 'react'
import LoginPage from './LoginPage/LoginPage'
import SignUpPage from './SignUpPage/SignUpPage'
import UserPortal from './UserPortal/UserPortal'
import './App.css'
import ServiceProviderPortal from './ServiceProviderPortal/ServiceProviderPortal'
import AdminPortal from './AdminPortal/AdminPortal'

function App() {
  
  
  const [currentPage, setCurrentPage] = useState('login');

  let page;
  if (currentPage === 'login') {
    page = <LoginPage  goToUserPortal={() => setCurrentPage('userPortal')}
                       goToServiceProviderPortal={() => setCurrentPage('serviceProviderPortal')}
                       switchToSignUp={() => setCurrentPage('signup')} />;
    document.title = 'Login'
  } 
  else if (currentPage === 'signup') {
    page = <SignUpPage switchToLogin={() => setCurrentPage('login')}
                       goToUserPortal={() => setCurrentPage('userPortal')}
                       goToServiceProviderPortal={() => setCurrentPage('serviceProviderPortal')} />;
    document.title = 'Sign Up'
  }
  else if (currentPage === 'userPortal') {
    page = <UserPortal></UserPortal>
    document.title = 'User Portal'
  }  
  else if (currentPage === 'serviceProviderPortal') {
    page = <ServiceProviderPortal></ServiceProviderPortal>
    document.title = 'Service Provider Portal'
  }
  else if (currentPage === 'adminPortal') {
    page = <AdminPortal></AdminPortal>
    document.title = 'Admin Portal'
  }

  return page;
  
}

export default App
