/**
 * Conteúdo público do site, derivado de `04_layout/layout-allocation.xlsx`
 * (abas Layout, Conteudos, Servicos, SEO_por_secao), de `05_seo/seo.json`
 * e de `02_imagens/manifest.csv`.
 *
 * Regra: todo texto exibido sai daqui. Este arquivo só contém copy publicável;
 * notas internas ficam fora dele (ver `publication-guard.ts`).
 */

export type MediaAsset = {
  src: string;
  fallbackSrc?: string;
  width: number;
  height: number;
  alt: string;
  /** object-position para cortes apertados (ex.: "50% 30%" mantém o rosto). */
  focus?: string;
};

export type LinkItem = {
  label: string;
  href: string;
  external?: boolean;
};

export type IconName =
  | "instagram"
  | "microphone"
  | "chats"
  | "brain"
  | "compass"
  | "book";

/* ------------------------------------------------------------------ */
/* Identidade                                                          */
/* ------------------------------------------------------------------ */

const instagramUrl = "https://www.instagram.com/euyasmineali/";

export const person = {
  name: "Yasmine Ali",
  username: "euyasmineali",
  handle: "@euyasmineali",
  role: "Mentora de oratória",
  tagline: "Clareza, presença e autenticidade.",
  description: "Ensina a se expressar com clareza, presença e autenticidade.",
  instagramUrl,
  lang: "pt-BR",
} as const;

/* ------------------------------------------------------------------ */
/* Mídias locais (alt text de 02_imagens/manifest.csv)                 */
/* ------------------------------------------------------------------ */

export const media = {
  profile: {
    src: "/assets/asset_profile.webp",
    fallbackSrc: "/assets/asset_profile.jpg",
    width: 150,
    height: 150,
    alt: "Retrato frontal de Yasmine Ali usando camisa clara sobre fundo neutro quente.",
  },
  content01: {
    src: "/assets/asset_content_01.webp",
    width: 1080,
    height: 1080,
    alt: "Capa taupe de um post com o número 5, um oval branco e o texto sobre motivos para criar o hábito da leitura.",
  },
  content02: {
    src: "/assets/asset_content_02.webp",
    width: 361,
    height: 640,
    alt: "Retrato vertical de Yasmine Ali sentada em um ambiente interno, com um copo sobre a mesa.",
  },
  content03: {
    src: "/assets/asset_content_03.webp",
    width: 361,
    height: 640,
    alt: "Yasmine Ali em um palco diante de uma lousa com palavras e elementos desenhados, em ambiente iluminado.",
  },
  authority01: {
    src: "/assets/asset_authority_01.webp",
    width: 480,
    height: 640,
    alt: "Yasmine Ali usando fones de ouvido diante de um microfone em um ambiente de gravação.",
  },
  /* Capas dos Reels (poster público do embed; texto embutido na imagem). */
  featured01: {
    src: "/assets/asset_featured_01.webp",
    width: 603,
    height: 1073,
    alt: "Yasmine Ali fala para a câmera apontando para a frente, com o texto “Disciplina é Liberdade” sobre a imagem.",
    focus: "50% 15%",
  },
  content04: {
    src: "/assets/asset_content_04.webp",
    width: 1080,
    height: 1919,
    alt: "Yasmine Ali, de blazer branco, fala para a câmera em um quarto com quadros na parede, com o texto “Como a pressa te afasta dos seus objetivos”.",
    focus: "50% 15%",
  },
  content05: {
    src: "/assets/asset_content_05.webp",
    width: 1080,
    height: 1921,
    alt: "Yasmine Ali, com expressão de surpresa, fala para a câmera abaixo de um balão de pensamento, com a frase “eu nunca vou chegar lá,”.",
    focus: "50% 35%",
  },
  content06: {
    src: "/assets/asset_content_06.webp",
    width: 1080,
    height: 1919,
    alt: "Yasmine Ali, de blazer branco, fala para a câmera com o texto “A verdade que os inteligentes não querem ouvir” e um emoji de cérebro.",
    focus: "50% 50%",
  },
  content07: {
    src: "/assets/asset_content_07.webp",
    width: 1080,
    height: 1919,
    alt: "Yasmine Ali, de blazer branco, fala para a câmera com as mãos unidas e o texto “5 hábitos que estão te deixando exausto”.",
    focus: "50% 72%",
  },
  og01: {
    src: "/assets/asset_og_01.webp",
    fallbackSrc: "/assets/asset_og_01.jpg",
    width: 1200,
    height: 630,
    alt: "Capa sobre cinco motivos para criar o hábito da leitura.",
  },
} satisfies Record<string, MediaAsset>;

/* ------------------------------------------------------------------ */
/* Textos de interface                                                 */
/* ------------------------------------------------------------------ */

export const ui = {
  skipLink: "Pular para o conteúdo",
  newTab: "abre em nova aba",
  homeLink: "Yasmine Ali, voltar ao início",
  menuOpen: "Abrir menu",
  menuClose: "Fechar menu",
  menuTitle: "Menu",
  primaryNav: "Navegação principal",
  footerNav: "Links do rodapé",
  scrollHint: "Role para continuar",
  backToTop: "Voltar ao topo",
  instagram: "Instagram",
  watchOnInstagram: "Assistir no Instagram",
  viewOnInstagram: "Ver no Instagram",
  badges: { reel: "Reel", post: "Post" },
  filters: {
    label: "Filtrar conteúdos",
    all: "Todos",
    reel: "Reels",
    post: "Posts",
  },
} as const;

/* ------------------------------------------------------------------ */
/* Navegação (aba Layout, linha Header)                                */
/* ------------------------------------------------------------------ */

export const navigation = {
  brand: person.name,
  links: [
    { label: "Conteúdos", href: "/#conteudos" },
    { label: "Sobre", href: "/#sobre" },
    { label: "Insights", href: "/insights" },
    { label: "Contato", href: "/#contato" },
  ] satisfies LinkItem[],
  social: { label: "Instagram", href: instagramUrl, external: true } satisfies LinkItem,
} as const;

/* ------------------------------------------------------------------ */
/* Ordem narrativa E (aba Layout)                                      */
/* ------------------------------------------------------------------ */

export const homeSections = [
  "hero",
  "destaque",
  "grid",
  "pilares",
  "sobre",
  "servicos",
  "autoridade",
  "fechamento",
  "contato",
] as const;

export type HomeSectionId = (typeof homeSections)[number];

/* ------------------------------------------------------------------ */
/* Hero                                                                */
/* ------------------------------------------------------------------ */

export const hero = {
  anchor: "inicio",
  eyebrow: `${person.role} · ${person.handle}`,
  title: "Clareza para dizer o que você pensa. Presença para ser ouvida.",
  emphasis: ["Clareza", "Presença"],
  subtitle: "Expresse suas ideias com mais clareza, presença e autenticidade.",
  primaryCta: { label: "Entrar em contato", href: "#contato" } satisfies LinkItem,
  secondaryCta: { label: "Ver conteúdos", href: "#conteudos" } satisfies LinkItem,
  /* Blocos de textura decorativos no lugar das 3 fotos do hero. */
  textures: ["clareza", "presença", "autenticidade"],
} as const;

/* ------------------------------------------------------------------ */
/* Conteúdo em destaque                                                */
/* ------------------------------------------------------------------ */

export const featured = {
  anchor: "destaque",
  eyebrow: "Em destaque",
  heading: "Conteúdos para ampliar repertório e expressão",
  item: {
    id: "Cos1BRQpZIZ",
    kind: "post" as const,
    theme: "Leitura e desenvolvimento pessoal",
    date: "2023-02-15",
    title: "Cinco ideias para criar o hábito da leitura",
    subtitle: "Repertório também se constrói no cotidiano.",
    summary:
      "Um convite para transformar a leitura em rotina e perceber o que ela pode acrescentar à memória, à concentração, ao vocabulário e à criatividade.",
    image: media.content01,
    cta: {
      label: "Ver no Instagram",
      href: "https://www.instagram.com/p/Cos1BRQpZIZ/",
      external: true,
    } satisfies LinkItem,
  },
} as const;

/* ------------------------------------------------------------------ */
/* Grid de conteúdos (aba Conteudos)                                   */
/* ------------------------------------------------------------------ */

export type ContentItem = {
  id: string;
  type: "post" | "reel";
  /** Somente quando o assunto foi confirmado; sem título, o card mostra a data. */
  title?: string;
  excerpt?: string;
  theme?: string;
  /** ISO, somente quando a data exata é conhecida. */
  date?: string;
  image?: MediaAsset;
  permalink: string;
  order: number;
};

export const contentGrid = {
  anchor: "conteudos",
  eyebrow: "Conteúdos",
  heading: "Ideias para comunicar melhor no dia a dia",
  subtitle: "Conteúdos de oratória, comunicação, mentalidade, disciplina e repertório.",
  cta: {
    label: "Explorar mais conteúdos",
    href: instagramUrl,
    external: true,
  } satisfies LinkItem,
  /* O post Cos1BRQpZIZ (ordem 1) já ocupa a seção de destaque.
     Cards sem assunto confirmado mostram a data como título. */
  items: [
    {
      id: "DLyId6CvopZ",
      type: "reel",
      title: "Disciplina como liberdade",
      excerpt:
        "Uma reflexão sobre escolhas conscientes, a partir do livro Disciplina é Liberdade.",
      theme: "Mentalidade e disciplina",
      image: media.featured01,
      permalink: "https://www.instagram.com/reel/DLyId6CvopZ/",
      order: 2,
    },
    {
      id: "DWb5vPSABsU",
      type: "reel",
      date: "2026-03-28",
      image: media.content02,
      permalink: "https://www.instagram.com/euyasmineali/reel/DWb5vPSABsU/",
      order: 3,
    },
    {
      id: "DVo2FjaEcj8",
      type: "reel",
      date: "2026-03-08",
      image: media.content03,
      permalink: "https://www.instagram.com/euyasmineali/reel/DVo2FjaEcj8/",
      order: 4,
    },
    {
      id: "DOpcvHWgOMj",
      type: "post",
      date: "2025-09-15",
      image: media.authority01,
      permalink: "https://www.instagram.com/euyasmineali/p/DOpcvHWgOMj/",
      order: 5,
    },
    {
      id: "DNzFc92QBNu",
      type: "reel",
      date: "2025-08-25",
      image: media.content04,
      permalink: "https://www.instagram.com/euyasmineali/reel/DNzFc92QBNu/",
      order: 6,
    },
    {
      id: "DNoxKc0M3-G",
      type: "reel",
      date: "2025-08-21",
      image: media.content05,
      permalink: "https://www.instagram.com/euyasmineali/reel/DNoxKc0M3-G/",
      order: 7,
    },
    {
      id: "DNjZTJ7hTsh",
      type: "reel",
      date: "2025-08-19",
      image: media.content06,
      permalink: "https://www.instagram.com/euyasmineali/reel/DNjZTJ7hTsh/",
      order: 8,
    },
    {
      id: "DNRmguQM0xx",
      type: "reel",
      date: "2025-08-12",
      image: media.content07,
      permalink: "https://www.instagram.com/euyasmineali/reel/DNRmguQM0xx/",
      order: 9,
    },
  ] satisfies ContentItem[] as ContentItem[],
};

/* ------------------------------------------------------------------ */
/* Faixa de pilares                                                    */
/* ------------------------------------------------------------------ */

export const pillars = {
  anchor: "pilares",
  eyebrow: "Pilares",
  heading: "Comunicação, mentalidade e disciplina",
  lead: "Comunicação que começa pela clareza.",
  marquee: [
    "Oratória",
    "Comunicação",
    "Mentalidade",
    "Disciplina",
    "Leitura e repertório",
    "Clareza",
    "Presença",
    "Autenticidade",
  ],
  items: [
    { title: "Oratória", text: "Organizar ideias e sustentá-las em voz alta.", icon: "microphone" },
    { title: "Comunicação", text: "Escuta, escolha de palavras e intenção.", icon: "chats" },
    { title: "Mentalidade", text: "O olhar para o próprio desenvolvimento.", icon: "brain" },
    { title: "Disciplina", text: "Escolhas conscientes, repetidas no dia a dia.", icon: "compass" },
    { title: "Leitura e repertório", text: "Livros e ideias que ampliam referências.", icon: "book" },
  ] satisfies { title: string; text: string; icon: IconName }[],
};

/* ------------------------------------------------------------------ */
/* Sobre                                                               */
/* ------------------------------------------------------------------ */

export const about = {
  anchor: "sobre",
  eyebrow: "Sobre",
  heading: "Expressão com clareza, presença e autenticidade",
  statement: "Uma voz mais clara também pode ser mais sua.",
  reveal:
    "Yasmine Ali é mentora de oratória e ensina a se expressar com clareza, presença e autenticidade.",
  body: "Nos conteúdos que compartilha, a comunicação aparece ao lado de mentalidade, disciplina e leitura: repertório que se constrói no cotidiano, com escolhas conscientes.",
  portrait: media.profile,
  facts: [
    { label: "Atuação", value: person.role },
    { label: "Temas", value: "Comunicação, mentalidade e disciplina" },
    { label: "Onde acompanhar", value: person.handle, href: instagramUrl },
  ] satisfies { label: string; value: string; href?: string }[],
};

/* ------------------------------------------------------------------ */
/* Serviços (aba Servicos — linha única)                               */
/* ------------------------------------------------------------------ */

export const services = {
  anchor: "servicos",
  eyebrow: "Próximo passo",
  heading: "Encontre o próximo passo",
  items: [
    {
      id: "conversa",
      name: "Vamos conversar sobre o próximo passo",
      description:
        "Conte o que você quer desenvolver na sua comunicação. A conversa começa por uma mensagem.",
      cta: { label: "Entrar em contato", href: "#contato" } satisfies LinkItem,
    },
  ],
};

/* ------------------------------------------------------------------ */
/* Temas de especialidade                                              */
/* ------------------------------------------------------------------ */

export const expertise = {
  anchor: "temas",
  eyebrow: "Temas",
  heading: "Temas que atravessam a conversa",
  intro: "Assuntos que se cruzam quando o tema é se expressar melhor.",
  themes: ["Clareza", "Presença", "Comunicação", "Mentalidade", "Disciplina", "Repertório"],
  image: media.authority01,
  cta: { label: "Ver conteúdos", href: "#conteudos" } satisfies LinkItem,
};

/* ------------------------------------------------------------------ */
/* Fechamento                                                          */
/* ------------------------------------------------------------------ */

export const closing = {
  anchor: "fechamento",
  heading: "Sua voz merece espaço para ser ouvida.",
  subtitle: "Comece pelo próximo passo que já faz sentido para você.",
  cta: { label: "Entrar em contato", href: "#contato" } satisfies LinkItem,
};

/* ------------------------------------------------------------------ */
/* Contato — somente canais confirmados                                */
/* ------------------------------------------------------------------ */

export const contact = {
  anchor: "contato",
  eyebrow: "Contato",
  heading: "Vamos conversar sobre sua comunicação",
  intro: "Mentoria, convite ou colaboração: a conversa começa por uma mensagem no Instagram.",
  channels: [
    {
      id: "instagram",
      icon: "instagram",
      label: "Instagram",
      handle: person.handle,
      description: "Envie uma mensagem direta pelo perfil.",
      cta: "Enviar mensagem",
      href: instagramUrl,
    },
  ] satisfies {
    id: string;
    icon: IconName;
    label: string;
    handle: string;
    description: string;
    cta: string;
    href: string;
  }[],
};

/* ------------------------------------------------------------------ */
/* Footer                                                              */
/* ------------------------------------------------------------------ */

export const footer = {
  name: person.name,
  role: person.role,
  tagline: person.tagline,
  links: [
    { label: "Instagram", href: instagramUrl, external: true },
    { label: "Insights", href: "/insights" },
    { label: "Privacidade", href: "/privacidade" },
  ] satisfies LinkItem[],
  rights: "Todos os direitos reservados.",
};

/* ------------------------------------------------------------------ */
/* Insights (seo.json → insights)                                      */
/* ------------------------------------------------------------------ */

export type Insight = {
  slug: string;
  title: string;
  description: string;
  sections: { heading: string; body: string }[];
  related?: LinkItem;
};

const relatedReading: LinkItem = {
  label: "Post relacionado no Instagram",
  href: "https://www.instagram.com/p/Cos1BRQpZIZ/",
  external: true,
};

export const insightsPage = {
  eyebrow: "Insights",
  title: "Ideias para se expressar com clareza e presença",
  intro:
    "Textos curtos sobre oratória, comunicação, leitura e disciplina, para ler, praticar e voltar quando precisar.",
  indexLabel: "Nesta página",
  backHome: "Voltar para o início",
  faqHeading: "Perguntas frequentes",
  ctaHeading: "Quer conversar sobre sua comunicação?",
  cta: { label: "Entrar em contato", href: "/#contato" } satisfies LinkItem,
  items: [
    {
      slug: "como-falar-com-mais-clareza",
      title: "Como falar com mais clareza sem perder autenticidade",
      description:
        "Princípios práticos para organizar ideias, escolher palavras e sustentar uma presença coerente.",
      sections: [
        {
          heading: "O que clareza significa na prática",
          body: "Clareza é a outra pessoa entender o que você quis dizer, do jeito que você quis dizer. Ela depende menos de palavras difíceis e mais de saber qual é a ideia central antes de começar.",
        },
        {
          heading: "Como organizar uma ideia principal",
          body: "Antes de falar, tente resumir a mensagem em uma frase. Quando ela cabe em uma frase, fica mais fácil escolher exemplos e decidir o que pode ficar de fora.",
        },
        {
          heading: "Palavras simples não são palavras fracas",
          body: "Vocabulário simples aproxima. Uma palavra precisa e conhecida costuma comunicar mais do que um termo rebuscado que pede tradução.",
        },
        {
          heading: "Presença e ritmo na fala",
          body: "Pausas dão tempo para a ideia chegar. Desacelerar nos pontos importantes ajuda quem escuta a acompanhar o raciocínio.",
        },
        {
          heading: "Exercício de aplicação",
          body: "Escolha um assunto do seu dia, escreva a ideia principal em uma frase e explique em voz alta em até um minuto. Depois, observe o que ficou claro e o que pode ser simplificado.",
        },
      ],
      related: relatedReading,
    },
    {
      slug: "presenca-ao-falar",
      title: "Presença ao falar: atenção, corpo e intenção",
      description:
        "Como construir presença ao se expressar em situações cotidianas, sem depender de performance.",
      sections: [
        {
          heading: "Presença não é personagem",
          body: "Ter presença não exige virar outra pessoa. Tem mais a ver com estar inteira na conversa do que com parecer confiante.",
        },
        {
          heading: "Contato visual e escuta",
          body: "Olhar para quem escuta e prestar atenção às reações cria uma conversa de mão dupla, mesmo quando só uma pessoa está falando.",
        },
        {
          heading: "Gestos que apoiam a mensagem",
          body: "Gestos funcionam melhor quando acompanham o sentido da fala. Não é preciso coreografar: basta não esconder as mãos nem brigar com o próprio corpo.",
        },
        {
          heading: "Ritmo e pausas",
          body: "Uma pausa antes de um ponto importante chama atenção para ele. Variar o ritmo ajuda a manter quem escuta por perto.",
        },
        {
          heading: "Prática segura",
          body: "Comece por situações de baixo risco, como uma conversa entre amigos ou uma reunião curta, e aumente o desafio aos poucos.",
        },
      ],
    },
    {
      slug: "disciplina-e-comunicacao",
      title: "Disciplina e comunicação: o hábito antes da performance",
      description:
        "Uma reflexão sobre consistência, escolhas conscientes e desenvolvimento de repertório.",
      sections: [
        {
          heading: "Disciplina como escolha",
          body: "Disciplina pode ser vista menos como rigidez e mais como uma escolha consciente, repetida, sobre aquilo que importa para você.",
        },
        {
          heading: "Pequenos treinos de comunicação",
          body: "Gravar um áudio curto, explicar uma ideia para alguém ou resumir uma leitura são treinos que cabem na rotina.",
        },
        {
          heading: "Leitura e repertório",
          body: "Ler com regularidade amplia referências e vocabulário, material que estará disponível quando chegar a hora de falar.",
        },
        {
          heading: "Como medir prática sem obsessão",
          body: "Anote o que praticou e o que percebeu. Acompanhar o processo costuma ser mais útil do que cobrar perfeição a cada tentativa.",
        },
        {
          heading: "Próximo passo",
          body: "Escolha um único treino para a próxima semana e repita. Uma constância pequena rende mais do que um plano grande abandonado.",
        },
      ],
      related: {
        label: "Reel relacionado no Instagram",
        href: "https://www.instagram.com/reel/DLyId6CvopZ/",
        external: true,
      },
    },
    {
      slug: "leitura-e-repertorio",
      title: "Leitura e repertório para se expressar melhor",
      description:
        "O que o hábito da leitura pode acrescentar à memória, ao vocabulário e à criatividade.",
      sections: [
        {
          heading: "Memória e concentração",
          body: "A leitura pede atenção sustentada, um exercício cada vez mais raro em uma rotina cheia de interrupções.",
        },
        {
          heading: "Vocabulário e escrita",
          body: "Quem lê entra em contato com palavras e construções novas, que aos poucos podem passar a fazer parte do próprio jeito de escrever e falar.",
        },
        {
          heading: "Conhecimento e compreensão",
          body: "Livros oferecem outros pontos de vista e ajudam a entender um assunto com mais profundidade antes de opinar sobre ele.",
        },
        {
          heading: "Criatividade",
          body: "Um repertório variado alimenta associações novas: exemplos, comparações e histórias que deixam uma explicação mais viva.",
        },
        {
          heading: "Como criar uma rotina",
          body: "Defina um momento fixo, comece com poucas páginas e deixe o livro por perto. O hábito se constrói pela repetição, não pela quantidade.",
        },
      ],
      related: relatedReading,
    },
    {
      slug: "autenticidade-na-fala",
      title: "Autenticidade na fala: como não soar ensaiada demais",
      description: "Um guia para equilibrar preparo, clareza e verdade na comunicação.",
      sections: [
        {
          heading: "Autenticidade não é improviso total",
          body: "Preparar-se não tira a naturalidade. O preparo dá segurança para que você consiga ser quem é durante a fala.",
        },
        {
          heading: "O que você quer dizer",
          body: "Antes de pensar em como falar, vale responder: qual é a minha intenção com essa fala? Ter clareza de propósito deixa o tom mais verdadeiro.",
        },
        {
          heading: "Estrutura sem engessar",
          body: "Um roteiro com abertura, ideia central e fechamento ajuda. Decorar cada palavra, por outro lado, costuma deixar a fala rígida.",
        },
        {
          heading: "Escuta e adaptação",
          body: "Observar quem está ouvindo permite ajustar exemplos, ritmo e profundidade sem perder o fio da mensagem.",
        },
        {
          heading: "Revisão pós-conversa",
          body: "Depois de uma fala importante, anote o que funcionou e o que você mudaria. Esse retorno honesto orienta a próxima vez.",
        },
      ],
    },
    {
      slug: "medo-de-se-expressar",
      title: "O que fazer quando dá medo de se expressar",
      description:
        "Perguntas e caminhos de reflexão para lidar com insegurança sem prometer soluções rápidas.",
      sections: [
        {
          heading: "Nomear o medo",
          body: "Perguntar a si mesma do que exatamente vem o receio, seja de errar, de julgamento ou de esquecer, torna o medo mais concreto e mais fácil de olhar.",
        },
        {
          heading: "Separar risco real de antecipação",
          body: "Muitas vezes o cenário imaginado é mais duro do que aquilo que de fato acontece. Diferenciar os dois ajuda a dar o primeiro passo.",
        },
        {
          heading: "Preparar uma frase de abertura",
          body: "Ter as primeiras palavras definidas pode diminuir a hesitação do início, que costuma ser o momento mais difícil.",
        },
        {
          heading: "Começar em situações menores",
          body: "Falar em grupos pequenos ou em contextos conhecidos permite praticar com menos pressão.",
        },
        {
          heading: "Buscar apoio adequado",
          body: "Quando o medo atrapalha a rotina de forma intensa, vale procurar profissionais preparados para acompanhar esse processo.",
        },
      ],
    },
  ] satisfies Insight[],
};

/* ------------------------------------------------------------------ */
/* FAQ (seo.json → faq; somente respostas confirmadas)                 */
/* ------------------------------------------------------------------ */

export const faq = [
  {
    question: "O que é oratória?",
    answer:
      "Oratória é a capacidade de organizar e expressar ideias com clareza, presença e intenção em diferentes situações.",
  },
  {
    question: "Como começar a falar com mais clareza?",
    answer:
      "Comece por uma ideia principal, use palavras simples, faça pausas e revise o que funcionou depois de cada conversa.",
  },
  {
    question: "Leitura ajuda na comunicação?",
    answer:
      "A leitura pode ampliar vocabulário, repertório e criatividade. O efeito depende da prática e da forma como cada pessoa aplica o que lê.",
  },
  {
    question: "Disciplina tem relação com comunicação?",
    answer:
      "A disciplina pode apoiar a consistência de qualquer prática de desenvolvimento, inclusive treinos de expressão e repertório.",
  },
];

/* ------------------------------------------------------------------ */
/* Privacidade                                                         */
/* ------------------------------------------------------------------ */

export const privacyPage = {
  title: "Privacidade",
  paragraphs: [
    "Este site é uma página de apresentação. Ele não tem formulários, não pede cadastro e não usa cookies de rastreamento nem ferramentas de análise de navegação.",
    "Os links para o Instagram levam a uma plataforma de terceiros, com política de privacidade própria. Mensagens enviadas por lá acontecem fora deste site.",
  ],
  backHome: "Voltar para o início",
};

export const notFoundPage = {
  title: "Página não encontrada",
  text: "O endereço pode ter mudado ou não existir mais.",
  backHome: "Voltar para o início",
};

/* ------------------------------------------------------------------ */
/* SEO (seo.json)                                                      */
/* ------------------------------------------------------------------ */

export const seo = {
  home: {
    title: "Yasmine Ali | Oratória, clareza e presença",
    description:
      "Yasmine Ali ensina expressão com clareza, presença e autenticidade, conectando oratória, comunicação, mentalidade e disciplina.",
  },
  openGraph: {
    title: "Yasmine Ali | Clareza, presença e autenticidade",
    description:
      "Conteúdos e caminhos para desenvolver sua expressão com mais clareza, presença e autenticidade.",
    image: media.og01,
  },
  twitter: {
    title: "Yasmine Ali | Oratória, clareza e presença",
    description:
      "Oratória, comunicação, mentalidade e disciplina em uma direção clara e humana.",
  },
  insights: {
    title: "Insights sobre oratória e comunicação | Yasmine Ali",
    description:
      "Ideias práticas sobre clareza, presença, autenticidade, leitura e disciplina na comunicação do dia a dia.",
  },
  privacy: {
    title: "Privacidade | Yasmine Ali",
    description: "Como este site trata informações de quem o visita.",
  },
  keywords: [
    "mentoria de oratória",
    "oratória",
    "comunicação clara",
    "presença na comunicação",
    "expressão autêntica",
    "mentalidade e disciplina",
    "desenvolvimento pessoal",
    "hábitos de leitura",
  ],
};
