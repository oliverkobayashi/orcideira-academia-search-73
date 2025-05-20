
import React from 'react';
import { Author } from '../context/SearchContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";

interface AuthorDetailProps {
  author: Author;
}

const AuthorDetail: React.FC<AuthorDetailProps> = ({ author }) => {
  return (
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
            <div className="bg-gray-50 p-3 rounded-lg shadow-sm">
              <h3 className="font-semibold text-gray-700">Índice H</h3>
              <p className="text-xl font-bold text-primary mt-1">{author.hIndex}</p>
            </div>
          )}
          
          {author.totalPublications !== undefined && (
            <div className="bg-gray-50 p-3 rounded-lg shadow-sm">
              <h3 className="font-semibold text-gray-700">Publicações</h3>
              <p className="text-xl font-bold text-primary mt-1">{author.totalPublications}</p>
            </div>
          )}
          
          {author.totalCitations !== undefined && (
            <div className="bg-gray-50 p-3 rounded-lg shadow-sm">
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
  );
};

export default AuthorDetail;
