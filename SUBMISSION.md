# SUBMISSION

## Assumptions & priorities

**Priority order:**

- Primeiro garanti que o dado bruto era normalizado antes de chegar na UI, centralizando toda validação e tratamento de legacy no `normalizeResultData`
- Depois implementei o sistema de renderização extensível com mapa de componentes no `ResultView`
- Por último refinei os componentes para que fossem apenas responsáveis por renderizar, sem nenhuma lógica de validação de dados

**Explicit out-of-scope:**

- Não implementei renderização de HTML rico (ex: markdown). Se necessário, exigiria sanitização via DOMPurify antes de qualquer `dangerouslySetInnerHTML`
- Não tratei IDs duplicados nas seções (o mock tem dois `sec-notice`). A decisão foi usar o `index` como fallback de `key` no React, e documentar como limitação da API atual
- Não implementei os fixtures alternativos (`emptyTitle`, `missingSections`, `minimalLegacy`) em código — o normalizer já os cobre graciosamente, mas não há testes ou cenários visuais dedicados

**With more time:**

- Adicionaria testes unitários no `normalizeResultData` cobrindo cada caso do mock
- Criaria um mecanismo de registro de novos tipos de seção sem precisar editar o `ResultView` diretamente
- Avaliaria mover os estilos inline dos componentes para CSS modules ou uma solução mais escalável
- Implementaria um estilo mais elegante

---

## Reflective questions

**What did you change and why?**

- Iniciei o projeto com Vite por ser mais rápido de configurar e com build mais eficiente que alternativas como CRA (Create React App.)
- Organizei as pastas por responsabilidade: `components`, `view`, `service`, `utils`, `types` e `data` — cada pasta tem um papel claro e facilita encontrar e adicionar código no futuro
- Separei o `ResultView` em componentes menores (`TextSection`, `ListSection`, `CalloutSection`, `UnknownSection`) para que cada um tenha uma única responsabilidade de renderização
- Movi o `mockData` para uma pasta `data/` que representa a origem dos dados, deixando claro que ali ficam as fontes
- Criei um `resultService` que isola de onde os dados vêm — hoje é o mock, mas trocar para uma API real exige mudança em apenas um lugar
- Criei as tipagens em `types/index.ts` com discriminated union (`Section`), o que permite ao TypeScript saber exatamente qual formato esperar em cada componente sem usar `any`
- Criei o `normalizeResultData` para tratar toda a inconsistência do dado bruto antes de chegar na UI: resolve o campo legacy `body → content`, converte items de lista de string para objeto, valida `severity`, descarta seções sem conteúdo válido
- Coloquei o `ResultView` dentro de `view/` pensando em escalabilidade: quando o projeto tiver múltiplas telas com rotas, cada view já tem seu lugar
- O `UnknownSection` só aparece em ambiente de desenvolvimento (`import.meta.env.DEV`) — em produção renderiza `null` silenciosamente, sem expor detalhes técnicos ao usuário

**What would you improve next?**

- Adicionaria testes unitários no normalizer, que é o código mais crítico do projeto — qualquer regressão ali afeta tudo
- Extrairia os estilos inline para CSS modules, deixando os componentes mais limpos e os estilos mais fáceis de manter
- Adicionaria tratamento explícito para IDs duplicados, que hoje causam warnings do React sobre `key` props duplicadas

**How would you scale this if the number of section types grew ~10×?**

- A arquitetura atual já escala bem: adicionar um novo tipo exige criar o componente, adicionar uma entrada no `sectionNormalizers` e uma entrada no `SECTION_RENDERERS` — são três lugares previsíveis e isolados
- Se os tipos crescessem muito, o próximo passo seria um sistema de registro automático onde cada módulo de seção se auto-registra, eliminando a necessidade de editar arquivos centrais a cada novo tipo

**How did you handle unknown/invalid data and ambiguous payloads?**

- Seções com `type` desconhecido (ex: `highlight`, `freetext`) passam pelo normalizer sem tratamento específico e chegam ao `UnknownSection`, que exibe um aviso em desenvolvimento e nada em produção
- Seções sem `type` ou com conteúdo inválido (ex: `text` sem `content` e sem `body`) retornam `null` no normalizer e são filtradas antes de chegar ao `ResultView`
- O campo legacy `body` é resolvido para `content` no normalizer — o componente `TextSection` nunca soube que `body` existiu
- Items de lista heterogêneos (string ou objeto) são normalizados para `ListItemObject` pelo `normalizeListItem` — o `ListSection` recebe sempre um array uniforme
- XSS: o React escapa conteúdo de texto por padrão. Nenhum uso de `dangerouslySetInnerHTML` foi introduzido. Se o produto precisar renderizar HTML rico no futuro, a sanitização deve passar por uma biblioteca como DOMPurify

**How would you test this?**

- Unitário no `normalizeResultData`: um teste por caso do mock — `body` legacy, `items: null`, seção sem `type`, `severity` inválido, item de lista como string, callout sem `severity`. É o código mais crítico e mais fácil de testar isoladamente
- Unitário nos componentes: verificar que `TextSection` renderiza o conteúdo, que `ListSection` retorna `null` com items vazio, que `CalloutSection` aplica o estilo correto por severity
- Integração no `ResultView`: passar o payload completo do mock e verificar que renderiza sem erros, que seções desconhecidas não aparecem em produção, que o título aparece quando existe e não aparece quando está vazio
- Os fixtures (`emptyTitle`, `missingSections`, `minimalLegacy`) são casos de integração prontos para virar testes

**Which decision would you revisit first if this went to production tomorrow?**

- O `as Section` no `normalizeSection` para tipos desconhecidos. Hoje ele força um cast que o TypeScript não consegue verificar. Em produção, isso poderia mascarar um dado malformado chegando no componente errado. Revisaria introduzindo um tipo explícito `UnknownSectionType` na union para que o TypeScript rastreie esse caminho com segurança

**Did you use AI tools?**

- Sim, usei o Claude como par de programação para discutir decisões de arquitetura, revisar tipagens e validar abordagens. Todo o código foi revisado, entendido e adaptado por mim — o AI acelerou a iteração, mas as decisões de design foram tomadas em conjunto e compreendidas antes de aplicadas
