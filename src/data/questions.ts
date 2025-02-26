import { Question, Category } from '../types';

export const categories: Category[] = [
  { id: 'data', name: 'Data Infrastructure & Quality', weight: 0.2 },
  { id: 'tech', name: 'Technical Capabilities', weight: 0.15 },
  { id: 'strategy', name: 'AI Strategy & Vision', weight: 0.15 },
  { id: 'talent', name: 'Talent & Skills', weight: 0.15 },
  { id: 'governance', name: 'AI Governance & Ethics', weight: 0.15 },
  { id: 'culture', name: 'Organizational Culture', weight: 0.1 },
  { id: 'resources', name: 'Resources & Investment', weight: 0.1 }
];

export const questions: Question[] = [
  // Data Infrastructure & Quality
  {
    id: 'data_1',
    category: 'data',
    text: 'How would you rate your organization\'s data quality and accessibility?',
    options: [
      { value: 1, label: 'Poor data quality with limited accessibility' },
      { value: 2, label: 'Basic data collection with some structure' },
      { value: 3, label: 'Good quality data with moderate accessibility' },
      { value: 4, label: 'High-quality data with proper governance' },
      { value: 5, label: 'Excellent data quality with full accessibility' }
    ]
  },
  {
    id: 'data_2',
    category: 'data',
    text: 'What is the state of your data integration and standardization?',
    options: [
      { value: 1, label: 'Siloed data with no integration' },
      { value: 2, label: 'Basic data integration efforts' },
      { value: 3, label: 'Partial integration across systems' },
      { value: 4, label: 'Well-integrated data ecosystem' },
      { value: 5, label: 'Fully integrated and standardized data' }
    ]
  },
  {
    id: 'data_3',
    category: 'data',
    text: 'How mature is your data governance framework?',
    options: [
      { value: 1, label: 'No formal governance' },
      { value: 2, label: 'Basic data policies' },
      { value: 3, label: 'Established governance framework' },
      { value: 4, label: 'Comprehensive data governance' },
      { value: 5, label: 'Advanced governance with continuous improvement' }
    ]
  },

  // Technical Capabilities
  {
    id: 'tech_1',
    category: 'tech',
    text: 'What is your current level of AI/ML infrastructure?',
    options: [
      { value: 1, label: 'No AI infrastructure in place' },
      { value: 2, label: 'Basic tools and limited computing resources' },
      { value: 3, label: 'Moderate infrastructure with some AI capabilities' },
      { value: 4, label: 'Advanced infrastructure with cloud integration' },
      { value: 5, label: 'State-of-the-art AI infrastructure' }
    ]
  },
  {
    id: 'tech_2',
    category: 'tech',
    text: 'How advanced is your ML/AI model development capability?',
    options: [
      { value: 1, label: 'No ML/AI development capability' },
      { value: 2, label: 'Basic model development' },
      { value: 3, label: 'Regular model development and deployment' },
      { value: 4, label: 'Advanced modeling capabilities' },
      { value: 5, label: 'Cutting-edge AI research and development' }
    ]
  },
  {
    id: 'tech_3',
    category: 'tech',
    text: 'What is your level of AI automation and integration?',
    options: [
      { value: 1, label: 'No automation' },
      { value: 2, label: 'Basic process automation' },
      { value: 3, label: 'Partial AI integration' },
      { value: 4, label: 'Extensive AI automation' },
      { value: 5, label: 'Full AI integration across systems' }
    ]
  },

  // AI Strategy & Vision
  {
    id: 'strategy_1',
    category: 'strategy',
    text: 'How well-defined is your AI strategy?',
    options: [
      { value: 1, label: 'No formal AI strategy' },
      { value: 2, label: 'Basic understanding of AI potential' },
      { value: 3, label: 'Defined strategy but limited implementation' },
      { value: 4, label: 'Clear strategy with ongoing implementation' },
      { value: 5, label: 'Comprehensive AI strategy fully integrated' }
    ]
  },
  {
    id: 'strategy_2',
    category: 'strategy',
    text: 'How aligned is AI with your business objectives?',
    options: [
      { value: 1, label: 'No alignment' },
      { value: 2, label: 'Basic alignment with some goals' },
      { value: 3, label: 'Moderate alignment with key objectives' },
      { value: 4, label: 'Strong alignment across most areas' },
      { value: 5, label: 'Full alignment with all business objectives' }
    ]
  },
  {
    id: 'strategy_3',
    category: 'strategy',
    text: 'How do you measure AI initiative success?',
    options: [
      { value: 1, label: 'No measurement framework' },
      { value: 2, label: 'Basic metrics tracking' },
      { value: 3, label: 'Established KPIs' },
      { value: 4, label: 'Comprehensive measurement system' },
      { value: 5, label: 'Advanced analytics and ROI tracking' }
    ]
  },

  // Talent & Skills
  {
    id: 'talent_1',
    category: 'talent',
    text: 'What is your organization\'s AI talent capacity?',
    options: [
      { value: 1, label: 'No AI-specific talent' },
      { value: 2, label: 'Limited AI expertise' },
      { value: 3, label: 'Growing AI team' },
      { value: 4, label: 'Strong AI talent pool' },
      { value: 5, label: 'Industry-leading AI expertise' }
    ]
  },
  {
    id: 'talent_2',
    category: 'talent',
    text: 'How effective is your AI training and development program?',
    options: [
      { value: 1, label: 'No training program' },
      { value: 2, label: 'Basic AI awareness training' },
      { value: 3, label: 'Regular AI skill development' },
      { value: 4, label: 'Comprehensive AI education' },
      { value: 5, label: 'Advanced continuous learning program' }
    ]
  },
  {
    id: 'talent_3',
    category: 'talent',
    text: 'How well do you retain and attract AI talent?',
    options: [
      { value: 1, label: 'High turnover, difficulty attracting' },
      { value: 2, label: 'Some retention challenges' },
      { value: 3, label: 'Moderate success in retention' },
      { value: 4, label: 'Strong talent retention' },
      { value: 5, label: 'Industry-leading talent attraction' }
    ]
  },

  // AI Governance & Ethics
  {
    id: 'governance_1',
    category: 'governance',
    text: 'How mature is your AI governance framework?',
    options: [
      { value: 1, label: 'No governance framework' },
      { value: 2, label: 'Basic ethical guidelines' },
      { value: 3, label: 'Established policies but limited enforcement' },
      { value: 4, label: 'Comprehensive governance framework' },
      { value: 5, label: 'Industry-leading AI governance' }
    ]
  },
  {
    id: 'governance_2',
    category: 'governance',
    text: 'How do you handle AI ethics and bias?',
    options: [
      { value: 1, label: 'No consideration of ethics' },
      { value: 2, label: 'Basic awareness of bias issues' },
      { value: 3, label: 'Regular bias monitoring' },
      { value: 4, label: 'Comprehensive ethics framework' },
      { value: 5, label: 'Advanced bias prevention and monitoring' }
    ]
  },
  {
    id: 'governance_3',
    category: 'governance',
    text: 'What is your approach to AI risk management?',
    options: [
      { value: 1, label: 'No risk management' },
      { value: 2, label: 'Basic risk awareness' },
      { value: 3, label: 'Established risk framework' },
      { value: 4, label: 'Comprehensive risk management' },
      { value: 5, label: 'Advanced risk mitigation strategies' }
    ]
  },

  // Organizational Culture
  {
    id: 'culture_1',
    category: 'culture',
    text: 'How would you describe your organization\'s AI adoption culture?',
    options: [
      { value: 1, label: 'Resistant to AI adoption' },
      { value: 2, label: 'Limited awareness and acceptance' },
      { value: 3, label: 'Growing acceptance of AI' },
      { value: 4, label: 'Strong support for AI initiatives' },
      { value: 5, label: 'Full embrace of AI transformation' }
    ]
  },
  {
    id: 'culture_2',
    category: 'culture',
    text: 'How well do teams collaborate on AI initiatives?',
    options: [
      { value: 1, label: 'No collaboration' },
      { value: 2, label: 'Limited cross-team interaction' },
      { value: 3, label: 'Growing collaborative culture' },
      { value: 4, label: 'Strong cross-functional teams' },
      { value: 5, label: 'Seamless collaboration across org' }
    ]
  },
  {
    id: 'culture_3',
    category: 'culture',
    text: 'How is AI innovation encouraged and rewarded?',
    options: [
      { value: 1, label: 'No innovation incentives' },
      { value: 2, label: 'Basic recognition program' },
      { value: 3, label: 'Regular innovation initiatives' },
      { value: 4, label: 'Strong innovation culture' },
      { value: 5, label: 'Leading-edge innovation ecosystem' }
    ]
  },

  // Resources & Investment
  {
    id: 'resources_1',
    category: 'resources',
    text: 'What is your level of AI investment and resource allocation?',
    options: [
      { value: 1, label: 'Minimal investment in AI' },
      { value: 2, label: 'Limited budget allocation' },
      { value: 3, label: 'Moderate investment in key areas' },
      { value: 4, label: 'Significant AI investment' },
      { value: 5, label: 'Strategic priority with full funding' }
    ]
  },
  {
    id: 'resources_2',
    category: 'resources',
    text: 'How sustainable is your AI funding model?',
    options: [
      { value: 1, label: 'No dedicated funding' },
      { value: 2, label: 'Project-based funding only' },
      { value: 3, label: 'Stable funding for key initiatives' },
      { value: 4, label: 'Long-term investment strategy' },
      { value: 5, label: 'Comprehensive funding framework' }
    ]
  },
  {
    id: 'resources_3',
    category: 'resources',
    text: 'How well do you manage AI project resources?',
    options: [
      { value: 1, label: 'Poor resource management' },
      { value: 2, label: 'Basic resource allocation' },
      { value: 3, label: 'Structured resource planning' },
      { value: 4, label: 'Efficient resource optimization' },
      { value: 5, label: 'Advanced resource management' }
    ]
  }
];