
import React from 'react';
import { Search } from 'lucide-react';
import { useSearch } from '../context/SearchContext';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { searchPapers, searchAuthors } from '../utils/api';

const SearchBar: React.FC = () => {
  const {
    buscaTipo,
    setBuscaTipo,
    termoBusca,
    setTermoBusca,
    setResultados,
    setCarregando,
    setErro,
  } = useSearch();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!termoBusca.trim()) {
      setErro("Digite um termo para buscar");
      return;
    }

    setCarregando(true);
    setErro(null);
    
    try {
      let results;
      if (buscaTipo === 'papers') {
        results = await searchPapers(termoBusca);
      } else {
        results = await searchAuthors(termoBusca);
      }
      
      setResultados(results);
      
      if (results.length === 0) {
        setErro(`Nenhum resultado encontrado para "${termoBusca}"`);
      }
    } catch (error) {
      setErro(`Erro ao buscar: ${error instanceof Error ? error.message : 'Erro desconhecido'}`);
      setResultados([]);
    } finally {
      setCarregando(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-3xl mx-auto mt-8 mb-8">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-shrink-0">
          <Select
            value={buscaTipo}
            onValueChange={(value) => setBuscaTipo(value as 'papers' | 'autores')}
          >
            <SelectTrigger className="w-36">
              <SelectValue placeholder="Buscar por" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="papers">Publicações</SelectItem>
              <SelectItem value="autores">Autores</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="flex flex-1 gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={18} />
            <Input
              type="text"
              placeholder={buscaTipo === 'papers' ? "Buscar publicações por título, autor..." : "Buscar pesquisadores por nome, instituição..."}
              value={termoBusca}
              onChange={(e) => setTermoBusca(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <Button type="submit" className="bg-primary hover:bg-primary-dark">
            Buscar
          </Button>
        </div>
      </div>
    </form>
  );
};

export default SearchBar;
