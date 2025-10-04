
import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { AppContextProvider, useAppContext } from './context/AppContext';
import LoginPage from './pages/LoginPage';
import TimelinePage from './pages/TimelinePage';
import TagPage from './pages/TagPage';
import MyPage from './pages/MyPage';
import PostPage from './pages/PostPage';

const ProtectedRoute: React.FC = () => {
    const { isAuthenticated } = useAppContext();
    return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

const AppRoutes: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route element={<ProtectedRoute />}>
                    <Route path="/" element={<TimelinePage />} />
                    <Route path="/post/:postId" element={<PostPage />} />
                    <Route path="/tag/:tagName" element={<TagPage />} />
                    <Route path="/my-page" element={<MyPage />} />
                </Route>
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </Router>
    );
}

const App: React.FC = () => {
  return (
    <AppContextProvider>
        <AppRoutes />
    </AppContextProvider>
  );
};

export default App;
