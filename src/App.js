import logo from "./logo.svg";
import "./App.css";
import Menu from "./components/Menu/Menu";
import Footer from "./components/Footer";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Header from "./components/Header";
import TodaysTasks from "./pages/TodaysTasks";
import { useDispatch, useSelector } from "react-redux";
import ModalCreateTask from "./components/Utilities/ModalCreateTask";
import { modalActions } from "./reducer/modalSlice";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import PrivateRoute from "./components/PrivateRoute";
import { getUserData } from "./reducer/userSlice";
import { useEffect } from "react";
import ChangePassword from "./pages/ChangePassword";
import ImportantTasks from "./pages/ImportantTasks";
import CompletedTasks from "./pages/CompletedTasks";
import UncompletedTasks from "./pages/UncompletedTasks";
import SearchTaskDetails from "./pages/SearchTaskDetails";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";

function App() {
  const dispatch = useDispatch();
  const modalOpen = useSelector((state) => state.modal.modalCreateTaskOpen);
  const closeModalCreateTask = () => {
    dispatch(modalActions.closeModalCreateTask());
  };


  useEffect(() => {
    // Fetch user data again on initial load 
      dispatch(getUserData());

  }, [dispatch]);

  return (
    <div className="bg-slate-200 min-h-screen text-slate-600 xl:text-base sm:text-sm text-xs">
      {modalOpen && (
        <ModalCreateTask onClose={closeModalCreateTask} nameForm="Add a task"  task=""/>
      )}
      <Routes>
        {/* Login route without menu and header */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:resetToken" element={<ResetPassword/> } />
        {/* Admin dashboard routes with menu and header */}
        <Route
          path="/dashboard/*"
          element={
            <PrivateRoute>
            <>
              <Menu />
              <main className=" pt-5 pb-8 sm:pb-16 px-3 md:px-8 md:w-full xl:w-10/12 m-auto min-h-screen xl:ml-60">
                <Header />
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/today" element={<TodaysTasks />} />
                  <Route path="/important" element={<ImportantTasks />} />
                  <Route path="/completed" element={<CompletedTasks />} />
                  <Route path="/uncompleted" element={<UncompletedTasks />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/settings" element={<ChangePassword/>}/>
                  <Route path="/task/:id" element={<SearchTaskDetails/>}/>
                  {/*  
              <Route path="/results" element={<SearchResults />} />
              <Route path="/task/:taskId" element={<TaskOnly />} />
              <Route path="*" element={<Navigate to="" />} /> */}
                </Routes>
              </main>
              <Footer />
            </>
            </PrivateRoute>
          }
        />

        {/* Redirect from root to login or admin as needed */}
        <Route path="/" element={<Navigate to="/dashboard" />} />
      </Routes>
    </div>
  );
}

export default App;
