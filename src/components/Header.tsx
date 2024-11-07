import { LogIn, LogOut, User } from "lucide-react";
import { Button } from "@/components/ui/button";

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <header className="w-full bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        <div className="flex items-center space-x-2">
          <h1 className="text-2xl font-heading font-bold text-primary">RunForrestGIS</h1>
        </div>
        
        {isLoggedIn ? (
          <div className="flex items-center space-x-4">
            <span className="text-sm font-medium">John Doe</span>
            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" onClick={() => setIsLoggedIn(false)}>
              <LogOut className="h-5 w-5" />
            </Button>
          </div>
        ) : (
          <Button onClick={() => setIsLoggedIn(true)}>
            <LogIn className="h-5 w-5 mr-2" />
            Login
          </Button>
        )}
      </div>
    </header>
  );
};

export default Header;