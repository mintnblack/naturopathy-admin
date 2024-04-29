import { connect } from "react-redux";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import "./App.css";

// Authenctication

import LoginPage from "./authentication/LoginPage";
import TriggerResetEmailPage from "./authentication/TriggerResetEmailPage";
import ResetPasswordForm from "./authentication/ResetPasswordForm";

// containers
import Container from "./container/Container";
import Dashboard from "./dashboard/Dashboard";

// appointments

import Appointments from "./appointments/Appointments";
import AddAppointments from "./appointments/AddAppointments"; 

// blogs

import Blogs from "./blogs/Blogs";
import CreateBlog from "./blogs/createBlog/CreateBlog";
import ViewBlog from "./blogs/viewBlog/ViewBlog";
import EditBlog from "./blogs/editBlog/EditBlog";



import Feedbacks from "./feedbacks/Feedbacks";

// clinics

import AvailableClinics from "./clinic/AvailableClinics";
import AddClinicForm from "./clinic/AddClinicForm";
import UpdateClinicForm from "./clinic/UpdateClinicForm";
import ClinicInfo from "./clinic/ClinicInfo";
import AddClinicTime from "./clinic/AddClinicTime";


// contact us

import Contacts from "./contacts/Contacts";

// snackbar

import CustomizedSnackbars from "./components/CustomizedSnackbars";

import User from "./users/Users"
import CreateUser from "./users/AddUser"
import EditUser from "./users/EditUser";

import Product from "./products/Product";
import CreateProduct from "./products/CreateProduct";
import EditProduct from "./products/EditProduct"

import Category from "./category/Category";
import CreateCategory from "./category/CreateCategory";
import EditCategory from "./category/EditCategory"
import UserAppointments from "./users/userAppointment/userAppointments";
import AppointmentDetails from "./users/userAppointment/appointmentDetails";

function App(props) {
  const { isLoggedIn } = props;
  const userEmail = localStorage.getItem("email");

  return (
    <div>
      <div>
        <Router>
          <div>
            <Routes>
           
              <Route
                path="/auth"
                element={
                  !isLoggedIn ? <LoginPage /> : <Navigate to="/dashboard" />
                }
              />
              
              <Route path="/forgot-password" element={<TriggerResetEmailPage />} />
              <Route path="/reset-password" element={<ResetPasswordForm />} />
              
      
                <Route
                  path="/"
                  element={isLoggedIn ? <Container /> : <Navigate to="/auth" />}
                >
                  <Route path="dashboard" element={<Dashboard />} />
                  <Route path="appointments" element={<Appointments />} />
                  <Route path="create/appointment" element={<AddAppointments />} />
                  <Route path="blogs" element={<Blogs />} />
                  <Route path="create/blog" element={<CreateBlog />} />
                  <Route path="view/blog/:blogId" element={<ViewBlog />} />
                  <Route path="edit/blog/:blogId" element={<EditBlog />} />
                  
                  <Route path="feedbacks" element={<Feedbacks />} />
                  <Route path="clinics" element={<AvailableClinics />} />
                  <Route path="add/clinic" element={<AddClinicForm />} />
                  <Route path="add/clinic/time/:clinicId" element={<AddClinicTime />} />
                  <Route path="update/clinic/:clinicId" element={<UpdateClinicForm />} />
                  <Route path="info/clinic/:clinicId" element={<ClinicInfo />} />
                  <Route path="contacts" element={<Contacts />} />
                  <Route path="users" element={<User />} />
                  <Route path="users/create" element={<CreateUser />} />
                  <Route path="users/edit/:id" element={<EditUser />} />
                  <Route path="users/appointment/:id" element={<UserAppointments />} />
                  <Route path="users/appointment/info/:id" element={<AppointmentDetails />} />
                  <Route path="product" element={<Product />} />
                  <Route path="product/create" element={<CreateProduct />} />
                  <Route path="product/edit/:id" element={<EditProduct />} />
                  <Route path="category" element={<Category />} />
                  <Route path="category/create" element={<CreateCategory />} />
                  <Route path="category/edit/:id" element={<EditCategory />} />
                </Route>
          

            

              
                
            </Routes>
          </div>
        </Router>
      </div>
      <CustomizedSnackbars/>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn:
      state.authReducer.authToken != null && state.authReducer.email != null,
  };
};

export default connect(mapStateToProps, null)(App);
