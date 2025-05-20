
import { Author, Paper } from '../context/SearchContext';

// Mock data for papers
const mockPapers: Paper[] = [
  {
    paperId: 'p1',
    title: 'The Impact of Machine Learning on Climate Change Research',
    authors: ['Maria Silva', 'João Costa', 'Carlos Oliveira'],
    year: 2023,
    abstract: 'Este artigo explora como técnicas de aprendizado de máquina podem ser aplicadas para melhorar a precisão de modelos climáticos e auxiliar pesquisadores na compreensão das mudanças climáticas.',
    citationCount: 45,
    doi: '10.1234/example-doi-2023',
    fieldsOfStudy: ['Machine Learning', 'Climate Science', 'Environmental Research'],
    references: [],
    recommendedPapers: [],
  },
  {
    paperId: 'p2',
    title: 'Advançando a Pesquisa em Saúde através de Análise de Big Data',
    authors: ['Ana Souza', 'Pedro Santos', 'Lucia Mendes'],
    year: 2022,
    abstract: 'Uma análise de como técnicas de big data estão transformando pesquisas em saúde pública e medicina personalizada no Brasil.',
    citationCount: 28,
    doi: '10.1234/example-doi-2022',
    fieldsOfStudy: ['Big Data', 'Healthcare', 'Public Health'],
    references: [],
    recommendedPapers: [],
  },
  {
    paperId: 'p3',
    title: 'Impactos da Pandemia na Educação Superior Brasileira',
    authors: ['Roberto Almeida', 'Carla Lima'],
    year: 2021,
    abstract: 'Este estudo examina as mudanças na educação superior brasileira durante a pandemia, com foco em adaptações tecnológicas e pedagógicas.',
    citationCount: 67,
    doi: '10.1234/example-doi-2021',
    fieldsOfStudy: ['Education', 'Remote Learning', 'Pandemic Studies'],
    references: [],
    recommendedPapers: [],
  },
];

// Mock data for paper details (with references and recommendations)
const mockPaperDetails: { [key: string]: Paper } = {
  p1: {
    paperId: 'p1',
    title: 'The Impact of Machine Learning on Climate Change Research',
    authors: ['Maria Silva', 'João Costa', 'Carlos Oliveira'],
    year: 2023,
    abstract: 'Este artigo explora como técnicas de aprendizado de máquina podem ser aplicadas para melhorar a precisão de modelos climáticos e auxiliar pesquisadores na compreensão das mudanças climáticas. Utilizando redes neurais e processamento de imagens de satélite, desenvolvemos um novo modelo para prever padrões meteorológicos com maior precisão que modelos anteriores.',
    citationCount: 45,
    doi: '10.1234/example-doi-2023',
    fieldsOfStudy: ['Machine Learning', 'Climate Science', 'Environmental Research'],
    references: [
      {
        paperId: 'ref1',
        title: 'Neural Networks for Climate Pattern Recognition',
        authors: ['Michael Johnson', 'Sarah Lee'],
        year: 2021
      },
      {
        paperId: 'ref2',
        title: 'Satellite Imagery Processing Techniques',
        authors: ['Robert Smith', 'Jenny Chen'],
        year: 2020
      }
    ],
    recommendedPapers: [
      {
        paperId: 'rec1',
        title: 'Applications of Deep Learning in Environmental Science',
        authors: ['David Wang', 'Amanda Rodriguez'],
        year: 2022
      },
      {
        paperId: 'rec2',
        title: 'Forecasting Extreme Weather Events with AI',
        authors: ['Thomas Brown', 'Lisa Garcia'],
        year: 2023
      }
    ]
  },
  p2: {
    paperId: 'p2',
    title: 'Advançando a Pesquisa em Saúde através de Análise de Big Data',
    authors: ['Ana Souza', 'Pedro Santos', 'Lucia Mendes'],
    year: 2022,
    abstract: 'Uma análise de como técnicas de big data estão transformando pesquisas em saúde pública e medicina personalizada no Brasil. Através da integração de dados de hospitais públicos e privados, identificamos padrões que podem auxiliar na prevenção e tratamento de doenças crônicas em populações vulneráveis.',
    citationCount: 28,
    doi: '10.1234/example-doi-2022',
    fieldsOfStudy: ['Big Data', 'Healthcare', 'Public Health'],
    references: [
      {
        paperId: 'ref3',
        title: 'Big Data in Brazilian Healthcare',
        authors: ['Carlos Ferreira', 'Julia Alves'],
        year: 2020
      },
      {
        paperId: 'ref4',
        title: 'Machine Learning Applications in Personalized Medicine',
        authors: ['Daniel Castro', 'Patricia Nunes'],
        year: 2021
      }
    ],
    recommendedPapers: [
      {
        paperId: 'rec3',
        title: 'Predicting Disease Outbreaks Using Social Media Data',
        authors: ['Mark Wilson', 'Emma Martinez'],
        year: 2022
      },
      {
        paperId: 'rec4',
        title: 'Ethical Considerations in Healthcare Data Analytics',
        authors: ['Sofia Torres', 'Luiz Pereira'],
        year: 2023
      }
    ]
  },
  p3: {
    paperId: 'p3',
    title: 'Impactos da Pandemia na Educação Superior Brasileira',
    authors: ['Roberto Almeida', 'Carla Lima'],
    year: 2021,
    abstract: 'Este estudo examina as mudanças na educação superior brasileira durante a pandemia, com foco em adaptações tecnológicas e pedagógicas. Nossa pesquisa com mais de 100 instituições revela disparidades significativas no acesso à educação remota e sugere estratégias para melhorar a equidade educacional em situações de crise.',
    citationCount: 67,
    doi: '10.1234/example-doi-2021',
    fieldsOfStudy: ['Education', 'Remote Learning', 'Pandemic Studies'],
    references: [
      {
        paperId: 'ref5',
        title: 'Higher Education Response to COVID-19',
        authors: ['James Miller', 'Elena Gonzalez'],
        year: 2020
      },
      {
        paperId: 'ref6',
        title: 'Digital Divide in Brazilian Education',
        authors: ['Fernando Silva', 'Beatriz Santos'],
        year: 2019
      }
    ],
    recommendedPapers: [
      {
        paperId: 'rec5',
        title: 'Post-Pandemic Strategies for Educational Institutions',
        authors: ['Richard Taylor', 'Monica Hernandez'],
        year: 2022
      },
      {
        paperId: 'rec6',
        title: 'Technology Adoption in Higher Education: Lessons from the Pandemic',
        authors: ['Paulo Ribeiro', 'Natalia Costa'],
        year: 2023
      }
    ]
  }
};

// Mock data for authors
const mockAuthors: Author[] = [
  {
    id: 'a1',
    name: 'Maria Silva',
    orcidId: '0000-0001-2345-6789',
    affiliations: ['Universidade de São Paulo', 'Instituto de Pesquisas Climáticas'],
    hIndex: 24,
    paperCount: 56,
    citationCount: 1250,
    educationDetails: ['PhD em Ciência da Computação, Universidade de São Paulo, 2010', 'Mestrado em Inteligência Artificial, Universidade Federal do Rio de Janeiro, 2006'],
    professionalExperiences: ['Professora Associada, USP, 2015-presente', 'Pesquisadora Visitante, MIT, 2012-2014'],
    personalPageUrl: 'https://www.exemplo.com.br/mariasilva',
    publications: [],
    totalPublications: 56,
    totalCitations: 1250,
    educationSummary: 'PhD em Ciência da Computação (USP)',
  },
  {
    id: 'a2',
    name: 'Carlos Oliveira',
    orcidId: '0000-0002-3456-7890',
    affiliations: ['Universidade Federal de Minas Gerais', 'Centro de Desenvolvimento Tecnológico'],
    hIndex: 18,
    paperCount: 42,
    citationCount: 980,
    educationDetails: ['PhD em Engenharia de Software, Stanford University, 2008', 'Mestrado em Computação, UFMG, 2004'],
    professionalExperiences: ['Professor Titular, UFMG, 2016-presente', 'Engenheiro de Software Sênior, Google, 2010-2015'],
    personalPageUrl: 'https://www.exemplo.com.br/carlosoliveira',
    publications: [],
    totalPublications: 42,
    totalCitations: 980,
    educationSummary: 'PhD em Engenharia de Software (Stanford)',
  },
  {
    id: 'a3',
    name: 'Ana Souza',
    orcidId: '0000-0003-4567-8901',
    affiliations: ['Universidade Federal do Rio de Janeiro', 'Instituto Nacional de Pesquisas em Saúde'],
    hIndex: 32,
    paperCount: 78,
    citationCount: 2100,
    educationDetails: ['PhD em Saúde Pública, Harvard University, 2005', 'Mestrado em Epidemiologia, UFRJ, 2001'],
    professionalExperiences: ['Diretora de Pesquisa, Instituto Nacional de Pesquisas em Saúde, 2018-presente', 'Professora Associada, UFRJ, 2010-2018'],
    personalPageUrl: 'https://www.exemplo.com.br/anasouza',
    publications: [],
    totalPublications: 78,
    totalCitations: 2100,
    educationSummary: 'PhD em Saúde Pública (Harvard)',
  },
];

// Mock data for author details (with publications)
const mockAuthorDetails: { [key: string]: Author } = {
  a1: {
    id: 'a1',
    name: 'Maria Silva',
    orcidId: '0000-0001-2345-6789',
    affiliations: ['Universidade de São Paulo', 'Instituto de Pesquisas Climáticas'],
    hIndex: 24,
    paperCount: 56,
    citationCount: 1250,
    educationDetails: ['PhD em Ciência da Computação, Universidade de São Paulo, 2010', 'Mestrado em Inteligência Artificial, Universidade Federal do Rio de Janeiro, 2006', 'Bacharel em Ciência da Computação, UNICAMP, 2004'],
    professionalExperiences: ['Professora Associada, USP, 2015-presente', 'Pesquisadora Visitante, MIT, 2012-2014', 'Professora Assistente, UNICAMP, 2010-2012'],
    personalPageUrl: 'https://www.exemplo.com.br/mariasilva',
    publications: [
      {
        paperId: 'p1',
        title: 'The Impact of Machine Learning on Climate Change Research',
        authors: ['Maria Silva', 'João Costa', 'Carlos Oliveira'],
        year: 2023
      },
      {
        paperId: 'p4',
        title: 'Neural Networks for Environmental Monitoring',
        authors: ['Maria Silva', 'Fernanda Lopes'],
        year: 2021
      },
      {
        paperId: 'p5',
        title: 'AI Applications in Sustainability',
        authors: ['Maria Silva', 'Roberto Almeida', 'José Santos'],
        year: 2020
      }
    ],
    totalPublications: 56,
    totalCitations: 1250,
    educationSummary: 'PhD em Ciência da Computação (USP)',
  },
  a2: {
    id: 'a2',
    name: 'Carlos Oliveira',
    orcidId: '0000-0002-3456-7890',
    affiliations: ['Universidade Federal de Minas Gerais', 'Centro de Desenvolvimento Tecnológico'],
    hIndex: 18,
    paperCount: 42,
    citationCount: 980,
    educationDetails: ['PhD em Engenharia de Software, Stanford University, 2008', 'Mestrado em Computação, UFMG, 2004', 'Bacharel em Ciência da Computação, UFMG, 2002'],
    professionalExperiences: ['Professor Titular, UFMG, 2016-presente', 'Engenheiro de Software Sênior, Google, 2010-2015', 'Pesquisador, IBM Research Brazil, 2008-2010'],
    personalPageUrl: 'https://www.exemplo.com.br/carlosoliveira',
    publications: [
      {
        paperId: 'p1',
        title: 'The Impact of Machine Learning on Climate Change Research',
        authors: ['Maria Silva', 'João Costa', 'Carlos Oliveira'],
        year: 2023
      },
      {
        paperId: 'p6',
        title: 'Software Engineering Practices for Research Code',
        authors: ['Carlos Oliveira', 'Patricia Lima'],
        year: 2020
      },
      {
        paperId: 'p7',
        title: 'Efficient Algorithms for Large-Scale Data Analysis',
        authors: ['Carlos Oliveira', 'Miguel Fernandez', 'Julia Alves'],
        year: 2019
      }
    ],
    totalPublications: 42,
    totalCitations: 980,
    educationSummary: 'PhD em Engenharia de Software (Stanford)',
  },
  a3: {
    id: 'a3',
    name: 'Ana Souza',
    orcidId: '0000-0003-4567-8901',
    affiliations: ['Universidade Federal do Rio de Janeiro', 'Instituto Nacional de Pesquisas em Saúde'],
    hIndex: 32,
    paperCount: 78,
    citationCount: 2100,
    educationDetails: ['PhD em Saúde Pública, Harvard University, 2005', 'Mestrado em Epidemiologia, UFRJ, 2001', 'Bacharel em Medicina, UFRJ, 1999'],
    professionalExperiences: ['Diretora de Pesquisa, Instituto Nacional de Pesquisas em Saúde, 2018-presente', 'Professora Associada, UFRJ, 2010-2018', 'Consultora, Organização Mundial da Saúde, 2007-2010'],
    personalPageUrl: 'https://www.exemplo.com.br/anasouza',
    publications: [
      {
        paperId: 'p2',
        title: 'Advançando a Pesquisa em Saúde através de Análise de Big Data',
        authors: ['Ana Souza', 'Pedro Santos', 'Lucia Mendes'],
        year: 2022
      },
      {
        paperId: 'p8',
        title: 'Epidemiological Analysis of Disease Patterns in Brazil',
        authors: ['Ana Souza', 'Rafael Costa'],
        year: 2020
      },
      {
        paperId: 'p9',
        title: 'Public Health Interventions: A Systematic Review',
        authors: ['Ana Souza', 'Mariana Rodrigues', 'Eduardo Nunes'],
        year: 2018
      }
    ],
    totalPublications: 78,
    totalCitations: 2100,
    educationSummary: 'PhD em Saúde Pública (Harvard)',
  }
};

// Mock API functions
export const searchPapers = async (query: string): Promise<Paper[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  if (!query.trim()) return [];
  
  // Simple case-insensitive search in title and authors
  return mockPapers.filter(paper => 
    paper.title.toLowerCase().includes(query.toLowerCase()) ||
    paper.authors.some(author => 
      typeof author === 'string' ? 
        author.toLowerCase().includes(query.toLowerCase()) : 
        author.name.toLowerCase().includes(query.toLowerCase())
    )
  );
};

export const searchAuthors = async (query: string): Promise<Author[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  if (!query.trim()) return [];
  
  // Simple case-insensitive search in name and affiliations
  return mockAuthors.filter(author => 
    author.name.toLowerCase().includes(query.toLowerCase()) ||
    author.affiliations.some(affiliation => 
      affiliation.toLowerCase().includes(query.toLowerCase())
    )
  );
};

export const getPaperDetails = async (paperId: string): Promise<Paper | null> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  return mockPaperDetails[paperId] || null;
};

export const getAuthorDetails = async (authorId: string): Promise<Author | null> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  return mockAuthorDetails[authorId] || null;
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
