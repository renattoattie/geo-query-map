import Header from "@/components/Header";
import Map from "@/components/Map";
import Prompt from "@/components/Prompt";

const Index = () => {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      
      <main className="flex-1 container mx-auto p-4 flex gap-4">
        <div className="w-1/3 min-w-[400px]">
          <Prompt />
        </div>
        
        <div className="flex-1">
          <Map />
        </div>
      </main>
      
      <footer className="bg-white border-t border-gray-200 py-4">
        <div className="container mx-auto text-center text-sm text-gray-600">
          <p>Desenvolvido pela RunForrestGIS</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;