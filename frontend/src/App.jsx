import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/homePage";
import OnBoardingPage from "./pages/onBoardingPage";
import ChatPage from "./pages/chatPage";
import CallPage from "./pages/callPage";
import NotificationPage from "./pages/notificationPage";
import SignUpPage from "./pages/signUpPage";
import LogInPage from "./pages/logInPage";
import { useAuthUser } from "./hooks/useAuthUser";
import LoadingPage from "./components/loadingPage";
import Layout from "./components/layout";
import { useThemeState } from "./hooks/useThemeSelector";

function App() {
  const { isLoading, authUser } = useAuthUser();
  const isAuthenticated = Boolean(authUser);
  const isOnboarded = authUser?.isOnboarded;
  const { theme } = useThemeState();

  if (isLoading) {
    return <LoadingPage />;
  }

  return (
    <>
      <div className="h-screen" data-theme={theme}>
        <Routes>
          <Route
            path="/"
            element={
              isAuthenticated ? (
                isOnboarded ? (
                  <Layout showSideBar={true}>
                    <HomePage />
                  </Layout>
                ) : (
                  <Navigate to="/onboarding" />
                )
              ) : (
                <Navigate to="/login" />
              )
            }
          />

          <Route
            path="/signup"
            element={
              !isAuthenticated ? (
                <SignUpPage />
              ) : (
                <Navigate to={"/onboarding"} />
              )
            }
          />
          <Route
            path="/login"
            element={
              !isAuthenticated ? (
                <LogInPage />
              ) : (
                <Navigate to={!isOnboarded ? "/onboarding" : "/"} />
              )
            }
          />
          <Route
            path="/onboarding"
            element={
              isAuthenticated ? (
                !isOnboarded ? (
                  <OnBoardingPage />
                ) : (
                  <Navigate to={"/"} />
                )
              ) : (
                <Navigate to={"/login"} />
              )
            }
          />
          <Route
            path="/chat/:id"
            element={
              isAuthenticated && isOnboarded ? (
                <Layout showSideBar={false}>
                  <ChatPage />
                </Layout>
              ) : (
                <Navigate to={!isAuthenticated ? "/login" : "/onboarding"} />
              )
            }
          />
          <Route
            path="/call/:id"
            element={
              isAuthenticated ? <CallPage /> : <Navigate to={"/login"} />
            }
          />
          <Route
            path="/notifications"
            element={
              isAuthenticated && isOnboarded ? (
                <Layout showSideBar>
                  <NotificationPage />
                </Layout>
              ) : (
                <Navigate to={!isAuthenticated ? "/login" : "/onboarding"} />
              )
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
