
import React, { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { BookOpen } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: Página não encontrada:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center px-4">
        <BookOpen className="h-16 w-16 text-school-600 mx-auto mb-6" />
        <h1 className="text-4xl font-bold mb-4 text-school-800">Página não encontrada</h1>
        <p className="text-xl text-gray-600 mb-8">
          A página que você está procurando não existe ou foi movida.
        </p>
        <Button asChild>
          <Link to="/">
            Voltar para a página inicial
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
