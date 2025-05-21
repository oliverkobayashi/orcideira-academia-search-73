
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getAuthorDetails } from '../utils/api';
import { Author } from '../context/SearchContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "@/hooks/use-toast";
import { ArrowLeft } from 'lucide-react';
import { Button } from "@/components/ui/button";

const AuthorDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [author, setAuthor] = useState<Author | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAuthorDetails = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        const data = await getAuthorDetails(id);
        setAuthor(data);
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

    fetchAuthorDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="container py-8 text-center">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
        <p className="mt-4 text-gray-600">Carregando detalhes do autor...</p>
      </div>
    );
  }

  if (error || !author) {
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
            <CardTitle className="text-xl text-gray-800">{author.name}</CardTitle>
            <CardDescription>
              {author.affiliations.join(', ')}
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {/* ORCID and Personal Page */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {author.orcidId && (
                <div>
                  <h3 className="font-semibold text-gray-700">ORCID ID</h3>
                  <p className="text-gray-600 text-sm">{author.orcidId}</p>
                </div>
              )}
              
              {author.personalPageUrl && (
                <div>
                  <h3 className="font-semibold text-gray-700">Página Pessoal</h3>
                  <a 
                    href={author.personalPageUrl} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-primary hover:underline text-sm"
                  >
                    {author.personalPageUrl}
                  </a>
                </div>
              )}
            </div>
            
            {/* Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {author.hIndex !== undefined && (
                <div className="bg-primary-light p-3 rounded-lg shadow-sm">
                  <h3 className="font-semibold text-gray-700">Índice H</h3>
                  <p className="text-xl font-bold text-primary mt-1">{author.hIndex}</p>
                </div>
              )}
              
              {author.totalPublications !== undefined && (
                <div className="bg-primary-light p-3 rounded-lg shadow-sm">
                  <h3 className="font-semibold text-gray-700">Publicações</h3>
                  <p className="text-xl font-bold text-primary mt-1">{author.totalPublications}</p>
                </div>
              )}
              
              {author.totalCitations !== undefined && (
                <div className="bg-primary-light p-3 rounded-lg shadow-sm">
                  <h3 className="font-semibold text-gray-700">Citações</h3>
                  <p className="text-xl font-bold text-primary mt-1">{author.totalCitations}</p>
                </div>
              )}
            </div>
            
            {/* Education */}
            {author.educationDetails && author.educationDetails.length > 0 && (
              <div>
                <Separator className="my-4" />
                <h3 className="font-semibold text-gray-700 mb-2">Formação Acadêmica</h3>
                <ul className="space-y-2">
                  {author.educationDetails.map((education, index) => (
                    <li key={index} className="text-sm text-gray-600">
                      • {education}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            {/* Professional Experience */}
            {author.professionalExperiences && author.professionalExperiences.length > 0 && (
              <div>
                <Separator className="my-4" />
                <h3 className="font-semibold text-gray-700 mb-2">Experiências Profissionais</h3>
                <ul className="space-y-2">
                  {author.professionalExperiences.map((experience, index) => (
                    <li key={index} className="text-sm text-gray-600">
                      • {experience}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            {/* Publications */}
            {author.publications && author.publications.length > 0 && (
              <div>
                <Separator className="my-4" />
                <h3 className="font-semibold text-gray-700 mb-2">Publicações ({author.publications.length})</h3>
                <ul className="space-y-3">
                  {author.publications.map((publication, index) => (
                    <li key={publication.paperId || index} className="text-sm">
                      <div className="font-medium text-gray-700">{publication.title}</div>
                      <div className="text-gray-500">
                        {typeof publication.authors === 'string' ? 
                          publication.authors : 
                          (Array.isArray(publication.authors) ? 
                            (typeof publication.authors[0] === 'string' ? 
                              publication.authors.join(', ') : 
                              publication.authors.map((a: any) => a.name).join(', ')) : 
                            '')}
                        {publication.year && <span> ({publication.year})</span>}
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

export default AuthorDetailPage;
