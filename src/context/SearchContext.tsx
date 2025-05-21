
import React, { createContext, useContext, useState } from 'react';

export interface Paper {
  paperId: string;
  title: string;
  authors: string[] | {name: string}[];
  year?: number;
  abstract?: string;
  citationCount?: number;
  fieldsOfStudy?: string[];
  doi?: string;
  references?: Paper[];
}

export interface Author {
  id: string;
  name: string;
  orcidId?: string;
  affiliations: string[];
  hIndex?: number;
  totalPublications?: number;
  totalCitations?: number;
  educationSummary?: string;
  educationDetails?: string[];
  professionalExperiences?: string[];
  personalPageUrl?: string;
  publications?: Paper[];
  biography?: string;
}

export type SearchType = 'papers' | 'authors';

interface SearchContextType {
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  searchType: SearchType;
  setSearchType: React.Dispatch<React.SetStateAction<SearchType>>;
  papers: Paper[];
  setPapers: React.Dispatch<React.SetStateAction<Paper[]>>;
  authors: Author[];
  setAuthors: React.Dispatch<React.SetStateAction<Author[]>>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  error: string | null;
  setError: React.Dispatch<React.SetStateAction<string | null>>;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export const SearchProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [searchType, setSearchType] = useState<SearchType>('papers');
  const [papers, setPapers] = useState<Paper[]>([]);
  const [authors, setAuthors] = useState<Author[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  return (
    <SearchContext.Provider 
      value={{
        searchTerm,
        setSearchTerm,
        searchType,
        setSearchType,
        papers,
        setPapers,
        authors,
        setAuthors,
        loading,
        setLoading,
        error,
        setError,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => {
  const context = useContext(SearchContext);
  if (context === undefined) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
};
