
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getPaperDetails } from '../utils/api';
import { Paper } from '../context/SearchContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "@/hooks/use-toast";
import { ArrowLeft } from 'lucide-react';
import { Button } from "@/components/ui/button";

const PaperDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [paper, setPaper] = useState<Paper | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
        <Button className="mt-4" variant="outline" onClick={() => window.close()}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Voltar
        </Button>
      </div>
    );
  }

  return (
    <div className="container py-8">
      <Button variant="outline" onClick={() => window.close()} className="mb-4">
        <ArrowLeft className="mr-2 h-4 w-4" /> Voltar para resultados
      </Button>
      
      <Card className="mt-4 border-t-4 border-t-primary">
        <ScrollArea className="max-h-[80vh] overflow-auto pr-4">
          <CardHeader>
            <CardTitle className="text-xl text-gray-800">{paper.title}</CardTitle>
            <CardDescription>
              {paper.authors.join(', ')}
              {paper.year ? ` (${paper.year})` : ''}
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {/* Abstract */}
            {paper.abstract && (
              <div>
                <h3 className="font-semibold text-gray-700 mb-2">Resumo</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{paper.abstract}</p>
              </div>
            )}
            
            {/* Metadata */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {paper.doi && (
                <div>
                  <h3 className="font-semibold text-gray-700">DOI</h3>
                  <p className="text-gray-600 text-sm">{paper.doi}</p>
                </div>
              )}
              
              {paper.citationCount !== undefined && (
                <div>
                  <h3 className="font-semibold text-gray-700">Citações</h3>
                  <p className="text-gray-600 text-sm">{paper.citationCount}</p>
                </div>
              )}
              
              {paper.fieldsOfStudy && paper.fieldsOfStudy.length > 0 && (
                <div className="col-span-2">
                  <h3 className="font-semibold text-gray-700">Áreas de Estudo</h3>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {paper.fieldsOfStudy.map(field => (
                      <span 
                        key={field} 
                        className="inline-block px-2 py-1 bg-primary-light text-primary-dark text-xs rounded-full"
                      >
                        {field}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            {/* References */}
            {paper.references && paper.references.length > 0 && (
              <div>
                <Separator className="my-4" />
                <h3 className="font-semibold text-gray-700 mb-2">Referências ({paper.references.length})</h3>
                <ul className="space-y-2">
                  {paper.references.map((ref, index) => (
                    <li key={ref.paperId || index} className="text-sm text-gray-600">
                      {index + 1}. {ref.title}
                      {ref.authors && ref.authors.length > 0 && (
                        <span> - {typeof ref.authors[0] === 'string' ? 
                          ref.authors.join(', ') : 
                          ref.authors.map((a: any) => a.name).join(', ')}
                        </span>
                      )}
                      {ref.year && <span> ({ref.year})</span>}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            {/* Recommended Papers */}
            {paper.recommendedPapers && paper.recommendedPapers.length > 0 && (
              <div>
                <Separator className="my-4" />
                <h3 className="font-semibold text-gray-700 mb-2">Artigos Recomendados</h3>
                <ul className="space-y-2">
                  {paper.recommendedPapers.map((rec, index) => (
                    <li key={rec.paperId || index} className="text-sm text-gray-600">
                      <div className="font-medium">{rec.title}</div>
                      <div className="text-gray-500">
                        {typeof rec.authors[0] === 'string' ? 
                          rec.authors.join(', ') : 
                          rec.authors.map((a: any) => a.name).join(', ')}
                        {rec.year && <span> ({rec.year})</span>}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </CardContent>
        </ScrollArea>
      </Card>
    </div>
  );
};

export default PaperDetailPage;
