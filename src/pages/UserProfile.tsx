import React, { useEffect } from 'react';
import { useSearch } from '../context/SearchContext';
import { getUserByEmail } from '../utils/userStorage';
import { useUserPreferences } from '../hooks/useUserPreferences';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, BookmarkCheck, UserCheck, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const UserProfile: React.FC = () => {
  const { currentUser, isAuthenticated } = useSearch();
  const navigate = useNavigate();
  const userPreferences = useUserPreferences(currentUser?.id || '');

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/');
      return;
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated || !currentUser) {
    return null;
  }

  const fullUser = getUserByEmail(currentUser.email);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header do Perfil */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center">
                <User className="w-8 h-8 text-white" />
              </div>
              <div>
                <CardTitle className="text-2xl">
                  {currentUser.nome} {currentUser.sobrenome}
                </CardTitle>
                <p className="text-gray-600">{currentUser.email}</p>
                {currentUser.orcidId ? (
                  <Badge variant="secondary" className="mt-2">
                    ORCID: {currentUser.orcidId}
                  </Badge>
                ) : (
                  <Badge variant="outline" className="mt-2">
                    Sem ORCID ID
                  </Badge>
                )}
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Tabs do Perfil */}
        <Tabs defaultValue="publications" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="publications" className="flex items-center gap-2">
              <BookmarkCheck size={16} />
              Publicações
            </TabsTrigger>
            <TabsTrigger value="favorites" className="flex items-center gap-2">
              <BookmarkCheck size={16} />
              Favoritos
            </TabsTrigger>
            <TabsTrigger value="following" className="flex items-center gap-2">
              <Users size={16} />
              Seguindo
            </TabsTrigger>
          </TabsList>

          <TabsContent value="publications" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Suas Publicações</CardTitle>
              </CardHeader>
              <CardContent>
                {!currentUser.orcidId ? (
                  <div className="text-center py-8">
                    <BookmarkCheck className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">Sem dados</p>
                    <p className="text-sm text-gray-500 mt-2">
                      Adicione seu ORCID ID para visualizar suas publicações
                    </p>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <BookmarkCheck className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">
                      Funcionalidade de integração com ORCID em desenvolvimento
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="favorites" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Artigos Favoritados</CardTitle>
              </CardHeader>
              <CardContent>
                {userPreferences?.favoritePapers?.length > 0 ? (
                  <div className="space-y-4">
                    {userPreferences.favoritePapers.map((paper) => (
                      <div key={paper.id} className="p-4 border rounded-lg">
                        <h4 className="font-medium">{paper.title}</h4>
                        {paper.authors && paper.authors.length > 0 && (
                          <p className="text-sm text-gray-600 mt-1">
                            Autores: {paper.authors.join(', ')}
                          </p>
                        )}
                        <p className="text-xs text-gray-500 mt-1">ID: {paper.id}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <BookmarkCheck className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">Nenhum artigo favoritado ainda</p>
                    <p className="text-sm text-gray-500 mt-2">
                      Favorite artigos durante suas buscas para vê-los aqui
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="following" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Autores Seguidos</CardTitle>
              </CardHeader>
              <CardContent>
                {userPreferences?.followedAuthors?.length > 0 ? (
                  <div className="space-y-4">
                    {userPreferences.followedAuthors.map((author) => (
                      <div key={author.id} className="p-4 border rounded-lg">
                        <h4 className="font-medium">{author.name}</h4>
                        {author.affiliations && author.affiliations.length > 0 && (
                          <p className="text-sm text-gray-600 mt-1">
                            Afiliação: {author.affiliations.join(', ')}
                          </p>
                        )}
                        <p className="text-xs text-gray-500 mt-1">ID: {author.id}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <UserCheck className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">Não está seguindo nenhum autor ainda</p>
                    <p className="text-sm text-gray-500 mt-2">
                      Siga autores durante suas buscas para vê-los aqui
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="mt-8 text-center">
          <Button variant="outline" onClick={() => navigate('/')}>
            Voltar à Busca
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
