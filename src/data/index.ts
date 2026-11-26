// `link` é o id da seção (sem "#"), usado pelo smoothScroll.
export const navItems: { label: string; link: string; isNew?: boolean }[] = [
  { label: "OMNIX", link: "omnix", isNew: true },
  { label: "Software house", link: "dev" },
  { label: "Cloud", link: "cloud" },
  { label: "Produtos", link: "products" },
  { label: "Sobre", link: "about" },
];

/** Os três pilares (hero, rodapé). `link` é o id da seção. */
export const pillars = [
  { label: "Software house", link: "dev" },
  { label: "Cloud", link: "cloud" },
  { label: "Produtos Dix", link: "products" },
];

/** Seção "Software house". */
export const softwareHouse = {
  before: [
    "Backlog que só aumenta",
    "Vaga de desenvolvedor aberta há meses",
    "Integração que ninguém tem tempo de fazer",
    "Equipe interna presa na sustentação",
  ],
  after: [
    "Uma equipe pronta, que já conhece saúde",
    "Entregas andando em paralelo às suas",
    "Integrações e sistemas saindo do papel",
    "Sua equipe livre para o que é estratégico",
  ],
  modes: [
    {
      title: "Projeto sob medida",
      body: "Você traz o problema, a Dix entrega o sistema: do levantamento à produção.",
      image: "/site/projeto.jpg",
      position: "50% 50%",
    },
    {
      title: "Outsourcing",
      body: "Profissionais da Dix trabalhando dentro do seu time, no seu processo.",
      image: "/site/outsourcing.jpg",
      position: "50% 50%",
    },
    {
      title: "Reforço de equipe",
      body: "Um time da Dix assume uma frente do backlog para desafogar os seus desenvolvedores.",
      image: "/site/reforco.jpg",
      position: "50% 30%",
    },
  ],
  built: [
    // Vieram do artefato "Dix Linha de Cuidado"
    "Gateway de APIs",
    "Integrações entre sistemas de saúde",
    "Serviço de elegibilidade de beneficiários",
    "Portal do paciente",
    "Totem de atendimento",
    "Painel de chamadas",
    "Módulo de faturamento",
    "Registro eletrônico de saúde",
    // Itens abaixo são exemplos do que a Dix desenvolve, não entregas
    // confirmadas. Por isso o título da lista é "O que a Dix desenvolve".
    // Só volte a dizer "já entregou" se a lista tiver apenas entregas reais.
    "Aplicativos para clínicas",
    "Marketplace de saúde",
    "Aplicativo do beneficiário para operadoras",
    "Plataforma de telemedicina",
    "Agendamento online de consultas e exames",
    "Autorização de guias e auditoria médica",
    "Gestão de saúde ocupacional",
    "Painéis de indicadores e BI em saúde",
    "Assinatura digital de documentos clínicos",
  ],
};

/** Seção "Cloud". */
export const cloudItems = [
  { title: "Migração", body: "Do servidor local para a nuvem, sem parar a operação." },
  { title: "Operação", body: "Ambientes em contêineres, publicação e versionamento automatizados." },
  { title: "Backup", body: "Cópias automáticas dos bancos de dados, guardadas fora do ambiente." },
  { title: "Monitoramento", body: "Acompanhamento dos serviços e dos registros de cada sistema." },
];

export const cloudProviders = [
  { name: "Amazon Web Services", logo: "/site/aws.svg", h: 44 },
  { name: "Huawei Cloud", logo: "/site/huawei.png", h: 32 },
  { name: "Tencent Cloud", logo: "/site/tencent.svg", h: 92 },
];

/**
 * Cenários ilustrativos do diagrama do hero — um por produto da plataforma Omni.
 * Não são dados reais — a seção mostra "Ilustração".
 */
export type FlowScenario = {
  product: string;
  source: { name: string; detail: string };
  steps: { label: string; title: string; body: string; foot?: string; bubble?: boolean }[];
};

export const heroScenarios: FlowScenario[] = [
  {
    product: "OMNIDIX",
    source: { name: "WhatsApp", detail: "Mensagem de paciente · 10:02" },
    steps: [
      {
        label: "Recebe",
        title: "Oi, preciso remarcar minha consulta de sexta.",
        body: "",
        bubble: true,
      },
      {
        label: "Organiza",
        title: "Atendimento aberto",
        body: "Fila da central, histórico do paciente e protocolo ANS gerado.",
      },
      {
        label: "Resolve",
        title: "Consulta remarcada",
        body: "Terça, 14h, direto na agenda. Confirmação enviada ao paciente.",
        foot: "Confirmado 10:07",
      },
    ],
  },
  {
    product: "DIXHub",
    source: { name: "Laboratório", detail: "Hemograma completo · 09:20" },
    steps: [
      {
        label: "Recebe",
        title: "Resultado de exame",
        body: "Hemograma completo recebido do sistema do laboratório.",
        foot: "Recebido 09:20 · via integração",
      },
      {
        label: "Organiza",
        title: "Sumário clínico",
        body: "Vinculado ao histórico do paciente, com origem e autoria preservadas.",
      },
      {
        label: "Resolve",
        title: "Visão longitudinal",
        body: "Exames, consultas e cuidados do paciente numa linha do tempo única.",
      },
    ],
  },
  {
    product: "DIXFlow",
    source: { name: "Prontuário", detail: "Consulta finalizada · 11:40" },
    steps: [
      {
        label: "Recebe",
        title: "Gatilho disparado",
        body: "Atendimento finalizado no prontuário.",
        foot: "11:40",
      },
      {
        label: "Organiza",
        title: "IA em ação",
        body: "O processo de acompanhamento do paciente é iniciado automaticamente.",
      },
      {
        label: "Resolve",
        title: "Processo concluído",
        body: "Resultado registrado no ecossistema Omni, sem trabalho manual.",
        foot: "Automação · DIXFlow",
      },
    ],
  },
];

/**
 * OMNIX, a IA da Dix (seção de novidade). Textos alinhados aos roteiros dos
 * vídeos de lançamento; telas com dados fictícios.
 */
export const omnixSkills = [
  {
    kicker: "Prontuário",
    title: "Resumo do histórico em segundos",
    body: "Abriu o prontuário? A OMNIX resume queixa, exame e conduta. Você revisa antes de usar.",
    image: "/omnix/tela-resumo.png",
    alt: "Cartão Resumo de IA no prontuário, com o histórico do paciente resumido",
  },
  {
    kicker: "Atendimento",
    title: "Ela sugere. Você confirma.",
    body: "A OMNIX lê a conversa e monta a sugestão: paciente, dia, horário e profissional. A agenda só é criada depois da sua confirmação.",
    image: "/omnix/tela-sugestao.png",
    alt: "Cartão Sugestão de agendamento da IA, com os botões Confirmar e Editar",
  },
  {
    kicker: "Guias",
    title: "Aviso de exame repetido",
    body: "Ao montar a guia, ela confere os resultados do paciente. Se já existe um válido, avisa com a data, e você decide.",
    image: "/omnix/tela-alerta.png",
    alt: "Aviso Conferência de resultados, com as opções Solicitar novamente e Remover da guia",
  },
  {
    kicker: "Cuidado",
    title: "Evolução do risco",
    body: "Avaliação por avaliação, você vê quanto o nível de risco do paciente mudou e para onde foi.",
    image: "/omnix/tela-risco.png",
    alt: "Gráfico da evolução do risco cardiovascular de um paciente ao longo das avaliações",
  },
];

export const omnixExtras = [
  {
    title: "Pergunte do seu jeito",
    body: "“Quem eu atendo hoje?” “Tem horário livre na quinta?” Ela procura e responde.",
  },
  {
    title: "Nos bastidores",
    body: "Segue o fluxo que a sua clínica montou: identifica o paciente, envia as mensagens de rotina e passa para a equipe quando precisa.",
  },
  {
    title: "Com a cara da sua clínica",
    body: "Olhos, detalhes e acessórios: quem escolhe o visual da OMNIX é você.",
  },
];

/** Produtos da plataforma Omni (seção "Produtos"). Texto curto: a demonstração em vídeo mostra o resto. */
export const products = [
  {
    name: "OMNIDIX",
    tagline: "Atendimento, agenda e prontuário em um só lugar",
    body: "A equipe responde, liga, agenda, atende por vídeo e registra o prontuário na mesma tela, com o apoio da OMNIX, a IA da Dix.",
    // Mesma ordem das cenas da demonstração em vídeo.
    modules: ["WhatsApp", "Telefonia", "Agenda", "Videochamada", "Prontuário", "Acompanhamento"],
  },
  {
    name: "DIXHub",
    tagline: "O hub de saúde do paciente",
    body: "Consultas, exames e cuidados num sumário clínico único, integrado a sistemas de terceiros via FHIR.",
    modules: [],
  },
  {
    name: "DIXFlow",
    tagline: "Processos automatizados com IA",
    body: "Automatiza processos da operação, conectado ao OMNIDIX e ao DIXHub.",
    modules: [],
  },
];

export const pillarCards: {
  title: string;
  gradientText: string;
  subtitle: string;
  deliverables: string[];
  image: string;
}[] = [
  {
    title: "DixCloud",
    gradientText: "Soluções em cloud",
    subtitle:
      "Sob medida, com migração eficiente e expertise com os principais players do mercado, alinhadas às necessidades do seu negócio.",
    deliverables: [
      "Migração para a nuvem",
      "AWS, Huawei Cloud e Tencent Cloud",
      "Infraestrutura e outsourcing de TI",
    ],
    image: "/images/dixcloud.png",
  },
  {
    title: "DixHealth",
    gradientText: "Plataforma Omni para a saúde",
    subtitle:
      "Produtos próprios para operadoras, clínicas e empresas: atendimento, dados de saúde e automação com IA.",
    deliverables: [
      "OMNIDIX: atendimento, agenda e prontuário",
      "DIXHub: hub de saúde com sumário clínico",
      "DIXFlow: automação de processos com IA",
    ],
    image: "/images/dixhealth.png",
  },
  {
    title: "DixDevelop",
    gradientText: "Fábrica de software",
    subtitle:
      "Especializada em saúde, com equipe multidisciplinar e domínio das tecnologias atuais. Inovação e qualidade para transformar o setor.",
    deliverables: [
      "Sistemas sob medida",
      "Equipe multidisciplinar",
      "Foco no setor de saúde",
    ],
    image: "/images/dixdevelop.png",
  },
];

// Antes eram SVGs com texto desenhado (public/card/*.svg); agora são dados,
// para que o texto se adapte ao tema e seja acessível.
export const essence = {
  mission: {
    title: "Nossa missão",
    parts: [
      "Oferecer serviços de ",
      { em: "qualidade" },
      ", ",
      { em: "segurança" },
      " e ",
      { em: "transparência" },
      ", atendendo necessidades com soluções que impulsionam ",
      { em: "eficiência" },
      ", ",
      { em: "transformação digital e competitividade" },
      ".",
    ] as (string | { em: string })[],
  },
  vision: {
    title: "Nossa visão",
    parts: [
      "Ser a maior ",
      { em: "integradora nacional de soluções tecnológicas" },
      ", líder em serviços ",
      { em: "excelentes" },
      " e soluções ",
      { em: "inovadoras" },
      " para as necessidades dos clientes.",
    ] as (string | { em: string })[],
  },
  values: {
    title: "Nossos valores",
    items: [
      "Honestidade",
      "Responsabilidade",
      "Satisfação do cliente",
      "Conhecimento",
      "Competência",
    ],
  },
};

export const contactPhones = [
  "(27) 3441 2622",
  "(51) 9 8598 0078",
  "(55) 9 9698 0112",
];

/**
 * Canais diretos. O WhatsApp usa NEXT_PUBLIC_PHONE_NUMBER quando definido
 * (como no site original); sem a variável, cai no número dos anúncios.
 */
const whatsappNumber = (process.env.NEXT_PUBLIC_PHONE_NUMBER || "552734412622").replace(/\D/g, "");

/** Link do WhatsApp com a mensagem já escrita. */
export const whatsappLink = (message: string) =>
  `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

/**
 * Mensagens por origem do clique: quem atende já sabe de onde a pessoa veio
 * e sobre o que ela quer falar.
 */
export const whatsappMessages = {
  geral: "Olá! Vim pelo site da Dix e gostaria de falar com um especialista.",
  hero: "Olá! Vim pelo site da Dix e quero entender como vocês podem ajudar a minha equipe de tecnologia.",
  omnix: "Olá! Vi a OMNIX, a IA da Dix, no site e quero conhecer.",
  softwareHouse: "Olá! Vim pelo site da Dix e quero falar sobre um projeto de desenvolvimento de software.",
  cloud: "Olá! Vim pelo site da Dix e quero falar sobre migração e operação em nuvem.",
  produto: (name: string) => `Olá! Vim pelo site da Dix e quero conhecer o ${name}.`,
  fechamento: "Olá! Vim pelo site da Dix. Minha equipe está sem fôlego e quero falar com um especialista.",
};

export const contactEmail = "relacionamento@dixhealth.com.br";
export const contactLinks = {
  whatsapp: whatsappLink(whatsappMessages.geral),
  email: `mailto:${contactEmail}?subject=${encodeURIComponent("Gostaria de mais informações")}`,
};

export const clients = [
  { name: "ArcelorMittal", logo: "/clients/arcelor.png" },
  { name: "Unimed", logo: "/clients/unimed.png" },
  { name: "Valsa", logo: "/clients/valsa.png" },
  { name: "Clínica DOC", logo: "/clients/doc.png" },
  { name: "Mental Map", logo: "/clients/mentalmap.png" },
  { name: "QA IT", logo: "/clients/qa.png" },
  { name: "Integra", logo: "/clients/integra.png" },
  { name: "Hemocord", logo: "/clients/hemocord.png" },
  { name: "Hemolab", logo: "/clients/hemolab.png" },
  { name: "IAX Soluções", logo: "/clients/iax.png" },
  { name: "Simax", logo: "/clients/simax.png" },
  { name: "SPA Saúde", logo: "/clients/spa.png" },
  { name: "Agros", logo: "/clients/agros.png" },
  { name: "Healthmap", logo: "/clients/healthmap.png" },
  { name: "Vividus", logo: "/clients/vividus.png" },
];
