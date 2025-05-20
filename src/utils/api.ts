
import { Author, Paper } from '../context/SearchContext';

// Real API functions
export const searchPapers = async (query: string): Promise<Paper[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  if (!query.trim()) return [];
  
  try {
    const response = await fetch(`https://api.semanticscholar.org/graph/v1/paper/search?query=${encodeURIComponent(query)}&fields=paperId,title,authors,year,abstract,citationCount,externalIds&limit=10`);
    
    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`);
    }
    
    const data = await response.json();
    
    if (!data.data) {
      return [];
    }
    
    // Transform the API response to match our expected format
    return data.data.map((paper: any) => ({
      paperId: paper.paperId,
      title: paper.title || "Título não disponível",
      authors: paper.authors?.map((author: any) => author.name) || ["Autores não disponíveis"],
      year: paper.year,
      abstract: paper.abstract,
      citationCount: paper.citationCount,
      doi: paper.externalIds?.DOI || null
    }));
  } catch (error) {
    console.error("Error searching papers:", error);
    throw error;
  }
};

export const searchAuthors = async (query: string): Promise<Author[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  if (!query.trim()) return [];
  
  try {
    const response = await fetch(`https://api.semanticscholar.org/graph/v1/author/search?query=${encodeURIComponent(query)}&fields=authorId,name,affiliations,paperCount,citationCount,hIndex&limit=10`);
    
    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`);
    }
    
    const data = await response.json();
    
    if (!data.data) {
      return [];
    }
    
    // Transform the API response to match our expected format
    return data.data.map((author: any) => ({
      id: author.authorId,
      name: author.name || "Nome não disponível",
      affiliations: author.affiliations || ["Afiliação não disponível"],
      hIndex: author.hIndex,
      totalPublications: author.paperCount,
      totalCitations: author.citationCount,
      educationSummary: author.affiliations?.[0] || "Informação não disponível"
    }));
  } catch (error) {
    console.error("Error searching authors:", error);
    throw error;
  }
};

export const getPaperDetails = async (paperId: string): Promise<Paper | null> => {
  try {
    const response = await fetch(`https://api.semanticscholar.org/graph/v1/paper/${paperId}?fields=paperId,title,abstract,year,authors,citations,references,fieldsOfStudy,externalIds,citationCount`);
    
    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`);
    }
    
    const data = await response.json();
    
    return {
      paperId: data.paperId,
      title: data.title || "Título não disponível",
      abstract: data.abstract || "Resumo não disponível",
      year: data.year,
      authors: data.authors?.map((author: any) => author.name) || [],
      citationCount: data.citationCount,
      doi: data.externalIds?.DOI || "N/A",
      fieldsOfStudy: data.fieldsOfStudy || [],
      references: data.references?.map((ref: any) => ({
        paperId: ref.paperId,
        title: ref.title || "Título não disponível",
        authors: ref.authors?.map((author: any) => author.name) || [],
        year: ref.year
      })) || [],
      recommendedPapers: [] // API doesn't directly provide this
    };
  } catch (error) {
    console.error("Error fetching paper details:", error);
    return null;
  }
};

export const getAuthorDetails = async (authorId: string): Promise<Author | null> => {
  try {
    const response = await fetch(`https://api.semanticscholar.org/graph/v1/author/${authorId}?fields=authorId,name,affiliations,paperCount,citationCount,hIndex,papers`);
    
    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`);
    }
    
    const data = await response.json();
    
    return {
      id: data.authorId,
      name: data.name || "Nome não disponível",
      affiliations: data.affiliations || ["Afiliação não disponível"],
      hIndex: data.hIndex,
      totalPublications: data.paperCount,
      totalCitations: data.citationCount,
      educationSummary: data.affiliations?.[0] || "Informação não disponível",
      publications: data.papers?.map((paper: any) => ({
        paperId: paper.paperId,
        title: paper.title || "Título não disponível",
        authors: paper.authors?.map((author: any) => author.name) || [],
        year: paper.year
      })) || [],
      educationDetails: [],
      professionalExperiences: []
    };
  } catch (error) {
    console.error("Error fetching author details:", error);
    return null;
  }
};

// Mock auth functions (for future implementation)
export const login = async (email: string, password: string) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Mock validation
  if (email === "demo@example.com" && password === "password") {
    return { success: true, token: "mock-token-123" };
  }
  
  throw new Error("Email ou senha incorretos");
};

export const register = async (userData: {
  nome: string;
  sobrenome: string;
  email: string;
  orcidId: string;
  senha: string;
}) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Mock validation
  if (userData.email === "demo@example.com") {
    throw new Error("Este email já está registrado");
  }
  
  return { success: true };
};

export const getUserProfile = async (token: string) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // Mock validation
  if (token !== "mock-token-123") {
    throw new Error("Sessão inválida ou expirada");
  }
  
  return {
    name: "Demo User",
    email: "demo@example.com",
    orcidId: "0000-0000-0000-0000",
    personalPageUrl: "https://orcid.org/0000-0000-0000-0000",
    publications: [
      {
        paperId: 'p10',
        title: 'Demo Publication Title',
        authors: ['Demo User', 'Another Author'],
        year: 2023
      }
    ]
  };
};
