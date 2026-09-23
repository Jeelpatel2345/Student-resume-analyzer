export interface JobOpportunity {
  id: string;
  title: string;
  company: string;
  companyLogo?: string;
  companyWebsite?: string;
  location: string;
  city?: string;
  stateProvince?: string;
  country: "USA" | "Canada" | "UK" | "Germany" | "Australia" | "Worldwide Remote";
  countryCode: string; // US, CA, GB, DE, AU, GLOBAL
  industry?: string;
  workType: "Remote" | "Hybrid" | "On-site";
  employmentType: "Full-time" | "Part-time" | "Contract" | "Internship";
  experienceLevel: "Entry Level" | "Mid Level" | "Senior" | "Lead / Staff";
  salary: string;
  requiredSkills: string[];
  matchedSkills: string[];
  missingSkills: string[];
  matchScore: number;
  description: string;
  applyUrl: string;
  source: "LinkedIn" | "Indeed" | "RemoteOK" | "Company ATS" | "Jobicy";
  postedAt: string;
  postedHoursAgo: number;
  visaSponsored?: boolean;
}

export interface CompanySpotlight {
  company: string;
  companyLogo?: string;
  companyWebsite?: string;
  location: string;
  city?: string;
  stateProvince?: string;
  country: string;
  countryCode: string;
  industry: string;
  openRolesCount: number;
  avgMatchScore: number;
  highestMatchScore: number;
  roles: JobOpportunity[];
  topSkills: string[];
  careersUrl: string;
  visaSponsoredAvailable: boolean;
  similarCompanies: string[];
}

export interface JobFilterOptions {
  country?: string;
  locationQuery?: string;
  selectedSkill?: string;
  selectedSkills?: string[];
  workType?: string;
  employmentType?: string;
  experienceLevel?: string;
  datePosted?: string; // "24h" | "week" | "month" | "ALL"
  roleQuery?: string;
}

export const POPULAR_LOCATIONS = [
  { label: "All Locations", value: "ALL" },
  { label: "🇨🇦 Ontario, Canada", value: "Ontario" },
  { label: "🇨🇦 Vancouver / BC", value: "British Columbia" },
  { label: "🇺🇸 California, USA", value: "California" },
  { label: "🇺🇸 New York, USA", value: "New York" },
  { label: "🇺🇸 Washington, USA", value: "Washington" },
  { label: "🇺🇸 Texas, USA", value: "Texas" },
  { label: "🇬🇧 London, UK", value: "London" },
  { label: "🇩🇪 Berlin, Germany", value: "Berlin" },
  { label: "🇦🇺 Sydney, Australia", value: "Sydney" },
  { label: "🌐 Worldwide Remote", value: "Remote" }
];

// Rich 100+ Global Tech Companies Catalog
export const GLOBAL_JOB_CATALOG: Omit<JobOpportunity, "matchedSkills" | "missingSkills" | "matchScore">[] = [
  // ===================== CANADA (ONTARIO, BC, QUEBEC) =====================
  {
    id: "ca-shopify-1",
    title: "Senior Backend Developer",
    company: "Shopify",
    companyWebsite: "https://shopify.com",
    location: "Toronto, Ontario, Canada (Remote/Hybrid)",
    city: "Toronto",
    stateProvince: "Ontario",
    country: "Canada",
    countryCode: "CA",
    industry: "E-Commerce & Cloud Infrastructure",
    workType: "Remote",
    employmentType: "Full-time",
    experienceLevel: "Senior",
    salary: "$145,000 - $185,000 CAD",
    requiredSkills: ["Ruby on Rails", "Go", "PostgreSQL", "Redis", "Kafka", "Docker"],
    description: "Power commerce infrastructure handling millions of transactions per minute for global merchants.",
    applyUrl: "https://www.shopify.com/careers",
    source: "Company ATS",
    postedAt: "1 day ago",
    postedHoursAgo: 24,
    visaSponsored: true
  },
  {
    id: "ca-shopify-2",
    title: "React Frontend Engineer",
    company: "Shopify",
    companyWebsite: "https://shopify.com",
    location: "Ottawa, Ontario, Canada",
    city: "Ottawa",
    stateProvince: "Ontario",
    country: "Canada",
    countryCode: "CA",
    industry: "E-Commerce & Cloud Infrastructure",
    workType: "Hybrid",
    employmentType: "Full-time",
    experienceLevel: "Mid Level",
    salary: "$120,000 - $150,000 CAD",
    requiredSkills: ["React", "TypeScript", "GraphQL", "Tailwind CSS", "Next.js"],
    description: "Design high-performance web components for Shopify Admin used by millions of entrepreneurs.",
    applyUrl: "https://www.shopify.com/careers",
    source: "Company ATS",
    postedAt: "10 hours ago",
    postedHoursAgo: 10,
    visaSponsored: true
  },
  {
    id: "ca-wealthsimple-1",
    title: "Full Stack Engineer (Growth & AI)",
    company: "Wealthsimple",
    companyWebsite: "https://wealthsimple.com",
    location: "Toronto, Ontario, Canada (Hybrid)",
    city: "Toronto",
    stateProvince: "Ontario",
    country: "Canada",
    countryCode: "CA",
    industry: "Fintech & Wealth Management",
    workType: "Hybrid",
    employmentType: "Full-time",
    experienceLevel: "Mid Level",
    salary: "$130,000 - $160,000 CAD",
    requiredSkills: ["React", "TypeScript", "Node.js", "PostgreSQL", "AWS", "Microservices"],
    description: "Build accessible wealth management, automated crypto, and tax products for millions of Canadians.",
    applyUrl: "https://www.wealthsimple.com/en-ca/careers",
    source: "Company ATS",
    postedAt: "3 days ago",
    postedHoursAgo: 72,
    visaSponsored: true
  },
  {
    id: "ca-wealthsimple-2",
    title: "Junior Software Engineer (New Grad)",
    company: "Wealthsimple",
    companyWebsite: "https://wealthsimple.com",
    location: "Toronto, Ontario, Canada",
    city: "Toronto",
    stateProvince: "Ontario",
    country: "Canada",
    countryCode: "CA",
    industry: "Fintech & Wealth Management",
    workType: "On-site",
    employmentType: "Full-time",
    experienceLevel: "Entry Level",
    salary: "$90,000 - $115,000 CAD",
    requiredSkills: ["TypeScript", "JavaScript", "Python", "SQL", "Git", "React"],
    description: "Join Wealthsimple's engineering academy with strong mentorship, pair programming, and production ownership.",
    applyUrl: "https://www.wealthsimple.com/en-ca/careers",
    source: "Company ATS",
    postedAt: "8 hours ago",
    postedHoursAgo: 8,
    visaSponsored: false
  },
  {
    id: "ca-hootsuite-1",
    title: "DevOps & Cloud Infrastructure Specialist",
    company: "Hootsuite",
    companyWebsite: "https://hootsuite.com",
    location: "Vancouver, British Columbia, Canada",
    city: "Vancouver",
    stateProvince: "British Columbia",
    country: "Canada",
    countryCode: "CA",
    industry: "Social Media SaaS",
    workType: "Hybrid",
    employmentType: "Full-time",
    experienceLevel: "Mid Level",
    salary: "$125,000 - $155,000 CAD",
    requiredSkills: ["AWS", "Terraform", "Kubernetes", "Docker", "CI/CD", "GitHub Actions"],
    description: "Scale Kubernetes clusters and multi-region infrastructure for social media management enterprise suites.",
    applyUrl: "https://www.hootsuite.com/about/careers",
    source: "Indeed",
    postedAt: "2 days ago",
    postedHoursAgo: 48,
    visaSponsored: false
  },
  {
    id: "ca-1password-1",
    title: "Security & Systems Engineer",
    company: "1Password",
    companyWebsite: "https://1password.com",
    location: "Toronto, Ontario, Canada / Remote",
    city: "Toronto",
    stateProvince: "Ontario",
    country: "Canada",
    countryCode: "CA",
    industry: "Cybersecurity & Identity",
    workType: "Remote",
    employmentType: "Full-time",
    experienceLevel: "Senior",
    salary: "$140,000 - $175,000 CAD",
    requiredSkills: ["Rust", "Go", "Distributed Systems", "Cryptography", "AWS", "Linux"],
    description: "Architect zero-knowledge password management protocols protecting over 100,000 businesses worldwide.",
    applyUrl: "https://1password.com/jobs",
    source: "Company ATS",
    postedAt: "1 day ago",
    postedHoursAgo: 20,
    visaSponsored: true
  },
  {
    id: "ca-opentext-1",
    title: "Cloud Software Architect",
    company: "OpenText",
    companyWebsite: "https://opentext.com",
    location: "Waterloo, Ontario, Canada",
    city: "Waterloo",
    stateProvince: "Ontario",
    country: "Canada",
    countryCode: "CA",
    industry: "Enterprise Information Management",
    workType: "Hybrid",
    employmentType: "Full-time",
    experienceLevel: "Lead / Staff",
    salary: "$150,000 - $190,000 CAD",
    requiredSkills: ["Java", "Spring Boot", "Kubernetes", "PostgreSQL", "System Design", "Docker"],
    description: "Design enterprise content management platforms for Canada's largest software corporation.",
    applyUrl: "https://careers.opentext.com",
    source: "Company ATS",
    postedAt: "4 days ago",
    postedHoursAgo: 96,
    visaSponsored: true
  },
  {
    id: "ca-lightspeed-1",
    title: "Full Stack Engineer (Commerce Platform)",
    company: "Lightspeed",
    companyWebsite: "https://lightspeedhq.com",
    location: "Montreal, Quebec, Canada",
    city: "Montreal",
    stateProvince: "Quebec",
    country: "Canada",
    countryCode: "CA",
    industry: "Retail & Restaurant POS",
    workType: "Hybrid",
    employmentType: "Full-time",
    experienceLevel: "Mid Level",
    salary: "$110,000 - $140,000 CAD",
    requiredSkills: ["PHP", "TypeScript", "React", "MySQL", "AWS", "GraphQL"],
    description: "Develop unified omnichannel POS and payment flows for retailers and restaurants across 100 countries.",
    applyUrl: "https://www.lightspeedhq.com/careers",
    source: "LinkedIn",
    postedAt: "2 days ago",
    postedHoursAgo: 40,
    visaSponsored: false
  },
  {
    id: "ca-clio-1",
    title: "Senior Ruby / Rails Engineer",
    company: "Clio",
    companyWebsite: "https://clio.com",
    location: "Burnaby, British Columbia, Canada / Remote",
    city: "Burnaby",
    stateProvince: "British Columbia",
    country: "Canada",
    countryCode: "CA",
    industry: "Legal Tech SaaS",
    workType: "Remote",
    employmentType: "Full-time",
    experienceLevel: "Senior",
    salary: "$135,000 - $165,000 CAD",
    requiredSkills: ["Ruby on Rails", "React", "PostgreSQL", "Elasticsearch", "AWS"],
    description: "Build the cloud operating system for law firms transforming the global legal experience.",
    applyUrl: "https://www.clio.com/careers",
    source: "Company ATS",
    postedAt: "1 day ago",
    postedHoursAgo: 16,
    visaSponsored: true
  },
  {
    id: "ca-freshbooks-1",
    title: "Backend Engineer (Payments & Invoicing)",
    company: "FreshBooks",
    companyWebsite: "https://freshbooks.com",
    location: "Toronto, Ontario, Canada",
    city: "Toronto",
    stateProvince: "Ontario",
    country: "Canada",
    countryCode: "CA",
    industry: "Accounting SaaS",
    workType: "Hybrid",
    employmentType: "Full-time",
    experienceLevel: "Mid Level",
    salary: "$115,000 - $145,000 CAD",
    requiredSkills: ["Python", "Django", "PostgreSQL", "Docker", "RESTful APIs"],
    description: "Craft invoicing and financial reporting software used by millions of small business owners globally.",
    applyUrl: "https://www.freshbooks.com/careers",
    source: "Company ATS",
    postedAt: "3 days ago",
    postedHoursAgo: 60,
    visaSponsored: false
  },
  {
    id: "ca-d2l-1",
    title: "EdTech Full Stack Developer",
    company: "D2L",
    companyWebsite: "https://d2l.com",
    location: "Kitchener, Ontario, Canada",
    city: "Kitchener",
    stateProvince: "Ontario",
    country: "Canada",
    countryCode: "CA",
    industry: "Education Technology",
    workType: "Hybrid",
    employmentType: "Full-time",
    experienceLevel: "Entry Level",
    salary: "$85,000 - $110,000 CAD",
    requiredSkills: ["TypeScript", "React", "AWS", "Node.js", "HTML5"],
    description: "Help build Brightspace learning management systems used by world-class universities and schools.",
    applyUrl: "https://www.d2l.com/careers",
    source: "Company ATS",
    postedAt: "5 hours ago",
    postedHoursAgo: 5,
    visaSponsored: false
  },
  {
    id: "ca-kinaxis-1",
    title: "Supply Chain Analytics Engineer",
    company: "Kinaxis",
    companyWebsite: "https://kinaxis.com",
    location: "Ottawa, Ontario, Canada",
    city: "Ottawa",
    stateProvince: "Ontario",
    country: "Canada",
    countryCode: "CA",
    industry: "Enterprise AI & Supply Chain",
    workType: "Remote",
    employmentType: "Full-time",
    experienceLevel: "Senior",
    salary: "$130,000 - $165,000 CAD",
    requiredSkills: ["Java", "C++", "Algorithms", "PostgreSQL", "System Design"],
    description: "Orchestrate real-time global supply chain simulation algorithms for Fortune 500 manufacturers.",
    applyUrl: "https://www.kinaxis.com/en/careers",
    source: "LinkedIn",
    postedAt: "2 days ago",
    postedHoursAgo: 44,
    visaSponsored: true
  },
  {
    id: "ca-benevity-1",
    title: "Frontend Software Engineer",
    company: "Benevity",
    companyWebsite: "https://benevity.com",
    location: "Calgary, Alberta, Canada / Remote",
    city: "Calgary",
    stateProvince: "Alberta",
    country: "Canada",
    countryCode: "CA",
    industry: "Corporate Social Responsibility",
    workType: "Remote",
    employmentType: "Full-time",
    experienceLevel: "Mid Level",
    salary: "$105,000 - $135,000 CAD",
    requiredSkills: ["React", "TypeScript", "Tailwind CSS", "Jest", "RESTful APIs"],
    description: "Power corporate giving, employee volunteering, and grants management software for global enterprises.",
    applyUrl: "https://benevity.com/careers",
    source: "Company ATS",
    postedAt: "3 days ago",
    postedHoursAgo: 65,
    visaSponsored: false
  },
  {
    id: "ca-jobber-1",
    title: "Full Stack Web Developer",
    company: "Jobber",
    companyWebsite: "https://getjobber.com",
    location: "Toronto, Ontario, Canada",
    city: "Toronto",
    stateProvince: "Ontario",
    country: "Canada",
    countryCode: "CA",
    industry: "Field Service SaaS",
    workType: "Hybrid",
    employmentType: "Full-time",
    experienceLevel: "Mid Level",
    salary: "$110,000 - $140,000 CAD",
    requiredSkills: ["Ruby on Rails", "React", "TypeScript", "PostgreSQL", "GraphQL"],
    description: "Build business management tools for home service entrepreneurs managing billions in client transactions.",
    applyUrl: "https://getjobber.com/careers",
    source: "Company ATS",
    postedAt: "1 day ago",
    postedHoursAgo: 22,
    visaSponsored: false
  },
  {
    id: "ca-cohere-1",
    title: "Machine Learning Platform Engineer",
    company: "Cohere",
    companyWebsite: "https://cohere.com",
    location: "Toronto, Ontario, Canada",
    city: "Toronto",
    stateProvince: "Ontario",
    country: "Canada",
    countryCode: "CA",
    industry: "Generative AI & LLMs",
    workType: "Hybrid",
    employmentType: "Full-time",
    experienceLevel: "Senior",
    salary: "$160,000 - $220,000 CAD",
    requiredSkills: ["Python", "PyTorch", "Kubernetes", "Docker", "C++", "Distributed Systems"],
    description: "Train and deploy frontier enterprise large language models alongside leading AI researchers.",
    applyUrl: "https://cohere.com/careers",
    source: "Company ATS",
    postedAt: "12 hours ago",
    postedHoursAgo: 12,
    visaSponsored: true
  },
  {
    id: "ca-geotab-1",
    title: "IoT & Big Data Engineer",
    company: "Geotab",
    companyWebsite: "https://geotab.com",
    location: "Oakville, Ontario, Canada",
    city: "Oakville",
    stateProvince: "Ontario",
    country: "Canada",
    countryCode: "CA",
    industry: "Telematics & Connected Vehicles",
    workType: "Hybrid",
    employmentType: "Full-time",
    experienceLevel: "Mid Level",
    salary: "$115,000 - $145,000 CAD",
    requiredSkills: ["C#", ".NET Core", "PostgreSQL", "GCP", "BigQuery", "Docker"],
    description: "Process billions of daily data points from millions of connected commercial vehicles worldwide.",
    applyUrl: "https://careers.geotab.com",
    source: "Company ATS",
    postedAt: "4 days ago",
    postedHoursAgo: 90,
    visaSponsored: true
  },

  // ===================== USA (CALIFORNIA, NY, WA, TX, ETC.) =====================
  {
    id: "us-stripe-1",
    title: "Senior Full Stack Engineer",
    company: "Stripe",
    companyWebsite: "https://stripe.com",
    location: "San Francisco, California, USA / Remote",
    city: "San Francisco",
    stateProvince: "California",
    country: "USA",
    countryCode: "US",
    industry: "Fintech & Developer Infrastructure",
    workType: "Remote",
    employmentType: "Full-time",
    experienceLevel: "Senior",
    salary: "$175,000 - $225,000 USD",
    requiredSkills: ["React", "TypeScript", "Node.js", "PostgreSQL", "AWS", "System Design"],
    description: "Build high-reliability financial infrastructure and APIs used by millions of internet businesses.",
    applyUrl: "https://stripe.com/jobs",
    source: "Company ATS",
    postedAt: "1 day ago",
    postedHoursAgo: 24,
    visaSponsored: true
  },
  {
    id: "us-stripe-2",
    title: "Junior Software Engineer (0-2 yrs)",
    company: "Stripe",
    companyWebsite: "https://stripe.com",
    location: "Seattle, Washington, USA (Hybrid)",
    city: "Seattle",
    stateProvince: "Washington",
    country: "USA",
    countryCode: "US",
    industry: "Fintech & Developer Infrastructure",
    workType: "Hybrid",
    employmentType: "Full-time",
    experienceLevel: "Entry Level",
    salary: "$130,000 - $155,000 USD",
    requiredSkills: ["JavaScript", "Python", "SQL", "Git", "RESTful APIs", "React"],
    description: "Kickstart your career on Stripe core payments infrastructure with high mentorship and scale.",
    applyUrl: "https://stripe.com/jobs",
    source: "Company ATS",
    postedAt: "8 hours ago",
    postedHoursAgo: 8,
    visaSponsored: true
  },
  {
    id: "us-datadog-1",
    title: "Cloud DevOps & Platform Engineer",
    company: "Datadog",
    companyWebsite: "https://datadoghq.com",
    location: "New York, NY, USA / Remote",
    city: "New York",
    stateProvince: "New York",
    country: "USA",
    countryCode: "US",
    industry: "Cloud Observability & Security",
    workType: "Remote",
    employmentType: "Full-time",
    experienceLevel: "Mid Level",
    salary: "$155,000 - $195,000 USD",
    requiredSkills: ["Kubernetes", "Docker", "AWS", "Terraform", "Go", "CI/CD", "Linux"],
    description: "Scale distributed observability pipelines processing petabytes of telemetry data daily.",
    applyUrl: "https://www.datadoghq.com/careers",
    source: "LinkedIn",
    postedAt: "2 days ago",
    postedHoursAgo: 48,
    visaSponsored: true
  },
  {
    id: "us-cloudflare-1",
    title: "Staff Backend Engineer (Edge Routing)",
    company: "Cloudflare",
    companyWebsite: "https://cloudflare.com",
    location: "Austin, Texas, USA / Remote",
    city: "Austin",
    stateProvince: "Texas",
    country: "USA",
    countryCode: "US",
    industry: "Cloud & Cybersecurity Infrastructure",
    workType: "Remote",
    employmentType: "Full-time",
    experienceLevel: "Lead / Staff",
    salary: "$190,000 - $245,000 USD",
    requiredSkills: ["Rust", "Go", "Distributed Systems", "Linux", "Docker", "RESTful APIs"],
    description: "Develop global edge network caching, security services, and high-performance routing protocols.",
    applyUrl: "https://www.cloudflare.com/careers",
    source: "Company ATS",
    postedAt: "Just now",
    postedHoursAgo: 2,
    visaSponsored: true
  },
  {
    id: "us-vercel-1",
    title: "Frontend Architect & Next.js Core",
    company: "Vercel",
    companyWebsite: "https://vercel.com",
    location: "San Francisco, California, USA / Remote",
    city: "San Francisco",
    stateProvince: "California",
    country: "USA",
    countryCode: "US",
    industry: "Frontend Cloud & Developer Experience",
    workType: "Remote",
    employmentType: "Full-time",
    experienceLevel: "Senior",
    salary: "$175,000 - $220,000 USD",
    requiredSkills: ["Next.js", "React", "TypeScript", "Tailwind CSS", "GraphQL", "Performance Optimization"],
    description: "Pioneer the next generation of web development tooling and cloud platform interfaces.",
    applyUrl: "https://vercel.com/careers",
    source: "Company ATS",
    postedAt: "1 day ago",
    postedHoursAgo: 26,
    visaSponsored: false
  },
  {
    id: "us-openai-1",
    title: "Full Stack Engineer (ChatGPT & Platform)",
    company: "OpenAI",
    companyWebsite: "https://openai.com",
    location: "San Francisco, California, USA (Hybrid)",
    city: "San Francisco",
    stateProvince: "California",
    country: "USA",
    countryCode: "US",
    industry: "Artificial Intelligence & LLMs",
    workType: "Hybrid",
    employmentType: "Full-time",
    experienceLevel: "Senior",
    salary: "$210,000 - $320,000 USD",
    requiredSkills: ["Python", "TypeScript", "React", "Next.js", "PostgreSQL", "Docker"],
    description: "Build interfaces, developer APIs, and consumer experiences for ChatGPT and OpenAI developer tools.",
    applyUrl: "https://openai.com/careers",
    source: "Company ATS",
    postedAt: "18 hours ago",
    postedHoursAgo: 18,
    visaSponsored: true
  },
  {
    id: "us-anthropic-1",
    title: "Backend Systems Engineer (Claude Infrastructure)",
    company: "Anthropic",
    companyWebsite: "https://anthropic.com",
    location: "San Francisco, California, USA",
    city: "San Francisco",
    stateProvince: "California",
    country: "USA",
    countryCode: "US",
    industry: "AI Safety & LLM Research",
    workType: "On-site",
    employmentType: "Full-time",
    experienceLevel: "Senior",
    salary: "$220,000 - $330,000 USD",
    requiredSkills: ["Python", "Rust", "Distributed Systems", "Kubernetes", "AWS", "System Design"],
    description: "Design high-throughput distributed inference clusters powering Claude for millions of users.",
    applyUrl: "https://anthropic.com/careers",
    source: "Company ATS",
    postedAt: "1 day ago",
    postedHoursAgo: 20,
    visaSponsored: true
  },
  {
    id: "us-palantir-1",
    title: "Forward Deployed Software Engineer",
    company: "Palantir",
    companyWebsite: "https://palantir.com",
    location: "New York, NY, USA / Palo Alto, CA",
    city: "New York",
    stateProvince: "New York",
    country: "USA",
    countryCode: "US",
    industry: "Enterprise AI & Big Data",
    workType: "Hybrid",
    employmentType: "Full-time",
    experienceLevel: "Mid Level",
    salary: "$150,000 - $190,000 USD",
    requiredSkills: ["Java", "TypeScript", "React", "Python", "SQL", "Docker"],
    description: "Deploy Palantir Foundry and Gotham data intelligence platforms solving critical enterprise problems.",
    applyUrl: "https://www.palantir.com/careers",
    source: "LinkedIn",
    postedAt: "3 days ago",
    postedHoursAgo: 70,
    visaSponsored: true
  },
  {
    id: "us-snowflake-1",
    title: "Database Kernel Software Engineer",
    company: "Snowflake",
    companyWebsite: "https://snowflake.com",
    location: "San Mateo, California, USA",
    city: "San Mateo",
    stateProvince: "California",
    country: "USA",
    countryCode: "US",
    industry: "Cloud Data Warehouse",
    workType: "Hybrid",
    employmentType: "Full-time",
    experienceLevel: "Senior",
    salary: "$180,000 - $235,000 USD",
    requiredSkills: ["C++", "Java", "SQL", "Distributed Systems", "System Design", "Linux"],
    description: "Scale Snowflake's cloud-native execution engine optimizing petabyte SQL query compilation.",
    applyUrl: "https://careers.snowflake.com",
    source: "Company ATS",
    postedAt: "2 days ago",
    postedHoursAgo: 50,
    visaSponsored: true
  },
  {
    id: "us-airbnb-1",
    title: "Senior Frontend Engineer (Guest Experience)",
    company: "Airbnb",
    companyWebsite: "https://airbnb.com",
    location: "San Francisco, California, USA / Remote",
    city: "San Francisco",
    stateProvince: "California",
    country: "USA",
    countryCode: "US",
    industry: "Travel & Hospitality Tech",
    workType: "Remote",
    employmentType: "Full-time",
    experienceLevel: "Senior",
    salary: "$185,000 - $230,000 USD",
    requiredSkills: ["React", "TypeScript", "GraphQL", "Tailwind CSS", "Jest", "Web Performance"],
    description: "Build immersive booking flows and search discovery experiences across mobile web and desktop.",
    applyUrl: "https://careers.airbnb.com",
    source: "Company ATS",
    postedAt: "1 day ago",
    postedHoursAgo: 28,
    visaSponsored: true
  },
  {
    id: "us-uber-1",
    title: "Backend Distributed Systems Engineer",
    company: "Uber",
    companyWebsite: "https://uber.com",
    location: "San Francisco, California, USA",
    city: "San Francisco",
    stateProvince: "California",
    country: "USA",
    countryCode: "US",
    industry: "Mobility & Delivery Tech",
    workType: "Hybrid",
    employmentType: "Full-time",
    experienceLevel: "Mid Level",
    salary: "$160,000 - $205,000 USD",
    requiredSkills: ["Go", "Java", "Kafka", "Microservices", "Docker", "Cassandra"],
    description: "Develop real-time driver dispatching algorithms matching tens of millions of rides daily.",
    applyUrl: "https://www.uber.com/careers",
    source: "LinkedIn",
    postedAt: "3 days ago",
    postedHoursAgo: 72,
    visaSponsored: true
  },
  {
    id: "us-doordash-1",
    title: "Full Stack Engineer (Merchant Platform)",
    company: "DoorDash",
    companyWebsite: "https://doordash.com",
    location: "Sunnyvale, California, USA",
    city: "Sunnyvale",
    stateProvince: "California",
    country: "USA",
    countryCode: "US",
    industry: "Logistics & Food Delivery",
    workType: "Hybrid",
    employmentType: "Full-time",
    experienceLevel: "Mid Level",
    salary: "$150,000 - $190,000 USD",
    requiredSkills: ["Kotlin", "React", "TypeScript", "PostgreSQL", "AWS", "gRPC"],
    description: "Build store management and analytics dashboards helping restaurants grow digital revenue.",
    applyUrl: "https://careers.doordash.com",
    source: "Company ATS",
    postedAt: "2 days ago",
    postedHoursAgo: 45,
    visaSponsored: true
  },
  {
    id: "us-databricks-1",
    title: "Software Engineer (Apache Spark & Lakehouse)",
    company: "Databricks",
    companyWebsite: "https://databricks.com",
    location: "San Francisco, California, USA",
    city: "San Francisco",
    stateProvince: "California",
    country: "USA",
    countryCode: "US",
    industry: "Data Intelligence & AI Platform",
    workType: "Hybrid",
    employmentType: "Full-time",
    experienceLevel: "Senior",
    salary: "$190,000 - $250,000 USD",
    requiredSkills: ["Scala", "Java", "Python", "Kubernetes", "Distributed Systems", "Cloud"],
    description: "Help build the unified data intelligence and ML lakehouse platform used by over 10,000 enterprises.",
    applyUrl: "https://www.databricks.com/company/careers",
    source: "Company ATS",
    postedAt: "1 day ago",
    postedHoursAgo: 22,
    visaSponsored: true
  },
  {
    id: "us-brex-1",
    title: "Full Stack Engineer (Corporate Cards)",
    company: "Brex",
    companyWebsite: "https://brex.com",
    location: "New York, NY, USA / Remote",
    city: "New York",
    stateProvince: "New York",
    country: "USA",
    countryCode: "US",
    industry: "Fintech & Corporate Expense",
    workType: "Remote",
    employmentType: "Full-time",
    experienceLevel: "Mid Level",
    salary: "$155,000 - $195,000 USD",
    requiredSkills: ["TypeScript", "React", "Elixir", "PostgreSQL", "GraphQL", "AWS"],
    description: "Reimagine corporate credit cards, automated expense management, and treasury tools.",
    applyUrl: "https://www.brex.com/careers",
    source: "RemoteOK",
    postedAt: "14 hours ago",
    postedHoursAgo: 14,
    visaSponsored: true
  },
  {
    id: "us-ramp-1",
    title: "Product Engineer (Financial Automation)",
    company: "Ramp",
    companyWebsite: "https://ramp.com",
    location: "New York, NY, USA",
    city: "New York",
    stateProvince: "New York",
    country: "USA",
    countryCode: "US",
    industry: "Fintech & Spend Management",
    workType: "On-site",
    employmentType: "Full-time",
    experienceLevel: "Mid Level",
    salary: "$165,000 - $210,000 USD",
    requiredSkills: ["Python", "React", "TypeScript", "PostgreSQL", "AWS", "Tailwind CSS"],
    description: "Build software designed to help businesses spend less money through intelligent financial automation.",
    applyUrl: "https://ramp.com/careers",
    source: "Company ATS",
    postedAt: "2 days ago",
    postedHoursAgo: 40,
    visaSponsored: true
  },
  {
    id: "us-plaid-1",
    title: "Software Engineer (API Connectivity)",
    company: "Plaid",
    companyWebsite: "https://plaid.com",
    location: "San Francisco, California, USA",
    city: "San Francisco",
    stateProvince: "California",
    country: "USA",
    countryCode: "US",
    industry: "Fintech & Open Banking APIs",
    workType: "Hybrid",
    employmentType: "Full-time",
    experienceLevel: "Mid Level",
    salary: "$160,000 - $200,000 USD",
    requiredSkills: ["Go", "TypeScript", "Python", "PostgreSQL", "AWS", "Microservices"],
    description: "Connect thousands of banks and financial institutions to fintech apps like Venmo, Chime, and Robinhood.",
    applyUrl: "https://plaid.com/careers",
    source: "Company ATS",
    postedAt: "3 days ago",
    postedHoursAgo: 68,
    visaSponsored: true
  },
  {
    id: "us-figma-1",
    title: "Systems & WebGL Graphics Engineer",
    company: "Figma",
    companyWebsite: "https://figma.com",
    location: "San Francisco, California, USA / Remote",
    city: "San Francisco",
    stateProvince: "California",
    country: "USA",
    countryCode: "US",
    industry: "Collaborative Design Tools",
    workType: "Remote",
    employmentType: "Full-time",
    experienceLevel: "Senior",
    salary: "$195,000 - $245,000 USD",
    requiredSkills: ["C++", "Rust", "TypeScript", "WebGL", "WebAssembly", "React"],
    description: "Engineer the 60fps in-browser rendering engine and real-time collaborative canvas used by designers globally.",
    applyUrl: "https://www.figma.com/careers",
    source: "Company ATS",
    postedAt: "1 day ago",
    postedHoursAgo: 25,
    visaSponsored: true
  },
  {
    id: "us-linear-1",
    title: "Frontend Engineer (Desktop & Sync)",
    company: "Linear",
    companyWebsite: "https://linear.app",
    location: "San Francisco, California, USA / Remote",
    city: "San Francisco",
    stateProvince: "California",
    country: "USA",
    countryCode: "US",
    industry: "Productivity & Developer Tools",
    workType: "Remote",
    employmentType: "Full-time",
    experienceLevel: "Senior",
    salary: "$180,000 - $230,000 USD",
    requiredSkills: ["TypeScript", "React", "GraphQL", "Electron", "IndexedDB", "Tailwind CSS"],
    description: "Build magical, keyboard-first issue tracking software beloved by modern software engineering teams.",
    applyUrl: "https://linear.app/careers",
    source: "RemoteOK",
    postedAt: "6 hours ago",
    postedHoursAgo: 6,
    visaSponsored: true
  },
  {
    id: "us-notion-1",
    title: "Full Stack Infrastructure Engineer",
    company: "Notion",
    companyWebsite: "https://notion.so",
    location: "San Francisco, California, USA (Hybrid)",
    city: "San Francisco",
    stateProvince: "California",
    country: "USA",
    countryCode: "US",
    industry: "Connected Workspace & AI",
    workType: "Hybrid",
    employmentType: "Full-time",
    experienceLevel: "Senior",
    salary: "$185,000 - $240,000 USD",
    requiredSkills: ["TypeScript", "React", "Node.js", "PostgreSQL", "Redis", "Distributed Systems"],
    description: "Scale Notion's real-time collaborative document store and AI Q&A features for 30M+ active workspaces.",
    applyUrl: "https://www.notion.so/careers",
    source: "Company ATS",
    postedAt: "2 days ago",
    postedHoursAgo: 42,
    visaSponsored: true
  },
  {
    id: "us-github-1",
    title: "Senior Backend Engineer (GitHub Actions)",
    company: "GitHub",
    companyWebsite: "https://github.com",
    location: "Remote - USA / Worldwide",
    city: "San Francisco",
    stateProvince: "California",
    country: "USA",
    countryCode: "US",
    industry: "Developer Platform & Open Source",
    workType: "Remote",
    employmentType: "Full-time",
    experienceLevel: "Senior",
    salary: "$165,000 - $215,000 USD",
    requiredSkills: ["Ruby on Rails", "Go", "Kubernetes", "Docker", "PostgreSQL", "CI/CD"],
    description: "Build and scale automated workflow runners executing millions of software builds every hour.",
    applyUrl: "https://github.com/about/careers",
    source: "RemoteOK",
    postedAt: "1 day ago",
    postedHoursAgo: 20,
    visaSponsored: true
  },
  {
    id: "us-coinbase-1",
    title: "Backend Crypto Platform Engineer",
    company: "Coinbase",
    companyWebsite: "https://coinbase.com",
    location: "Remote (USA/Global)",
    city: "San Francisco",
    stateProvince: "California",
    country: "USA",
    countryCode: "US",
    industry: "Crypto & Blockchain Exchange",
    workType: "Remote",
    employmentType: "Full-time",
    experienceLevel: "Mid Level",
    salary: "$160,000 - $205,000 USD",
    requiredSkills: ["Go", "Docker", "PostgreSQL", "AWS", "Microservices", "RESTful APIs"],
    description: "Secure digital asset wallets and crypto trading pipelines handling billions in daily exchange volume.",
    applyUrl: "https://www.coinbase.com/careers",
    source: "RemoteOK",
    postedAt: "3 days ago",
    postedHoursAgo: 75,
    visaSponsored: false
  },
  {
    id: "us-mongodb-1",
    title: "Cloud Database Platform Engineer",
    company: "MongoDB",
    companyWebsite: "https://mongodb.com",
    location: "New York, NY, USA / Remote",
    city: "New York",
    stateProvince: "New York",
    country: "USA",
    countryCode: "US",
    industry: "Cloud Database & Developer Data Platform",
    workType: "Remote",
    employmentType: "Full-time",
    experienceLevel: "Mid Level",
    salary: "$150,000 - $190,000 USD",
    requiredSkills: ["Go", "Python", "Kubernetes", "AWS", "Docker", "Linux"],
    description: "Build automated control plane features for MongoDB Atlas multi-cloud managed databases.",
    applyUrl: "https://www.mongodb.com/careers",
    source: "Company ATS",
    postedAt: "2 days ago",
    postedHoursAgo: 52,
    visaSponsored: true
  },

  // ===================== UNITED KINGDOM =====================
  {
    id: "uk-monzo-1",
    title: "Senior Core Banking Engineer",
    company: "Monzo Bank",
    companyWebsite: "https://monzo.com",
    location: "London, England, UK / Remote",
    city: "London",
    stateProvince: "England",
    country: "UK",
    countryCode: "GB",
    industry: "Digital Banking & Fintech",
    workType: "Remote",
    employmentType: "Full-time",
    experienceLevel: "Senior",
    salary: "£95,000 - £125,000 GBP",
    requiredSkills: ["Go", "Microservices", "PostgreSQL", "Kubernetes", "Docker", "AWS"],
    description: "Scale banking services handling billions in payments with 2,500+ microservices in Go.",
    applyUrl: "https://monzo.com/careers",
    source: "LinkedIn",
    postedAt: "1 day ago",
    postedHoursAgo: 22,
    visaSponsored: true
  },
  {
    id: "uk-monzo-2",
    title: "Junior Backend Engineer (Go / Microservices)",
    company: "Monzo Bank",
    companyWebsite: "https://monzo.com",
    location: "London, England, UK (Hybrid)",
    city: "London",
    stateProvince: "England",
    country: "UK",
    countryCode: "GB",
    industry: "Digital Banking & Fintech",
    workType: "Hybrid",
    employmentType: "Full-time",
    experienceLevel: "Entry Level",
    salary: "£60,000 - £75,000 GBP",
    requiredSkills: ["Go", "SQL", "Git", "RESTful APIs", "Docker", "Linux"],
    description: "Join Monzo's blameless culture with dedicated pair programming and continuous mentorship.",
    applyUrl: "https://monzo.com/careers",
    source: "Company ATS",
    postedAt: "6 hours ago",
    postedHoursAgo: 6,
    visaSponsored: true
  },
  {
    id: "uk-revolut-1",
    title: "Full Stack Developer (Fintech Platform)",
    company: "Revolut",
    companyWebsite: "https://revolut.com",
    location: "London, England, UK",
    city: "London",
    stateProvince: "England",
    country: "UK",
    countryCode: "GB",
    industry: "Global Financial Superapp",
    workType: "On-site",
    employmentType: "Full-time",
    experienceLevel: "Mid Level",
    salary: "£85,000 - £120,000 GBP",
    requiredSkills: ["Java", "Spring Boot", "React", "TypeScript", "PostgreSQL", "Docker"],
    description: "Architect borderless financial services, crypto tools, and remittance engines for 45M+ users.",
    applyUrl: "https://www.revolut.com/careers",
    source: "Company ATS",
    postedAt: "3 days ago",
    postedHoursAgo: 72,
    visaSponsored: true
  },
  {
    id: "uk-wise-1",
    title: "Lead Frontend Engineer",
    company: "Wise",
    companyWebsite: "https://wise.com",
    location: "London, England, UK / Remote",
    city: "London",
    stateProvince: "England",
    country: "UK",
    countryCode: "GB",
    industry: "International Money Transfer",
    workType: "Remote",
    employmentType: "Full-time",
    experienceLevel: "Lead / Staff",
    salary: "£100,000 - £135,000 GBP",
    requiredSkills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "GraphQL", "Jest"],
    description: "Build money without borders. Craft lightning-fast, ultra-accessible remittance flows globally.",
    applyUrl: "https://wise.com/careers",
    source: "LinkedIn",
    postedAt: "18 hours ago",
    postedHoursAgo: 18,
    visaSponsored: true
  },
  {
    id: "uk-deliveroo-1",
    title: "Senior Backend Engineer (Dispatch & Routing)",
    company: "Deliveroo",
    companyWebsite: "https://deliveroo.co.uk",
    location: "London, England, UK",
    city: "London",
    stateProvince: "England",
    country: "UK",
    countryCode: "GB",
    industry: "Food Delivery & Logistics",
    workType: "Hybrid",
    employmentType: "Full-time",
    experienceLevel: "Senior",
    salary: "£90,000 - £120,000 GBP",
    requiredSkills: ["Ruby", "Go", "PostgreSQL", "Kafka", "AWS", "Microservices"],
    description: "Design real-time dispatch algorithms routing millions of meals and groceries across Europe and Asia.",
    applyUrl: "https://careers.deliveroo.co.uk",
    source: "Company ATS",
    postedAt: "2 days ago",
    postedHoursAgo: 48,
    visaSponsored: true
  },
  {
    id: "uk-deepmind-1",
    title: "Research Software Engineer (AI Infrastructure)",
    company: "Google DeepMind",
    companyWebsite: "https://deepmind.google",
    location: "London, England, UK",
    city: "London",
    stateProvince: "England",
    country: "UK",
    countryCode: "GB",
    industry: "Frontier AI Research & Gemini",
    workType: "Hybrid",
    employmentType: "Full-time",
    experienceLevel: "Senior",
    salary: "£120,000 - £165,000 GBP",
    requiredSkills: ["Python", "C++", "JAX", "Distributed Systems", "Linux", "Algorithms"],
    description: "Build scalable distributed training infrastructure powering Gemini, AlphaFold, and frontier intelligence.",
    applyUrl: "https://deepmind.google/about/careers",
    source: "Company ATS",
    postedAt: "1 day ago",
    postedHoursAgo: 24,
    visaSponsored: true
  },
  {
    id: "uk-arm-1",
    title: "Compiler & Tools Software Engineer",
    company: "ARM",
    companyWebsite: "https://arm.com",
    location: "Cambridge, England, UK",
    city: "Cambridge",
    stateProvince: "England",
    country: "UK",
    countryCode: "GB",
    industry: "Semiconductors & Processor Architecture",
    workType: "Hybrid",
    employmentType: "Full-time",
    experienceLevel: "Mid Level",
    salary: "£75,000 - £100,000 GBP",
    requiredSkills: ["C++", "LLVM", "Compilers", "Linux", "Git", "Algorithms"],
    description: "Optimize LLVM code generation for billions of ARM processor cores used in modern phones and servers.",
    applyUrl: "https://careers.arm.com",
    source: "Company ATS",
    postedAt: "4 days ago",
    postedHoursAgo: 96,
    visaSponsored: true
  },
  {
    id: "uk-checkout-1",
    title: "Backend Cloud Developer (Global Payments)",
    company: "Checkout.com",
    companyWebsite: "https://checkout.com",
    location: "London, England, UK",
    city: "London",
    stateProvince: "England",
    country: "UK",
    countryCode: "GB",
    industry: "Global Payment Gateway",
    workType: "Hybrid",
    employmentType: "Full-time",
    experienceLevel: "Mid Level",
    salary: "£80,000 - £110,000 GBP",
    requiredSkills: ["C#", ".NET Core", "AWS", "Kafka", "PostgreSQL", "Docker"],
    description: "Develop ultra-low latency card authorization services for enterprise digital brands worldwide.",
    applyUrl: "https://www.checkout.com/careers",
    source: "Company ATS",
    postedAt: "2 days ago",
    postedHoursAgo: 50,
    visaSponsored: true
  },

  // ===================== GERMANY & EUROPE =====================
  {
    id: "de-deliveryhero-1",
    title: "Senior Backend Engineer (Platform)",
    company: "Delivery Hero",
    companyWebsite: "https://deliveryhero.com",
    location: "Berlin, Germany / Hybrid",
    city: "Berlin",
    stateProvince: "Berlin",
    country: "Germany",
    countryCode: "DE",
    industry: "Quick Commerce & Logistics",
    workType: "Hybrid",
    employmentType: "Full-time",
    experienceLevel: "Senior",
    salary: "€85,000 - €110,000 EUR",
    requiredSkills: ["Python", "FastAPI", "Go", "PostgreSQL", "Kubernetes", "GCP"],
    description: "Scale quick-commerce delivery dispatch systems orchestrating millions of orders across 70+ markets.",
    applyUrl: "https://careers.deliveryhero.com",
    source: "Company ATS",
    postedAt: "5 days ago",
    postedHoursAgo: 120,
    visaSponsored: true
  },
  {
    id: "de-zalando-1",
    title: "Senior Full Stack Engineer (Fashion Discovery)",
    company: "Zalando",
    companyWebsite: "https://zalando.com",
    location: "Berlin, Germany / Remote (DE)",
    city: "Berlin",
    stateProvince: "Berlin",
    country: "Germany",
    countryCode: "DE",
    industry: "E-Commerce & Fashion Tech",
    workType: "Remote",
    employmentType: "Full-time",
    experienceLevel: "Senior",
    salary: "€88,000 - €115,000 EUR",
    requiredSkills: ["TypeScript", "React", "Node.js", "AWS", "Docker", "RESTful APIs"],
    description: "Create seamless e-commerce fashion discovery experiences serving 50M+ active European shoppers.",
    applyUrl: "https://jobs.zalando.com",
    source: "LinkedIn",
    postedAt: "1 day ago",
    postedHoursAgo: 26,
    visaSponsored: true
  },
  {
    id: "de-celonis-1",
    title: "Process Mining Core Systems Engineer",
    company: "Celonis",
    companyWebsite: "https://celonis.com",
    location: "Munich, Bavaria, Germany",
    city: "Munich",
    stateProvince: "Bavaria",
    country: "Germany",
    countryCode: "DE",
    industry: "Process Mining & Execution Management",
    workType: "Hybrid",
    employmentType: "Full-time",
    experienceLevel: "Mid Level",
    salary: "€80,000 - €105,000 EUR",
    requiredSkills: ["Java", "C++", "Algorithms", "PostgreSQL", "Docker", "Microservices"],
    description: "Build Germany's decacorn process intelligence engine analyzing business efficiency at massive enterprise scale.",
    applyUrl: "https://www.celonis.com/careers",
    source: "Company ATS",
    postedAt: "2 days ago",
    postedHoursAgo: 45,
    visaSponsored: true
  },
  {
    id: "de-personio-1",
    title: "Full Stack Engineer (HR Tech Cloud)",
    company: "Personio",
    companyWebsite: "https://personio.com",
    location: "Munich, Bavaria, Germany / Berlin",
    city: "Munich",
    stateProvince: "Bavaria",
    country: "Germany",
    countryCode: "DE",
    industry: "HR & People Workflow Software",
    workType: "Hybrid",
    employmentType: "Full-time",
    experienceLevel: "Mid Level",
    salary: "€75,000 - €98,000 EUR",
    requiredSkills: ["Kotlin", "React", "TypeScript", "PostgreSQL", "AWS", "Docker"],
    description: "Help automate HR processes, payroll, and recruiting for European SMEs on modern cloud architecture.",
    applyUrl: "https://www.personio.com/careers",
    source: "Company ATS",
    postedAt: "3 days ago",
    postedHoursAgo: 66,
    visaSponsored: true
  },
  {
    id: "de-deepl-1",
    title: "Machine Translation Systems Engineer",
    company: "DeepL",
    companyWebsite: "https://deepl.com",
    location: "Cologne, Germany / Remote",
    city: "Cologne",
    stateProvince: "North Rhine-Westphalia",
    country: "Germany",
    countryCode: "DE",
    industry: "AI Translation & Language Tech",
    workType: "Remote",
    employmentType: "Full-time",
    experienceLevel: "Senior",
    salary: "€95,000 - €130,000 EUR",
    requiredSkills: ["Python", "C++", "PyTorch", "Kubernetes", "Linux", "Algorithms"],
    description: "Scale high-precision neural translation models processing billions of translation requests daily.",
    applyUrl: "https://www.deepl.com/careers",
    source: "Company ATS",
    postedAt: "1 day ago",
    postedHoursAgo: 22,
    visaSponsored: true
  },
  {
    id: "de-sap-1",
    title: "Cloud Infrastructure Architect",
    company: "SAP",
    companyWebsite: "https://sap.com",
    location: "Walldorf / Berlin, Germany",
    city: "Walldorf",
    stateProvince: "Baden-Württemberg",
    country: "Germany",
    countryCode: "DE",
    industry: "Enterprise Cloud ERP Software",
    workType: "Hybrid",
    employmentType: "Full-time",
    experienceLevel: "Lead / Staff",
    salary: "€100,000 - €140,000 EUR",
    requiredSkills: ["Java", "Kubernetes", "Cloud Foundry", "PostgreSQL", "Docker", "CI/CD"],
    description: "Design multi-cloud enterprise platform architectures powering the global commerce backbone.",
    applyUrl: "https://jobs.sap.com",
    source: "Company ATS",
    postedAt: "4 days ago",
    postedHoursAgo: 92,
    visaSponsored: true
  },
  {
    id: "se-spotify-1",
    title: "Staff Web Engineer (Player & Audio)",
    company: "Spotify",
    companyWebsite: "https://spotify.com",
    location: "Stockholm, Sweden / London / Remote",
    city: "Stockholm",
    stateProvince: "Stockholm",
    country: "Germany",
    countryCode: "DE",
    industry: "Streaming Audio & Music Media",
    workType: "Remote",
    employmentType: "Full-time",
    experienceLevel: "Senior",
    salary: "€90,000 - €125,000 EUR",
    requiredSkills: ["TypeScript", "React", "Next.js", "Web Audio API", "GraphQL", "Performance Optimization"],
    description: "Craft web music streaming experiences delivering audio and personalized podcasts to 600M+ users.",
    applyUrl: "https://www.lifeatspotify.com",
    source: "Company ATS",
    postedAt: "1 day ago",
    postedHoursAgo: 18,
    visaSponsored: true
  },
  {
    id: "nl-adyen-1",
    title: "Core Payment Engine Developer",
    company: "Adyen",
    companyWebsite: "https://adyen.com",
    location: "Amsterdam, Netherlands",
    city: "Amsterdam",
    stateProvince: "North Holland",
    country: "Germany",
    countryCode: "DE",
    industry: "Global Financial Technology",
    workType: "On-site",
    employmentType: "Full-time",
    experienceLevel: "Senior",
    salary: "€95,000 - €130,000 EUR",
    requiredSkills: ["Java", "PostgreSQL", "Linux", "Distributed Systems", "Algorithms", "High Concurrency"],
    description: "Architect single-platform payment infrastructure handling hundreds of billions for Uber, Spotify, and eBay.",
    applyUrl: "https://careers.adyen.com",
    source: "Company ATS",
    postedAt: "2 days ago",
    postedHoursAgo: 48,
    visaSponsored: true
  },

  // ===================== AUSTRALIA =====================
  {
    id: "au-atlassian-1",
    title: "Senior Full Stack Engineer (Jira Cloud)",
    company: "Atlassian",
    companyWebsite: "https://atlassian.com",
    location: "Sydney, New South Wales, Australia / Remote",
    city: "Sydney",
    stateProvince: "New South Wales",
    country: "Australia",
    countryCode: "AU",
    industry: "Collaboration & Developer Software",
    workType: "Remote",
    employmentType: "Full-time",
    experienceLevel: "Senior",
    salary: "$165,000 - $210,000 AUD",
    requiredSkills: ["React", "TypeScript", "Java", "Kotlin", "AWS", "GraphQL"],
    description: "Unleash the potential of every team. Build Jira Cloud microservices and fast frontend collaborative boards.",
    applyUrl: "https://www.atlassian.com/company/careers",
    source: "Company ATS",
    postedAt: "1 day ago",
    postedHoursAgo: 20,
    visaSponsored: true
  },
  {
    id: "au-canva-1",
    title: "Frontend Rendering & Canvas Engineer",
    company: "Canva",
    companyWebsite: "https://canva.com",
    location: "Sydney, New South Wales, Australia",
    city: "Sydney",
    stateProvince: "New South Wales",
    country: "Australia",
    countryCode: "AU",
    industry: "Visual Communication & Design",
    workType: "Hybrid",
    employmentType: "Full-time",
    experienceLevel: "Mid Level",
    salary: "$140,000 - $180,000 AUD",
    requiredSkills: ["TypeScript", "React", "WebGL", "HTML5 Canvas", "Algorithms"],
    description: "Empower the world to design. Create high-performance graphic rendering algorithms used by 170M+ people.",
    applyUrl: "https://www.canva.com/careers",
    source: "Company ATS",
    postedAt: "2 days ago",
    postedHoursAgo: 38,
    visaSponsored: true
  },

  // ===================== WORLDWIDE REMOTE =====================
  {
    id: "global-gitlab-1",
    title: "Senior Site Reliability Engineer (Remote Worldwide)",
    company: "GitLab",
    companyWebsite: "https://about.gitlab.com",
    location: "Remote - Anywhere Worldwide",
    country: "Worldwide Remote",
    countryCode: "GLOBAL",
    industry: "DevOps & Cloud Platform",
    workType: "Remote",
    employmentType: "Full-time",
    experienceLevel: "Senior",
    salary: "$140,000 - $180,000 USD",
    requiredSkills: ["Kubernetes", "Linux", "Docker", "Terraform", "Go", "Prometheus", "CI/CD"],
    description: "Join the world's pioneer all-remote company. Ensure 99.99% uptime for the world's most widely used DevOps platform.",
    applyUrl: "https://about.gitlab.com/jobs/careers",
    source: "RemoteOK",
    postedAt: "4 hours ago",
    postedHoursAgo: 4,
    visaSponsored: false
  },
  {
    id: "global-supabase-1",
    title: "Full Stack Engineer (Open Source Database)",
    company: "Supabase",
    companyWebsite: "https://supabase.com",
    location: "Remote - Global",
    country: "Worldwide Remote",
    countryCode: "GLOBAL",
    industry: "Open Source Cloud Database",
    workType: "Remote",
    employmentType: "Full-time",
    experienceLevel: "Mid Level",
    salary: "$125,000 - $165,000 USD",
    requiredSkills: ["TypeScript", "Next.js", "React", "PostgreSQL", "Node.js", "Docker"],
    description: "Help build the open source Firebase alternative. Build dashboard features, auth flows, and edge function toolings.",
    applyUrl: "https://supabase.com/careers",
    source: "Company ATS",
    postedAt: "2 days ago",
    postedHoursAgo: 48,
    visaSponsored: false
  },
  {
    id: "global-automattic-1",
    title: "Senior Software Engineer (Distributed Systems)",
    company: "Automattic",
    companyWebsite: "https://automattic.com",
    location: "Remote - Worldwide",
    country: "Worldwide Remote",
    countryCode: "GLOBAL",
    industry: "Web Publishing & Open Source",
    workType: "Remote",
    employmentType: "Full-time",
    experienceLevel: "Senior",
    salary: "$120,000 - $160,000 USD",
    requiredSkills: ["JavaScript", "TypeScript", "React", "PHP", "MySQL", "RESTful APIs"],
    description: "Democratize publishing and commerce. Work on WordPress.com, WooCommerce, and Tumblr from anywhere on Earth.",
    applyUrl: "https://automattic.com/work-with-us",
    source: "RemoteOK",
    postedAt: "4 days ago",
    postedHoursAgo: 96,
    visaSponsored: false
  },
  {
    id: "global-postman-1",
    title: "API Platform Developer",
    company: "Postman",
    companyWebsite: "https://postman.com",
    location: "Remote - Worldwide",
    country: "Worldwide Remote",
    countryCode: "GLOBAL",
    industry: "API Development Platform",
    workType: "Remote",
    employmentType: "Full-time",
    experienceLevel: "Mid Level",
    salary: "$115,000 - $155,000 USD",
    requiredSkills: ["Node.js", "TypeScript", "React", "Docker", "RESTful APIs", "GraphQL"],
    description: "Empower 30M+ developers to design, test, and mock APIs faster on the world's leading API platform.",
    applyUrl: "https://www.postman.com/company/careers",
    source: "RemoteOK",
    postedAt: "1 day ago",
    postedHoursAgo: 16,
    visaSponsored: false
  },
  {
    id: "global-zapier-1",
    title: "Workflow Automation Backend Engineer",
    company: "Zapier",
    companyWebsite: "https://zapier.com",
    location: "Remote - Global",
    country: "Worldwide Remote",
    countryCode: "GLOBAL",
    industry: "Workflow Automation & AI",
    workType: "Remote",
    employmentType: "Full-time",
    experienceLevel: "Senior",
    salary: "$145,000 - $185,000 USD",
    requiredSkills: ["Python", "Django", "React", "TypeScript", "AWS", "Kafka"],
    description: "Automate billions of tasks between 6,000+ business web applications with 100% remote workforce.",
    applyUrl: "https://zapier.com/jobs",
    source: "RemoteOK",
    postedAt: "2 days ago",
    postedHoursAgo: 44,
    visaSponsored: false
  },
  {
    id: "global-basecamp-1",
    title: "Ruby on Rails Product Developer",
    company: "37signals (Basecamp)",
    companyWebsite: "https://37signals.com",
    location: "Remote - Worldwide",
    country: "Worldwide Remote",
    countryCode: "GLOBAL",
    industry: "Project Management & Collaboration",
    workType: "Remote",
    employmentType: "Full-time",
    experienceLevel: "Senior",
    salary: "$150,000 - $180,000 USD",
    requiredSkills: ["Ruby on Rails", "JavaScript", "HTML5", "CSS3", "SQLite", "Linux"],
    description: "Work with the creators of Ruby on Rails building Basecamp and HEY with extreme care and zero bloated meetings.",
    applyUrl: "https://37signals.com/jobs",
    source: "RemoteOK",
    postedAt: "3 days ago",
    postedHoursAgo: 70,
    visaSponsored: false
  }
];

export async function matchJobsForResume(
  candidateSkills: string[],
  filters?: JobFilterOptions
): Promise<JobOpportunity[]> {
  const normalizedCandidateSkills = candidateSkills.map(s => s.toLowerCase());

  // Try fetching live public jobs from RemoteOK with a strict 3.5-second timeout
  let liveJobs: JobOpportunity[] = [];
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3500);

    const res = await fetch("https://remoteok.com/api?tag=engineer", {
      signal: controller.signal,
      headers: { "User-Agent": "ResumePulse-Platform" }
    });
    clearTimeout(timeoutId);

    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data)) {
        // Skip index 0 which is legal metadata in RemoteOK
        const items = data.slice(1, 35);
        liveJobs = items
          .filter((item: any) => item && item.position && item.company)
          .map((item: any, idx: number) => {
            const rawLocation = item.location || "Remote - Worldwide";
            let country: JobOpportunity["country"] = "Worldwide Remote";
            let countryCode = "GLOBAL";
            let stateProvince = "";
            let city = "";

            if (/usa|united states|us\b/i.test(rawLocation)) {
              country = "USA";
              countryCode = "US";
              if (/california|san francisco|sf\b/i.test(rawLocation)) {
                stateProvince = "California";
                city = "San Francisco";
              } else if (/new york|ny\b/i.test(rawLocation)) {
                stateProvince = "New York";
                city = "New York";
              }
            } else if (/canada|ca\b/i.test(rawLocation)) {
              country = "Canada";
              countryCode = "CA";
              if (/ontario|toronto/i.test(rawLocation)) {
                stateProvince = "Ontario";
                city = "Toronto";
              } else if (/vancouver|british columbia|bc\b/i.test(rawLocation)) {
                stateProvince = "British Columbia";
                city = "Vancouver";
              }
            } else if (/uk|united kingdom|london|great britain/i.test(rawLocation)) {
              country = "UK";
              countryCode = "GB";
              city = "London";
              stateProvince = "England";
            } else if (/germany|berlin|deutschland/i.test(rawLocation)) {
              country = "Germany";
              countryCode = "DE";
              city = "Berlin";
              stateProvince = "Berlin";
            }

            const tags: string[] = Array.isArray(item.tags) ? item.tags : ["Engineering", "Remote"];
            const posLower = (item.position || "").toLowerCase();

            // Infer experience level
            let experienceLevel: JobOpportunity["experienceLevel"] = "Mid Level";
            if (posLower.includes("senior") || posLower.includes("sr.") || posLower.includes("principal")) {
              experienceLevel = "Senior";
            } else if (posLower.includes("lead") || posLower.includes("staff") || posLower.includes("head") || posLower.includes("architect")) {
              experienceLevel = "Lead / Staff";
            } else if (posLower.includes("junior") || posLower.includes("jr") || posLower.includes("entry") || posLower.includes("intern") || posLower.includes("associate")) {
              experienceLevel = "Entry Level";
            }

            // Infer employment type
            let employmentType: JobOpportunity["employmentType"] = "Full-time";
            if (posLower.includes("intern") || tags.some(t => t.toLowerCase().includes("intern"))) {
              employmentType = "Internship";
            } else if (posLower.includes("part-time") || posLower.includes("part time") || tags.some(t => t.toLowerCase().includes("part-time"))) {
              employmentType = "Part-time";
            } else if (posLower.includes("contract") || posLower.includes("freelance") || tags.some(t => t.toLowerCase().includes("contract"))) {
              employmentType = "Contract";
            }

            const hoursAgo = Math.max(1, (idx * 2) + 1);
            let postedAt = `${hoursAgo} hours ago`;
            if (hoursAgo >= 24) {
              const days = Math.floor(hoursAgo / 24);
              postedAt = days === 1 ? "1 day ago" : `${days} days ago`;
            }

            return {
              id: `remoteok-${item.id || idx}`,
              title: item.position,
              company: item.company,
              companyLogo: item.company_logo || undefined,
              companyWebsite: item.url || `https://${item.company.toLowerCase().replace(/[^a-z0-9]/g, "")}.com`,
              location: rawLocation,
              city,
              stateProvince,
              country,
              countryCode,
              industry: "Technology & Software",
              workType: "Remote" as const,
              employmentType,
              experienceLevel,
              salary: item.salary || "$120,000 - $170,000 USD",
              requiredSkills: tags.slice(0, 6),
              matchedSkills: [],
              missingSkills: [],
              matchScore: 0,
              description: (item.description || item.position).replace(/<[^>]*>?/gm, "").slice(0, 240) + "...",
              applyUrl: item.url || item.apply_url || `https://www.linkedin.com/jobs/search/?keywords=${encodeURIComponent(item.company + " " + item.position)}`,
              source: "RemoteOK" as const,
              postedAt,
              postedHoursAgo: hoursAgo,
              visaSponsored: false
            };
          });
      }
    }
  } catch (err) {
    // Graceful fallback to rich catalog if API is unavailable
  }

  // Combine curated international catalog with live feed
  const allOpportunities = [...GLOBAL_JOB_CATALOG, ...liveJobs];

  // Calculate Match Score for each job based on candidate's skills
  const scoredJobs: JobOpportunity[] = allOpportunities.map(job => {
    const matched: string[] = [];
    const missing: string[] = [];

    job.requiredSkills.forEach(reqSkill => {
      const isMatched = normalizedCandidateSkills.some(candSkill =>
        candSkill.includes(reqSkill.toLowerCase()) ||
        reqSkill.toLowerCase().includes(candSkill)
      );

      if (isMatched) {
        matched.push(reqSkill);
      } else {
        missing.push(reqSkill);
      }
    });

    // Score calculation
    let matchScore = 50;
    if (job.requiredSkills.length > 0) {
      matchScore = Math.round((matched.length / job.requiredSkills.length) * 100);
      // Give a slight boost if candidate has overall strong tech breadth
      if (candidateSkills.length >= 6 && matchScore >= 40) {
        matchScore = Math.min(98, matchScore + 10);
      }
    }

    return {
      ...job,
      matchedSkills: matched,
      missingSkills: missing,
      matchScore
    };
  });

  // Filter based on user selections
  let results = scoredJobs;

  // 1. Country filter
  if (filters?.country && filters.country !== "ALL") {
    results = results.filter(j => 
      j.country.toLowerCase() === filters.country!.toLowerCase() || 
      (filters.country === "Remote" && j.workType === "Remote")
    );
  }

  // 2. Specific Location filter (e.g., Ontario, California, Toronto, London, Berlin, etc.)
  if (filters?.locationQuery && filters.locationQuery !== "ALL") {
    const loc = filters.locationQuery.toLowerCase();
    results = results.filter(j =>
      (j.stateProvince && j.stateProvince.toLowerCase().includes(loc)) ||
      (j.city && j.city.toLowerCase().includes(loc)) ||
      j.location.toLowerCase().includes(loc) ||
      j.country.toLowerCase().includes(loc) ||
      (loc === "remote" && j.workType === "Remote")
    );
  }

  // 3. Specific Skill Filter from Analyzed Skills (e.g., React, TypeScript, Python, etc.)
  if (filters?.selectedSkill && filters.selectedSkill !== "ALL") {
    const targetSkill = filters.selectedSkill.toLowerCase();
    results = results.filter(j =>
      j.requiredSkills.some(s => s.toLowerCase().includes(targetSkill) || targetSkill.includes(s.toLowerCase())) ||
      j.matchedSkills.some(s => s.toLowerCase().includes(targetSkill) || targetSkill.includes(s.toLowerCase()))
    );
  }

  if (filters?.selectedSkills && filters.selectedSkills.length > 0) {
    const targetSkills = filters.selectedSkills.map(s => s.toLowerCase());
    results = results.filter(j =>
      targetSkills.some(ts =>
        j.requiredSkills.some(s => s.toLowerCase().includes(ts) || ts.includes(s.toLowerCase()))
      )
    );
  }

  // 4. Work Location Type filter (Remote, Hybrid, On-site)
  if (filters?.workType && filters.workType !== "ALL") {
    results = results.filter(j => j.workType.toLowerCase() === filters.workType!.toLowerCase());
  }

  // 5. Employment Type filter (Full-time, Part-time, Contract, Internship)
  if (filters?.employmentType && filters.employmentType !== "ALL") {
    results = results.filter(j => j.employmentType.toLowerCase() === filters.employmentType!.toLowerCase());
  }

  // 6. Experience Level filter (Entry Level, Mid Level, Senior, Lead / Staff)
  if (filters?.experienceLevel && filters.experienceLevel !== "ALL") {
    results = results.filter(j => {
      const el = j.experienceLevel.toLowerCase();
      const target = filters.experienceLevel!.toLowerCase();
      if (target.includes("entry")) return el.includes("entry");
      if (target.includes("mid")) return el.includes("mid");
      if (target.includes("senior")) return el.includes("senior");
      if (target.includes("lead") || target.includes("staff")) return el.includes("lead") || el.includes("staff");
      return el === target;
    });
  }

  // 7. Date Posted filter (24h, week, month)
  if (filters?.datePosted && filters.datePosted !== "ALL") {
    if (filters.datePosted === "24h") {
      results = results.filter(j => j.postedHoursAgo <= 24);
    } else if (filters.datePosted === "week" || filters.datePosted === "7d") {
      results = results.filter(j => j.postedHoursAgo <= 168);
    } else if (filters.datePosted === "month" || filters.datePosted === "30d") {
      results = results.filter(j => j.postedHoursAgo <= 720);
    }
  }

  // 8. Role & Keyword search query
  if (filters?.roleQuery) {
    const q = filters.roleQuery.toLowerCase();
    results = results.filter(j =>
      j.title.toLowerCase().includes(q) ||
      j.company.toLowerCase().includes(q) ||
      j.requiredSkills.some(s => s.toLowerCase().includes(q)) ||
      j.location.toLowerCase().includes(q) ||
      (j.city && j.city.toLowerCase().includes(q)) ||
      (j.stateProvince && j.stateProvince.toLowerCase().includes(q))
    );
  }

  // Sort descending by Match Score
  return results.sort((a, b) => b.matchScore - a.matchScore);
}

// Group jobs by company in real-time to generate Company Spotlights with Similar Company Explorer
export function getHiringCompanies(jobs: JobOpportunity[]): CompanySpotlight[] {
  const map = new Map<string, {
    company: string;
    companyLogo?: string;
    companyWebsite?: string;
    location: string;
    city?: string;
    stateProvince?: string;
    country: string;
    countryCode: string;
    industry: string;
    roles: JobOpportunity[];
    skillsSet: Set<string>;
    visaSponsored: boolean;
  }>();

  for (const job of jobs) {
    const key = job.company.toLowerCase().trim();
    if (!map.has(key)) {
      map.set(key, {
        company: job.company,
        companyLogo: job.companyLogo,
        companyWebsite: job.companyWebsite || job.applyUrl,
        location: job.location,
        city: job.city,
        stateProvince: job.stateProvince,
        country: job.country,
        countryCode: job.countryCode,
        industry: job.industry || "Software & Technology",
        roles: [],
        skillsSet: new Set(),
        visaSponsored: false
      });
    }

    const entry = map.get(key)!;
    entry.roles.push(job);
    job.requiredSkills.forEach(s => entry.skillsSet.add(s));
    if (job.visaSponsored) entry.visaSponsored = true;
  }

  const allCompanyNames = Array.from(map.values()).map(v => ({ name: v.company, industry: v.industry, country: v.country }));
  const spotlights: CompanySpotlight[] = [];

  map.forEach((value) => {
    const totalScore = value.roles.reduce((acc, r) => acc + r.matchScore, 0);
    const avgMatchScore = Math.round(totalScore / value.roles.length);
    const highestMatchScore = Math.max(...value.roles.map(r => r.matchScore));

    // Find 4 similar peer companies in same industry or region
    const similar = allCompanyNames
      .filter(c => c.name.toLowerCase() !== value.company.toLowerCase())
      .filter(c => c.industry === value.industry || c.country === value.country)
      .slice(0, 4)
      .map(c => c.name);

    spotlights.push({
      company: value.company,
      companyLogo: value.companyLogo,
      companyWebsite: value.companyWebsite,
      location: value.location,
      city: value.city,
      stateProvince: value.stateProvince,
      country: value.country,
      countryCode: value.countryCode,
      industry: value.industry,
      openRolesCount: value.roles.length,
      avgMatchScore,
      highestMatchScore,
      roles: value.roles,
      topSkills: Array.from(value.skillsSet).slice(0, 6),
      careersUrl: value.roles[0]?.applyUrl || `https://www.linkedin.com/jobs/search/?keywords=${encodeURIComponent(value.company)}`,
      visaSponsoredAvailable: value.visaSponsored,
      similarCompanies: similar
    });
  });

  // Sort companies by highest match score and open roles count
  return spotlights.sort((a, b) => {
    if (b.highestMatchScore !== a.highestMatchScore) {
      return b.highestMatchScore - a.highestMatchScore;
    }
    return b.openRolesCount - a.openRolesCount;
  });
}
