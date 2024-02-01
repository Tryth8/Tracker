import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import {AuthProvider} from "./context/AuthContext";
import {HelmetProvider} from "react-helmet-async";

import Home from './containers/Home';
import Login from "./containers/Login";
import NotFound from "./containers/NotFound"
import Register from "./containers/Register";
import Activate from "./containers/Activate";
import ResetPassword from "./containers/ResetPassword";
import ResetPasswordConfirmation from "./containers/ResetPasswordConfirmation";
import PrivateRoutes from "./utils/PrivateRoutes";
import Challenges from "./containers/Challenges";
import Skills from "./containers/Skills";
import TodoList from "./containers/TodoList";
import Settings from "./containers/Settings";
import Profile from "./containers/Profile";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Router>
            <HelmetProvider>
                <AuthProvider>
                    <Routes>
                        <Route path="/" element={<Home/>}/>
                        <Route path="/login" element={<Login/>}/>
                        <Route path="/register" element={<Register/>}/>
                        <Route path="/activate/:uid/:token" element={<Activate/>}/>
                        <Route path="/reset-password" element={<ResetPassword/>}/>
                        <Route path="/password/reset/confirm/:uid/:token" element={<ResetPasswordConfirmation/>}/>
                        <Route path="/404" element={<NotFound/>}/>
                        <Route element={<PrivateRoutes/>}>
                            <Route path="/activate/:uid/:token" element={<Activate/>}/>
                            <Route path="/reset-password" element={<ResetPassword/>}/>
                            <Route path="/password/reset/confirm/:uid/:token" element={<ResetPasswordConfirmation/>}/>
                            <Route path="/todolist" element={<TodoList/>}/>
                            <Route path="/challenges" element={<Challenges/>}/>
                            <Route path="/skills" element={<Skills/>}/>
                            <Route path="/settings" element={<Settings/>}/>
                            <Route path="/profile" element={<Profile/>}/>
                        </Route>
                    </Routes>
                </AuthProvider>
            </HelmetProvider>
        </Router>
    </React.StrictMode>
);
