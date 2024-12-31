import React from "react";

function Navbar() {
  const handleNavigation = (e, path) => {
    e.preventDefault();
    window.history.pushState({}, "", path);
    window.dispatchEvent(new PopStateEvent("popstate"));
  };

  return (
    <nav className="border-b">
      <div className="container mx-auto px-6">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center space-x-8">
            <a
              href="/"
              className="text-xl font-semibold"
              onClick={(e) => handleNavigation(e, "/")}
            >
              Travel
            </a>
            <div className="hidden md:flex space-x-4">
              <a
                href="/"
                className="text-sm font-medium hover:text-primary transition-colors"
                onClick={(e) => handleNavigation(e, "/")}
              >
                Home
              </a>
              <a
                href="/notice"
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
                onClick={(e) => handleNavigation(e, "/notice")}
              >
                Notice
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
