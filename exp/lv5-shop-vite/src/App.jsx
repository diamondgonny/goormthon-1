import { useState, useEffect } from "react";
import OrderPage from "./pages/OrderPage/OrderPage";
import SummaryPage from "./pages/SummaryPage/SummaryPage";
import CompletePage from "./pages/CompletePage/CompletePage";
import NoticeBoard from "./pages/NoticePage/NoticePage";
import { OrderContextProvider } from "./contexts/OrderContext";
import Navbar from "./components/Navbar";

function App() {
  const [step, setStep] = useState(0);
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    const handleLocationChange = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener("popstate", handleLocationChange);
    return () => window.removeEventListener("popstate", handleLocationChange);
  }, []);

  const handleNavigation = (path) => {
    window.history.pushState({}, "", path);
    setCurrentPath(path);
  };

  const renderContent = () => {
    if (currentPath === "/notice") {
      return <NoticeBoard />;
    }

    if (currentPath === "/order") {
      return (
        <OrderContextProvider>
          <SummaryPage
            setStep={(step) => {
              if (step === 0) {
                handleNavigation("/");
              } else if (step === 2) {
                handleNavigation("/complete");
              }
            }}
          />
        </OrderContextProvider>
      );
    }

    if (currentPath === "/complete") {
      return (
        <OrderContextProvider>
          <CompletePage
            setStep={(step) => {
              handleNavigation("/");
            }}
          />
        </OrderContextProvider>
      );
    }

    return (
      <OrderContextProvider>
        <OrderPage
          setStep={(step) => {
            if (step === 1) {
              handleNavigation("/order");
            }
          }}
        />
      </OrderContextProvider>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      {renderContent()}
    </div>
  );
}

export default App;
