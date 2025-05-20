
import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define types for our search results
export type Author = {
  id: string;
  name: string;
  orcidId?: string;
  affiliations: string[];
  hIndex?: number;
  paperCount?: number;
  citationCount?: number;
  educationDetails?: string[];
  professionalExperiences?: string[];
  personalPageUrl?: string;
  publications?: Paper[];
  totalPublications?: number;
  totalCitations?: number;
  educationSummary?: string;
};

export type Paper = {
  paperId: string;
  title: string;
  authors: string[] | Author[];
  year?: number;
  abstract?: string;
  citationCount?: number;
  references?: Paper[];
  fieldsOfStudy?: string[];
  doi?: string;
  recommendedPapers?: Paper[];
};

interface SearchContextType {
  buscaTipo: 'papers' | 'autores';
  setBuscaTipo: (tipo: 'papers' | 'autores') => void;
  termoBusca: string;
  setTermoBusca: (termo: string) => void;
  resultados: Paper[] | Author[];
  setResultados: (resultados: Paper[] | Author[]) => void;
  carregando: boolean;
  setCarregando: (carregando: boolean) => void;
  erro: string | null;
  setErro: (erro: string | null) => void;
  detalheSelecionado: Paper | Author | null;
  setDetalheSelecionado: (detalhe: Paper | Author | null) => void;
  detalheCarregado: boolean;
  setDetalheCarregado: (carregado: boolean) => void;
  isDetailModalOpen: boolean;
  setDetailModalOpen: (open: boolean) => void;
  isLoginModalOpen: boolean;
  setLoginModalOpen: (open: boolean) => void;
  isRegisterModalOpen: boolean;
  setRegisterModalOpen: (open: boolean) => void;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export const SearchProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [buscaTipo, setBuscaTipo] = useState<'papers' | 'autores'>('papers');
  const [termoBusca, setTermoBusca] = useState('');
  const [resultados, setResultados] = useState<Paper[] | Author[]>([]);
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState<string | null>(null);
  const [detalheSelecionado, setDetalheSelecionado] = useState<Paper | Author | null>(null);
  const [detalheCarregado, setDetalheCarregado] = useState(false);
  const [isDetailModalOpen, setDetailModalOpen] = useState(false);
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setRegisterModalOpen] = useState(false);

  return (
    <SearchContext.Provider
      value={{
        buscaTipo,
        setBuscaTipo,
        termoBusca,
        setTermoBusca,
        resultados,
        setResultados,
        carregando,
        setCarregando,
        erro,
        setErro,
        detalheSelecionado,
        setDetalheSelecionado,
        detalheCarregado,
        setDetalheCarregado,
        isDetailModalOpen,
        setDetailModalOpen,
        isLoginModalOpen,
        setLoginModalOpen,
        isRegisterModalOpen,
        setRegisterModalOpen,
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
