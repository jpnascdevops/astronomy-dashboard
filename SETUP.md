# 🌌 Guia de Configuração - Astronomy Dashboard

Tutorial completo para configurar e executar o Astronomy Dashboard no seu Mac.

## Pré-requisitos

Antes de começar, certifique-se de ter instalado:

### 1. Node.js (v18 ou superior)

Verifique se já tem instalado:
\`\`\`bash
node --version
\`\`\`

Se não tiver, instale via Homebrew:
\`\`\`bash
# Instalar Homebrew (se não tiver)
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Instalar Node.js
brew install node
\`\`\`

Ou baixe diretamente de: https://nodejs.org/

### 2. Git

Verifique a instalação:
\`\`\`bash
git --version
\`\`\`

Se necessário, instale:
\`\`\`bash
brew install git
\`\`\`

## Instalação Passo a Passo

### Passo 1: Clone o Repositório

\`\`\`bash
# Clone o projeto
git clone https://github.com/seu-usuario/astronomy-dashboard.git

# Entre na pasta do projeto
cd astronomy-dashboard
\`\`\`

### Passo 2: Instale as Dependências

\`\`\`bash
# Instalar todas as dependências do projeto
npm install
\`\`\`

Este comando instalará:
- Next.js 16
- React 19
- Tailwind CSS v4
- React Query (para gerenciamento de dados)
- Radix UI (componentes de interface)
- Lucide React (ícones)
- E outras bibliotecas necessárias

**Nota**: A instalação pode levar alguns minutos na primeira vez.

### Passo 3: Configure as Variáveis de Ambiente

\`\`\`bash
# Copie o arquivo de exemplo
cp .env.example .env.local
\`\`\`

Edite o arquivo `.env.local` e adicione sua chave da NASA API:

\`\`\`env
NEXT_PUBLIC_NASA_API_KEY=sua_chave_aqui
\`\`\`

**Como obter a chave da NASA API:**
1. Acesse: https://api.nasa.gov/
2. Preencha o formulário com seu email
3. Você receberá a chave instantaneamente
4. Cole a chave no arquivo `.env.local`

**Nota**: O valor `DEMO_KEY` funciona, mas tem limite de requisições. Para uso completo, obtenha sua própria chave.

### Passo 4: Execute o Projeto

\`\`\`bash
# Modo desenvolvimento (com hot-reload)
npm run dev
\`\`\`

O aplicativo estará disponível em: **http://localhost:3000**

## Comandos Disponíveis

\`\`\`bash
# Desenvolvimento
npm run dev          # Inicia o servidor de desenvolvimento na porta 3000

# Produção
npm run build        # Cria a build otimizada para produção
npm run start        # Inicia o servidor de produção

# Qualidade de Código
npm run lint         # Verifica erros de código
\`\`\`

## Estrutura do Projeto

\`\`\`
astronomy-dashboard/
├── app/                      # Next.js App Router
│   ├── layout.tsx           # Layout principal com providers
│   ├── page.tsx             # Página inicial
│   └── globals.css          # Estilos globais e tema
├── src/
│   ├── components/          # Componentes React
│   │   ├── Dashboard.tsx    # Componente principal do dashboard
│   │   ├── Header.tsx       # Cabeçalho com localização
│   │   ├── ApodCard.tsx     # Imagem Astronômica do Dia
│   │   ├── MoonPhaseWidget.tsx
│   │   ├── PlanetsVisibility.tsx
│   │   ├── CelestialEvents.tsx
│   │   ├── SkyMapSection.tsx
│   │   ├── DeepSkyExplorer.tsx
│   │   └── ObservationConditions.tsx
│   ├── hooks/               # React Hooks customizados
│   │   └── use-geolocation.ts
│   ├── services/            # Serviços de API
│   │   └── astronomy-api.ts
│   ├── types/               # TypeScript types
│   │   └── index.ts
│   └── App.tsx              # Componente raiz da aplicação
├── components/ui/           # Componentes de UI reutilizáveis
│   ├── button.tsx
│   ├── card.tsx
│   ├── badge.tsx
│   └── ...
└── lib/
    └── utils.ts             # Funções utilitárias
\`\`\`

## Funcionalidades

### 🌍 Detecção Automática de Localização
O app detecta automaticamente sua localização geográfica para fornecer dados precisos de:
- Horários do nascer/pôr do sol
- Visibilidade de planetas
- Mapa do céu local
- Fases da lua

### 📸 APOD - Astronomy Picture of the Day
Exibe diariamente a imagem astronômica selecionada pela NASA com explicação completa.

### 🌙 Fases da Lua
Visualização em tempo real da fase atual da lua com porcentagem de iluminação.

### 🪐 Visibilidade de Planetas
Cards mostrando quais planetas estão visíveis hoje com horários de nascimento e ocaso.

### 📅 Eventos Celestes
Calendário com eventos astronômicos futuros:
- Eclipses solares e lunares
- Chuvas de meteoros
- Conjunções planetárias
- Fases da lua

### 🗺️ Mapa do Céu
Lista de objetos celestes visíveis em tempo real com:
- Estrelas brilhantes
- Constelações
- Planetas
- Ordenação por tipo e magnitude

### ✨ Deep Sky Explorer
Explorador de objetos do céu profundo (galáxias, nebulosas, aglomerados) organizados por constelação.

### 🌡️ Condições de Observação
Score de qualidade baseado em:
- Cobertura de nuvens
- Temperatura
- Visibilidade
- Umidade
- Velocidade do vento

## Solução de Problemas

### Erro: "Cannot find module"
\`\`\`bash
# Limpe o cache e reinstale
rm -rf node_modules package-lock.json
npm install
\`\`\`

### Erro: "Port 3000 is already in use"
\`\`\`bash
# Use outra porta
PORT=3001 npm run dev
\`\`\`

### Dados não carregam
1. Verifique sua chave da NASA API no `.env.local`
2. Verifique sua conexão com a internet
3. Permita acesso à localização no navegador

### Build falha
\`\`\`bash
# Limpe o cache do Next.js
rm -rf .next
npm run build
\`\`\`

## Requisitos do Sistema

- **Sistema Operacional**: macOS 10.15 ou superior
- **Node.js**: v18.0.0 ou superior
- **RAM**: Mínimo 4GB (recomendado 8GB)
- **Navegador**: Chrome, Firefox, Safari ou Edge (versões recentes)
- **Conexão**: Internet estável para APIs

## APIs Utilizadas

O projeto consome as seguintes APIs públicas:
- **NASA APOD API**: Imagem astronômica do dia
- **Open-Meteo API**: Dados meteorológicos (sem necessidade de chave)
- **Astronomy API**: Dados sobre planetas, lua e eventos celestes (simulada)

## Personalização

### Mudar o Tema
Edite `app/globals.css` e ajuste as variáveis CSS na seção `@theme inline`.

### Adicionar Novos Componentes
Crie novos componentes em `src/components/` e importe no `Dashboard.tsx`.

### Modificar Intervalo de Atualização
No arquivo de cada componente, ajuste o valor em `refetchInterval` (padrão: 300000ms = 5 minutos).

## Deploy em Produção

### Vercel (Recomendado)
\`\`\`bash
# Instale a CLI da Vercel
npm i -g vercel

# Deploy
vercel
\`\`\`

### Build Local
\`\`\`bash
npm run build
npm run start
\`\`\`

## Suporte

Para problemas ou dúvidas:
1. Verifique este guia de configuração
2. Consulte a documentação do Next.js: https://nextjs.org/docs
3. Abra uma issue no GitHub

## Licença

MIT License - veja o arquivo LICENSE para detalhes.

---

**Desenvolvido com ❤️ usando Next.js 16, React 19 e Tailwind CSS v4**
