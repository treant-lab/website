# Roadmap: Redesign do Site TreantLab

## Objetivo
Atualizar o visual do site da Treant, modernizar componentes e adicionar uma seção de Produtos/Ecossistema destacando os principais projetos.

---

## Fase 1: Melhorias Visuais e UI/UX

### Task 1.1: Modernizar Design System
- [ ] Atualizar paleta de cores (manter verde emerald como primário, adicionar gradientes modernos)
- [ ] Melhorar tipografia com fontes mais modernas (Inter, Geist)
- [ ] Adicionar mais variações de espaçamento e sombras
- [ ] Implementar glass-morphism em cards e overlays

### Task 1.2: Melhorar Componentes UI
- [ ] Redesenhar cards de serviços com hover effects mais sofisticados
- [ ] Adicionar animações suaves no scroll (stagger animations)
- [ ] Melhorar o loader/splash screen
- [ ] Criar componente de navigation mais responsivo (mobile menu)
- [ ] Adicionar particle background ou mesh gradient animado

### Task 1.3: Otimizar Hero Section
- [ ] Layout mais impactante com imagens/ilustrações 3D
- [ ] Animações de texto mais dinâmicas
- [ ] CTAs mais destacados com micro-interações

---

## Fase 2: Nova Seção de Produtos e Ecossistema

### Task 2.1: Criar Estrutura de Dados dos Produtos
Adicionar no messages/en.json e messages/pt.json:

```json
{
  "Products": {
    "section_title": "Our Ecosystem",
    "section_subtitle": "Products and platforms developed by TreantLab",
    "products": [
      {
        "id": "tevi",
        "name": "TEVI",
        "tagline": "Identity Verification Platform",
        "description": "Complete identity verification platform with facial recognition, document OCR, fraud detection and anti-fraud intelligence. Detects document spoofing, age mismatch, device fraud farms and behavioral bots.",
        "features": ["Face Recognition", "Document OCR", "Fraud Detection", "Mobile SDKs", "Age Mismatch Detection", "Device Hygiene"],
        "status": "production",
        "icon": "shield-check",
        "category": "security"
      },
      {
        "id": "tamandua",
        "name": "Tamandua EDR",
        "tagline": "Endpoint Detection & Response",
        "description": "Next-generation EDR solution combining Malware-SMELL zero-shot learning, behavioral analysis, YARA/Sigma rules, deception techniques and automated response playbooks.",
        "features": ["Zero-shot Malware Detection", "Behavioral Analysis", "Attack Graph", "Honeyfiles/Honeytokens", "Automated Response"],
        "status": "production",
        "icon": "shield",
        "category": "security"
      },
      {
        "id": "fortress",
        "name": "Fortress Exchange",
        "tagline": "Privacy-focused Crypto Exchange",
        "description": "Full-stack cryptocurrency exchange platform with focus on privacy coins (Monero, Zcash). Order book trading, wallet management and real-time WebSocket updates.",
        "features": ["Multi-Currency (BTC, ETH, XMR, ZEC)", "Order Book Trading", "Secure Wallets", "KYC/AML Framework", "Mobile App"],
        "status": "production",
        "icon": "bitcoin",
        "category": "fintech"
      },
      {
        "id": "guarapay",
        "name": "GuaraPay",
        "tagline": "Fintech Infrastructure",
        "description": "Complete fintech infrastructure with payment processing, SDKs and secure integration APIs for financial applications.",
        "features": ["Payment Processing", "Multi-platform SDKs", "Secure APIs", "Transaction Monitoring"],
        "status": "production",
        "icon": "credit-card",
        "category": "fintech"
      },
      {
        "id": "restitue",
        "name": "Restitue.ai",
        "tagline": "Tax Credit Recovery SaaS",
        "description": "SaaS platform for recovering PIS/COFINS monophasic tax credits. Automated NFe XML audit, AI-powered sales assistant and detailed reporting.",
        "features": ["NFe XML Processing", "Automated Credit Calculation", "AI Sales Assistant", "PDF/Excel Reports", "Multi-tenant"],
        "status": "production",
        "icon": "receipt",
        "category": "fintech"
      },
      {
        "id": "pokerzone",
        "name": "PokerZone",
        "tagline": "Online Poker Platform",
        "description": "Real-time multiplayer poker platform built with Phoenix LiveView and PixiJS Canvas. Full featured game rooms, tournaments and player progression.",
        "features": ["Real-time Multiplayer", "PixiJS Canvas", "Tournament System", "Player Progression", "WebSocket Live Updates"],
        "status": "production",
        "icon": "gamepad-2",
        "category": "gaming"
      },
      {
        "id": "kairos",
        "name": "Kairos",
        "tagline": "Binary Options Trading Platform",
        "description": "Real-time trading platform inspired by IQOption. Binary options, forex and crypto trading with live charts, mobile app and instant payouts.",
        "features": ["Binary Options", "Real-time Charts", "Mobile Trading", "Instant Payouts", "Multi-asset Support"],
        "status": "production",
        "icon": "trending-up",
        "category": "fintech"
      }
    ]
  }
}
```

### Task 2.2: Criar Componente ProductCard
Arquivo: `components/product-card.tsx`
- Card com glassmorphism effect
- Ícone animado
- Status badge (production/beta)
- Lista de features com chips
- Hover com expand effect

### Task 2.3: Criar Seção Products
Arquivo: `components/sections/products-section.tsx`
- Grid responsivo de produtos
- Animações staggered no scroll
- Filtro por status opcional
- Link para página de detalhes (futuro)

### Task 2.4: Integrar na Página Principal
- Adicionar seção após Services
- Manter consistência visual com resto do site
- Adicionar link na navegação

---

## Fase 3: Melhorias Técnicas

### Task 3.1: Performance
- [ ] Otimizar imagens com next/image
- [ ] Implementar lazy loading nos componentes
- [ ] Code splitting por seção

### Task 3.2: SEO e Meta Tags
- [ ] Adicionar meta tags Open Graph
- [ ] Estruturar dados JSON-LD
- [ ] Otimizar titles e descriptions

### Task 3.3: Acessibilidade
- [ ] Melhorar contraste de cores
- [ ] Adicionar aria-labels
- [ ] Garantir navegação por teclado

---

## Fase 4: Conteúdo Adicional

### Task 4.1: Página de Produtos Individual (Opcional)
- Rota `/products/[id]`
- Detalhes técnicos de cada produto
- Screenshots/demos
- Documentação/links

### Task 4.2: Blog/Cases (Futuro)
- Seção de casos de sucesso
- Blog técnico

---

## Estrutura de Arquivos a Criar/Modificar

```
website/
├── app/
│   └── page.tsx                    # MODIFICAR - adicionar ProductsSection
├── components/
│   ├── product-card.tsx            # CRIAR
│   ├── sections/
│   │   └── products-section.tsx    # CRIAR
│   ├── ui/
│   │   └── badge.tsx               # MODIFICAR - adicionar variantes
│   └── animated-background.tsx     # CRIAR (opcional)
├── messages/
│   ├── en.json                     # MODIFICAR - adicionar Products
│   └── pt.json                     # MODIFICAR - adicionar Products
├── styles/
│   └── globals.css                 # MODIFICAR - novos estilos
└── public/
    └── static/
        ├── products/               # CRIAR - ícones dos produtos
        └── ...
```

---

## Prioridades para Claude-Flow

### Alta Prioridade (Executar Primeiro)
1. Task 2.1 - Criar estrutura de dados dos produtos
2. Task 2.2 - Criar ProductCard component
3. Task 2.3 - Criar ProductsSection
4. Task 2.4 - Integrar na página principal

### Média Prioridade
5. Task 1.2 - Melhorar componentes UI existentes
6. Task 1.1 - Modernizar design system

### Baixa Prioridade (Opcional)
7. Task 1.3 - Otimizar Hero
8. Tasks Fase 3 - Melhorias técnicas
9. Tasks Fase 4 - Conteúdo adicional

---

## Comandos Claude-Flow

```bash
# Criar swarm para executar o redesign completo
claude-flow hive-mind spawn "Redesign do site TreantLab seguindo ROADMAP_REDESIGN.md em /mnt/d/treant/website/:
1) Adicionar seção de produtos/ecossistema com 7 produtos: TEVI, Tamandua EDR, Fortress Exchange, GuaraPay, Restitue.ai, PokerZone, Kairos
2) Criar componentes ProductCard e ProductsSection com glassmorphism, animações staggered e filtro por categoria (security/fintech/gaming)
3) Atualizar messages/en.json e messages/pt.json com dados dos produtos
4) Modernizar visual dos componentes existentes
5) Melhorar animações e UI"

# Ou executar em etapas:

# Etapa 1: Criar estrutura de dados dos produtos
claude-flow hive-mind spawn "Atualizar /mnt/d/treant/website/messages/en.json e pt.json adicionando seção Products com 7 produtos (TEVI, Tamandua, Fortress, GuaraPay, Restitue, PokerZone, Kairos) conforme ROADMAP_REDESIGN.md"

# Etapa 2: Criar componentes
claude-flow hive-mind spawn "Criar componentes em /mnt/d/treant/website/components/: 1) product-card.tsx com glassmorphism e animações hover 2) sections/products-section.tsx com grid responsivo e filtro por categoria"

# Etapa 3: Integrar na página
claude-flow hive-mind spawn "Integrar ProductsSection na página principal /mnt/d/treant/website/app/page.tsx após a seção de Services, adicionar link Products na navegação"

# Etapa 4: Melhorar visual
claude-flow hive-mind spawn "Modernizar visual do site /mnt/d/treant/website/: melhorar cards, adicionar mesh gradients, otimizar animações de scroll"
```

---

## Notas de Implementação

### Produtos Validados (com repositório Git):

#### Segurança & Identity
1. **TEVI** (`/mnt/d/treant/tevi/`) - **GIT VALIDADO**
   - Plataforma completa de verificação de identidade
   - Features: Face Recognition, OCR, Fraud Detection, Age Mismatch, Device Hygiene
   - SDKs: iOS, Android, React Native
   - Stack: Elixir/Phoenix + Python ML (ai-service) + React
   - Componentes: backend, frontends/dashboard, frontends/backoffice, sdks, ai-service, kairos
   - Status: Production Ready (v1.1)

2. **Tamandua EDR** (`/mnt/d/treant/tamandua/`) - **GIT VALIDADO**
   - EDR de próxima geração com Malware-SMELL (zero-shot learning)
   - Behavioral Analysis, YARA/Sigma, Deception (Honeyfiles)
   - Stack: Elixir Backend + Python ML + Rust Agent + C Kernel Drivers
   - Status: Production

#### Fintech
3. **Fortress Exchange** (`/mnt/d/treant/fortress_exchange/`) - **GIT VALIDADO**
   - Exchange de criptomoedas focada em privacidade
   - Multi-currency: BTC, ETH, XMR, ZEC
   - Order Book Trading, KYC/AML, Secure Wallets
   - Stack: Elixir Umbrella + React + React Native + Solidity
   - 2798 testes (98.68% passing)
   - Status: Production

4. **GuaraPay** (`/mnt/d/treant/guarapay/`) - **GIT VALIDADO**
   - Infraestrutura fintech completa
   - Backend + Frontends + SDKs
   - Status: Production

5. **Restitue.ai** (`/mnt/d/treant/restitue/`) - **GIT VALIDADO**
   - SaaS para recuperação de créditos PIS/COFINS monofásico
   - Upload NFe XML, análise automatizada, relatórios PDF/Excel
   - AI Assistant para vendas
   - Stack: Elixir/Phoenix + React + Inertia.js
   - Status: Production

#### Gaming
6. **PokerZone** (`/mnt/d/treant/poker/`) - **GIT VALIDADO**
   - Plataforma de poker online multiplayer
   - Canvas PixiJS + Phoenix LiveView
   - Tournaments, game rooms, player progression
   - URL: poker.treantlab.org
   - Status: Production

#### Fintech (adicional)
7. **Kairos** (`/mnt/d/treant/kairos/`) - Projeto interno (sem git público)
   - Plataforma de trading tipo IQOptions
   - Binary options, forex, crypto trading
   - Real-time charts, mobile app
   - Stack: Elixir/Phoenix + Mobile
   - Status: Production

### Nota sobre componentes:
- `ai-service` é componente interno do TEVI (não produto separado)
- Treant BaaS (seed, tree, soil, cluster_seed) está no workspace treant-lab - considerar adicionar se relevante
