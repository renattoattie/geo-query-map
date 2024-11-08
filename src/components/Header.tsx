import React, { useState } from "react";
import { LogIn, LogOut, User, Layers, Bookmark, Plus, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "@/components/ui/menubar";

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="w-full bg-white border-b border-gray-200 px-4 lg:px-6 py-4">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        <div className="flex items-center space-x-4">
          <h1 className="text-xl lg:text-2xl font-heading font-bold text-primary">RunForrestGIS</h1>
          
          <div className="hidden lg:block">
            <Menubar className="border-none">
              <MenubarMenu>
                <MenubarTrigger className="font-medium">
                  <Layers className="w-4 h-4 mr-2" />
                  Camadas
                </MenubarTrigger>
                <MenubarContent>
                  <MenubarItem>
                    <Plus className="w-4 h-4 mr-2" />
                    Adicionar Camada
                  </MenubarItem>
                  <MenubarSeparator />
                  <MenubarItem>OpenStreetMap</MenubarItem>
                </MenubarContent>
              </MenubarMenu>

              <MenubarMenu>
                <MenubarTrigger className="font-medium">
                  <Bookmark className="w-4 h-4 mr-2" />
                  Prompts Salvos
                </MenubarTrigger>
                <MenubarContent>
                  <MenubarItem>Meus Prompts Salvos</MenubarItem>
                  <MenubarSeparator />
                  <MenubarItem>Favoritos</MenubarItem>
                </MenubarContent>
              </MenubarMenu>
            </Menubar>
          </div>

          <Button 
            variant="ghost" 
            size="icon" 
            className="lg:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>
        
        {isLoggedIn ? (
          <div className="flex items-center space-x-2 lg:space-x-4">
            <span className="hidden lg:inline text-sm font-medium">John Doe</span>
            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" onClick={() => setIsLoggedIn(false)}>
              <LogOut className="h-5 w-5" />
            </Button>
          </div>
        ) : (
          <Button onClick={() => setIsLoggedIn(true)} size="sm" className="lg:text-base">
            <LogIn className="h-5 w-5 mr-2" />
            <span className="hidden lg:inline">Login</span>
          </Button>
        )}
      </div>

      {/* Menu móvel */}
      {isMobileMenuOpen && (
        <div className="lg:hidden mt-4 border-t pt-4">
          <Button variant="ghost" className="w-full justify-start mb-2">
            <Layers className="w-4 h-4 mr-2" />
            Camadas
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            <Bookmark className="w-4 h-4 mr-2" />
            Prompts Salvos
          </Button>
        </div>
      )}
    </header>
  );
};

export default Header;