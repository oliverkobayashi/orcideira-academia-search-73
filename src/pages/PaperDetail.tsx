
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getPaperDetails } from '../utils/api';
import { Paper } from '../context/SearchContext';
import { Card } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { ArrowLeft } from 'lucide-react';
import { Button } from "@/components/ui/button";
import PaperDetail from '../components/PaperDetail';

const PaperDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [paper, setPaper] = useState<Paper | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPaperDetails = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        const data = await getPaperDetails(id);
        setPaper(data);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Erro desconhecido';
        setError(errorMessage);
        toast({
          title: "Erro ao carregar detalhes",
          description: errorMessage,
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };

    fetchPaperDetails();
  }, [id]);

  // Navigate back to the previous page
  const handleBack = () => {
    navigate(-1); // This will go back to the previous page in history, keeping the search results
  };

  if (loading) {
    return (
      <div className="container py-8 text-center">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
        <p className="mt-4 text-gray-600">Carregando detalhes da publicação...</p>
      </div>
    );
  }

  if (error || !paper) {
    return (
      <div className="container py-8 text-center">
        <p className="text-destructive">Erro ao carregar detalhes: {error || "Dados não encontrados"}</p>
        <Button className="mt-4" variant="outline" onClick={handleBack}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Voltar
        </Button>
      </div>
    );
  }

  return (
    <div className="container py-8">
      <Button variant="outline" onClick={handleBack} className="mb-4">
        <ArrowLeft className="mr-2 h-4 w-4" /> Voltar para resultados
      </Button>
      
      <Card className="mt-4 border-t-4 border-t-primary">
        <PaperDetail paper={paper} />
      </Card>
    </div>
  );
};

export default PaperDetailPage;
