import React, { useState } from "react";
import { LogIn, LogOut, User, Layers, Bookmark, Plus } from "lucide-react";
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

  return (
    <header className="w-full bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl font-heading font-bold text-primary">RunForrestGIS</h1>
          
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