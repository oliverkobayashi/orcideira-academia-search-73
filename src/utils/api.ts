
import { Paper, Author } from '../context/SearchContext';

const API_BASE_URL = 'https://api.semanticscholar.org/graph/v1';

// Transforma os dados do paper vindo da API para o formato que usamos internamente
const transformPaperData = (paperData: any): Paper => {
  return {
    paperId: paperData.paperId,
    title: paperData.title || 'Sem título',
    authors: Array.isArray(paperData.authors)
      ? paperData.authors.map((author: any) => (typeof author === 'string' ? author : author.name))
      : [],
    year: paperData.year,
    abstract: paperData.abstract,
    citationCount: paperData.citationCount,
    fieldsOfStudy: paperData.fieldsOfStudy || [],
    doi: paperData.externalIds?.DOI || '',
    references: Array.isArray(paperData.references) ? paperData.references.map(transformPaperData) : [],
    recommendedPapers: Array.isArray(paperData.recommendedPapers) ? paperData.recommendedPapers.map(transformPaperData) : [],
  };
};

// Transforma os dados do autor vindo da API para o formato que usamos internamente
const transformAuthorData = (authorData: any): Author => {
  return {
    id: authorData.authorId || authorData.id,
    name: authorData.name || 'Nome não disponível',
    orcidId: authorData.externalIds?.ORCID || '',
    affiliations: Array.isArray(authorData.affiliations) ? authorData.affiliations : [],
    hIndex: authorData.hIndex,
    totalPublications: authorData.paperCount,
    totalCitations: authorData.citationCount,
    educationSummary: authorData.education || '',
    educationDetails: authorData.educationalDetails || [],
    professionalExperiences: authorData.experiences || [],
    personalPageUrl: authorData.homepage || '',
    publications: Array.isArray(authorData.papers) ? authorData.papers.map(transformPaperData) : [],
  };
};

// Função para buscar papers
export const searchPapers = async (query: string): Promise<Paper[]> => {
  try {
    console.log(`Fazendo busca de papers com query: ${query}`);
    const response = await fetch(
      `${API_BASE_URL}/paper/search?query=${encodeURIComponent(query)}&fields=paperId,title,authors,citationCount,year,abstract,externalIds&limit=10`
    );
    
    if (!response.ok) {
      throw new Error(`Erro na busca: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    console.log('Resultados da API de papers:', data);
    
    if (!data.data || !Array.isArray(data.data)) {
      return [];
    }
    
    return data.data.map(transformPaperData);
  } catch (error) {
    console.error('Erro ao buscar papers:', error);
    throw error;
  }
};

// Função para buscar autores
export const searchAuthors = async (query: string): Promise<Author[]> => {
  try {
    console.log(`Fazendo busca de autores com query: ${query}`);
    const response = await fetch(
      `${API_BASE_URL}/author/search?query=${encodeURIComponent(query)}&fields=authorId,name,affiliations,homepage,papers,hIndex,paperCount,citationCount,externalIds&limit=10`
    );
    
    if (!response.ok) {
      throw new Error(`Erro na busca: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    console.log('Resultados da API de autores:', data);
    
    if (!data.data || !Array.isArray(data.data)) {
      return [];
    }
    
    return data.data.map(transformAuthorData);
  } catch (error) {
    console.error('Erro ao buscar autores:', error);
    throw error;
  }
};

// Função para buscar detalhes de um paper específico
export const getPaperDetails = async (paperId: string): Promise<Paper | null> => {
  try {
    console.log(`Buscando detalhes do paper ID: ${paperId}`);
    const response = await fetch(
      `${API_BASE_URL}/paper/${paperId}?fields=paperId,title,authors,citationCount,year,abstract,references,fieldsOfStudy,externalIds,recommendedPapers`
    );
    
    if (!response.ok) {
      throw new Error(`Erro ao buscar detalhes: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    console.log('Detalhes do paper obtidos:', data);
    return transformPaperData(data);
  } catch (error) {
    console.error('Erro ao buscar detalhes do paper:', error);
    throw error;
  }
};

// Função para buscar detalhes de um autor específico
export const getAuthorDetails = async (authorId: string): Promise<Author | null> => {
  try {
    console.log(`Buscando detalhes do autor ID: ${authorId}`);
    const response = await fetch(
      `${API_BASE_URL}/author/${authorId}?fields=authorId,name,affiliations,homepage,papers,hIndex,paperCount,citationCount,externalIds`
    );
    
    if (!response.ok) {
      throw new Error(`Erro ao buscar detalhes: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    console.log('Detalhes do autor obtidos:', data);
    return transformAuthorData(data);
  } catch (error) {
    console.error('Erro ao buscar detalhes do autor:', error);
    throw error;
  }
};
