
import React from 'react';
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useSearch } from '../context/SearchContext';
import PaperDetail from './PaperDetail';
import AuthorDetail from './AuthorDetail';
import { Paper, Author } from '../context/SearchContext';

const DetailModal: React.FC = () => {
  const {
    buscaTipo,
    detalheSelecionado,
    detalheCarregado,
    isDetailModalOpen,
    setDetailModalOpen,
  } = useSearch();

  // Show loading while fetching details
  if (!detalheCarregado || !detalheSelecionado) {
    return (
      <Dialog open={isDetailModalOpen} onOpenChange={setDetailModalOpen}>
        <DialogContent className="sm:max-w-[700px] max-h-[90vh]">
          <div className="flex justify-center items-center py-12">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
            <p className="ml-4 text-gray-600">Carregando detalhes...</p>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isDetailModalOpen} onOpenChange={setDetailModalOpen}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] p-0">
        {buscaTipo === 'papers' ? (
          <PaperDetail paper={detalheSelecionado as Paper} />
        ) : (
          <AuthorDetail author={detalheSelecionado as Author} />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default DetailModal;
