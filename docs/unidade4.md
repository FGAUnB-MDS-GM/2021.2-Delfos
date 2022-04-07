---
title: Unidade 3
filename: unidade3.md
theme: jekyll-theme-architect
---

# O Projeto

## Versão 0.14

## Autores

### - Nicolas Roberto de Queiroz
### - Rafael Xavier Canabrava
### - Renann de Oliveira Gomes
### - Tiago Leão Buson

# Visão Geral do produto {#header}

## Declarção do problema

| O problema                   | É o descomprimento de atividades planejadas.                                                                                                    |
|------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------|
| Afeta                        | Alunos e professores.                                                                                                                           |
| Cujo impacto é               | O descumprimento de uma ou mais atividades previamente planejada, levando a diminuição do rendimento ou a um completo fracasso com a atividade. |
| Uma solução de sucesso seria | Salvar lembretes com alguma mensagem escolhida pelo usuário e alerta-lo no horário desejado.                                                    |

## Declaração de posição de produto

1. **Qual é o produto que você se propõe a desenvolver?** Aplicativo de organização pessoal com ferramentas diversificadas, entre elas a organização interna entre grupos, agendamento de notificações e widget .
2. **O que torna este produto diferente dos seus concorrentes?** Poderá montar grupos com lista de tarefas separando assim cada tarefa em um contexto diferente.
3. **Quem são os usuários-alvo e clientes do produto?** Qualquer pessoa com interesse em ferramentas de organização, desde estudantes até pessoas com compromissos diversificados.
4. **Por que os clientes deveriam utilizar / comprar este produto?** Por ter uma interface intuitiva facilitando o uso, além dos lembretes em notificações por push, assim tornando muito mais prática a organização de listas, tarefas ou compromissos.

| Para                | Alunos e professores.                                                                         |
|---------------------|----------------------------------------------------------------------------------------------------------------------|
| Quem                | Deseja se organizar melhor ou que esqueça facilmente de seus afazeres                                                |
| O (nome do produto) | O Delfos                                                                                                             |
| Que                 | Ajuda a organizar e lembrar das tarefas, além de possuir outras ferramentas para auxiliar o usuário a se organizar.  |
| Ao contrário        |  Trello                                                                                                              |
| Nosso produto       | Não necessita de conexão com a internet para usar suas funcionalidades e possui uma interface de fácil interação.    |

## Objetivos do produto

De maneira intuitiva proporcionar ao cliente uma forma de se organizar e se lembrar de todas as suas atividades planejadas.

## Escopo do produto

### Requisitos Funcionais

| N°  | Requisitos Funcionais	                                                             | Prioridade |
|-----|-----------------------------------------------------------------------------------|------------|
| RF1 | Deverá ser possível cadastrar atividades                                          | Alta       |
| RF2 | Deverá ser possível deletar atividades                                            | Alta       |
| RF3 | Deverá ser possível editar atividades                                             | Alta       |
| RF4 | Deverá ser possível visualizar atividades                                         | Alta       |
| RF5 | Deverá ser possível buscar atividades                                            | Média      |
| RF6 | Deverá ser possível agrupar atividades                                            | Média      |

Prioridades:
- Alta - Funcionalidade básica e essencial para o sistema
- Média - Funcionalidade importante
- Baixa - Funcionalidade desejável e complementar ao sistema


### Requisitos Não-funcionais

| Classificação  | Requisitos Não-funcionais                                          | Prioridade |
|----------------|--------------------------------------------------------------------|------------|
|  Implementação | A aplicação deve ser documentada através do GitPages               | Alta       |
| Implementação  | O app deve ser desenvolvido em react-native                        | Alta       |
| Implementação  | O versionamento do app deve ser feito pelo GitHub                  | Alta       |
| Portabilidade  | Haverá disponibilidade tanto para sistemas Android quanto para IOS | Alta       |
|  Produto       | Ocupará no máximo 500 mb de  memória do dispositivo                | Média      |
| Usabilidade    | O app não precisará de conexão com a internet para funcionar       | Média      |
| Usabilidade    | Deverá ser possível consultar agenda por meio de um calendário.    | Média      |
| Funcionalidade | O app terá um widget para que fique destacado na área de trabalho  | Baixa      |

## Mínimo Produto Viável (MVP)

[Link Canvas MVP 1](https://miro.com/app/board/uXjVOK02Oh0=/)

# Backlog do Produto

Este backlog foi produzido de acordo com a abordagem ágil e seguindo a perspectiva do SAFe, na qual uma função geral é classificada como “épico”. Desse épico derivam as “features”, que são como divisões de funcionalidades menores ainda, as histórias de usuário.

|                   Épico                   | Feature                      | ID   | História de usuário	                                                                                                                | Prioridade |
|:-----------------------------------------:|------------------------------|------|------------------------------------------------------------------------------------------------------------------------------------|------------|
|               Gerenciamento de atividades | Funções básicas de atividade | FB1  | Como usuário, eu quero ser capaz de cadastrar uma atividade para que eu seja lembrado da mesma depois.                             | Alta       |
| Gerenciamento de atividades               | Funções básicas de atividade | FB2  | Como usuário, eu quero ser capaz de deletar uma atividade caso ela não aconteça mais.                                              | Alta       |
| Gerenciamento de atividades               | Funções básicas de atividade | FB3  | Como usuário, eu quero ser capaz de editar uma atividade para que eu altere um horário, nome ou descrição da mesma.                | Alta       |
| Gerenciamento de atividades               | Funções básicas de atividade | FB4  | Como usuário, eu quero ser capaz de visualizar uma atividade para saber os detalhes da mesma.                                      | Alta       |
| Gerenciamento de atividades               | Funções básicas de atividade | FB5  | Como usuário, eu quero ser capaz de visualizar em um calendário minhas atividades semanais.                                        | Média      |
| Gerenciamento de atividades               | Funções básicas de atividade | FB6  | Como usuário, eu quero ser capaz de cadastrar post-its.                                                                            | Alta       |
| Gerenciamento de atividades               | Funções básicas de atividade | FB7  | Como usuário, eu quero ser capaz de deletar post-its.                                                                              | Alta       |
| Gerenciamento de atividades               | Funções básicas de atividade | FB8  | Como usuário, eu quero ser capaz de editar post-its.                                                                               | Alta       |
| Gerenciamento de atividades               | Funções básicas de atividade | FB9  | Como usuário, eu quero ser capaz de visualizar post-its.                                                                           | Alta       |
| Gerenciamento de atividades               | Funções básicas de atividade | FB10 | Como usuário, eu quero ser capaz de ver em um gráfico minha taxa de conclusão de atividades em um dia.                             | Média      |
| Gerenciamento de atividades               |     Filtro de atividades     | FA1  | Como usuário, eu quero poder ver todas as atividades de repetição única para ter noção do que será resolvido em um dia/horário só. | Baixa      |
| Gerenciamento de atividades               | Filtro de atividades         | FA2  | Como usuário, eu quero poder ver todas as atividades de repetição semanal para saber o que terei que fazer frequentemente.         | Baixa      |
| Gerenciamento de atividades               | Filtro de atividades         | FA3  | Como usuário, eu quero ser capaz de buscar uma atividade através de pesquisa por texto para que eu a ache facilmente.              | Média      |
| Gerenciamento de atividades               |   Organização das atividades | OA1  | Como usuário, eu quero poder agrupar atividades para que elas fiquem melhor organizadas.                                           | Média      |
| Gerenciamento de atividades               | Organização das atividades   | OA2  | Como usuário, eu quero um calendário para visualizar as atividades semanais.                                                       | Baixa      |

## Legenda:
- Alta - Funcionalidade básica e essencial para o sistema
- Média - Funcionalidade importante mas não essencial
- Baixa - Funcionalidade desejável e complementar ao sistema
- FB - Função Básica
- FA - Filtro de Atividades
- OA - Organização de Atividades

# Abordagem de desenvolvimento de software

## Metodologia

Levando em consideração o tamanho do projeto, foi decidido em grupo que a abordagem de metodologia Cascata é a mais apropriada para o projeto e para o grupo. Com o escopo de projeto médio e sem diversas modificações.


O escopo do projeto a ser desenvolvido é médio, com uma equipe de cinco integrantes, todos com pouquíssima experiência com as tecnologias a serem utilizadas. Os integrantes do grupo trabalharão em todos os aspectos do projeto, como desenvolvedores fullstack. O projeto será desenvolvido em React Native, Typescript, e terá como objetivo ser um aplicativo mobile.
A comunicação do time será efetuada através do Whatsapp, e o gerenciamento do fluxo do projeto utilizando o Trello e o Google Doc, com a possibilidade de ser substituído pelo Zenhub se a equipe assim preferir. As sprints retro e review serão efetuadas ao final de cada sprint utilizando o Microsoft Teams, Discord ou Telegram. O design do produto será idealizado utilizando o Figma.


## Processo

|                     Atividade                     |                                                                        Objetivo                                                                        |           Papel           |
|:-------------------------------------------------:|:------------------------------------------------------------------------------------------------------------------------------------------------------:|:-------------------------:|
| Definir requisitos                                | Deixar claro o que deve ser entregue em cada requisito                                                                                                 | Product Owner             |
| Organizar requisitos                              | Separar todos os requisitos em grupos de níveis de importância                                                                                         | Desenvolvedor             |
| Fazer protótipo inicial                           | Criar protótipo para facilitar a visualização e servir de guia para o processo de produção do produto final                                            | Equipe de Desenvolvimento |
| Organizar Sprint                                  | Organizar e dividir as tarefas a serem executadas a cada sprint                                                                                        | Equipe de Desenvolvimento |
| Executar Sprint                                   | Execução as tarefas definidas na organização das sprints                                                                                               | Equipe de Desenvolvimento |
| Teste dos requisitos produzidos                   | Testar e verificar a estabilidade e qualidade do grupo de requisitos produzidos                                                                        | Equipe de Desenvolvimento |
| Entrega do grupo de requisitos                    | Entregar e apresentar os requisitos produzidos e preparar possíveis modificações                                                                       | Equipe de Desenvolvimento |
| Entrega do produto final                          | Entrega do projeto final (MVPs) ao cliente                                                                                                             | Equipe de Desenvolvimento |
| Teste do produto final e verificação de qualidade | Testar e verificar se todos os requisitos iniciais foram contemplados e se as modificações requeridas durante o processo de entregas foram atendidas.  | Product Owner             |

# Procedimentos

|                  Atividade                 |                                                                               Método                                                                              |                 Ferramenta                |
|:------------------------------------------:|:-----------------------------------------------------------------------------------------------------------------------------------------------------------------:|:-----------------------------------------:|
| Realizar reuniões                          | Reuniões diárias por mensagens. Reuniões por vídeo chamada e compartilhamento de tela semanalmente                                                                | Microsoft Teams/Discord/Telegram/Whatsapp |
| Versionamento de código                    | Controlar as alterações feitas no projeto por cada integrante do grupo por meio de registros e principalmente as versões de cada entrega de grupo de requisitos   | Github                                    |
| Organizar execução do projeto              | Organizar etapas e andamento das tarefas a serem executadas. Além da formação de eventuais documentos de descrição e organização                                  | Google Doc e Trelo/Zenhub                 |
| Desenvolver protótipo inicial              | Criação de projeto na ferramenta Figma que ajudará a visualizar e talvez servir de guia para o desenvolvimento de cada grupo de requisitos                        | Figma                                     |
| Desenvolver interfaces de tela             | Criação das telas do produto e sua navegação entre elas                                                                                                           | React Native + Typescript                 |
| Desenvolver funcionalidades da aplicação   | Desenvolvimento das funções que o produto vai desempenhar                                                                                                         | React Native + Typescript                 |
| Verificar se os requisitos foram atendidos | Testar o produto em dispositivos reais e verificar se todas as funções estão de acordo com os requisitos                                                          | Expo                                      |

# Visão Geral do Projeto

## Organização do Projeto

| Papel                 | Atribuições                                                                               | Responsável | Participantes                  |
|-----------------------|-------------------------------------------------------------------------------------------|-------------|--------------------------------|
| Desenvolvedor         | Desenvolver e codificar o aplicativo, realizar os testes unitários, e fazer refatorações. | Renann      | Nicolas, Rafael, Tiago   |
| Product Owner         | Organizar e desenvolver o escopo do produto, das sprints e validar as entregas.           | Rafael        | Nicolas, Renann, Tiago |
| Analista de Qualidade | Garantir a qualidade do produto e das entregas e inspecionar o código.                    | Tiago       | Nicolas, Rafael, Renann  |

## Planejamento das Fases e/ou Iterações do Projeto

| Release  | Entrega                                                                                                                 | Data Prevista |
|----------|-------------------------------------------------------------------------------------------------------------------------|---------------|
| Sprint 1 | Definição do Produto e do Projeto                                                                                       | 03/02/2022    |
| Sprint 2 | Backlog, Documento de Visão do Produto e Projeto Ampliada, Canvas MVP, e Kanban do Projeto.                             | 24/02/2022    |
| Sprint 3 | Modelo de Classes de Produto, Modelo de Arquitetura do Projeto (Visão Lógica); e Protótipos de Interface do Aplicativo. | 17/03/2022    |
| Sprint 4 | Codificação dos Requisitos RF1, RF2, RF3, RF4                                                                           | 07/04/2022    |
| Sprint 5 | Codificação dos Requisitos RF5, RF6, RF7                                                                                | 12/04/2022    |

## Matriz de Comunicação

| Descrição                                  | Área/Envolvidos                           | Periodicidade | Produtos Gerados                                              |
|--------------------------------------------|-------------------------------------------|---------------|---------------------------------------------------------------|
| Acompanhamento das Atividades em Andamento | Equipe do Projeto                         | Semanal       | Ata de Reunião e Relatório de Situação da Sprint e do Projeto |
| Comunicar Situação do Projeto              | Equipe do Projeto Professor da Disciplina | Semanal       | Ata de Reunião e Relatório de Situação do Projeto             |
| Acompanhamento dos riscos                  | Equipe do Projeto                         | Quinzenal     | Ata de reunião e Relatório de Situação do Projeto             |

## Diagrama de Arquitetura do Projeto

![diagrama de arquitetura](/assets/arquitetura.PNG)

## Diagrama de "Classes" do Produto

![diagrama de classes 1](/assets/dia_classes_1.PNG)

![diagrama de classes 2](/assets/dia_classes_2.PNG)

![diagrama de classes 3](/assets/dia_classes_3.PNG)

![diagrama de classes 4](/assets/dia_classes_4.PNG)

## Gerenciamento de Riscos

    - Problemas de comunicação entre a equipe.
    - Dificuldades de aprendizado das tecnologias necessarias para o desenvolvimento do produto.
    - Pouco tempo dedicado ao desenvolvimento e documentação do projeto.

## Critérios de Replanejamento

    É recomendado agendar uma ou mais reuniões entre o grupo para resolver e planejar a resolução viável do problema encontrado, e apresenta-la para o professor.

# Lições aprendidas

## Unidade 1

A primeira unidade deu ao grupo instrução para que fosse possível a escolha de uma metodologia de desenvolvimento, visto que nenhum dos integrantes possuía conhecimento sobre esse assunto e não sabia qual metodologia se encaixaria melhor no projeto.

## Unidade 2

A segunda unidade proporcionou ao grupo noções sobre a elicitação, análise, especificação e validação de requisitos, tópicos essenciais para a Engenharia de Requisitos. O backlog quanto o MVP nos dão uma direção para que não percamos tempo ou desenvolvamos um software que não resolva o problema identificado pela equipe.

## Unidade 3

A terceira unidade mostrou ao grupo algumas noções de design de interface, além de aumentar o nosso conhecimento sobre arquitetura e organização de código, principalmente no desenvolvimento mobile.

## Unidade 4

A quarta unidade foi uma unidade mais prática. O grupo aprendeu boas práticas de código, além de maneiras de trabalhar juntos programando. Aprendemos a implementar no código tudo o que foi aprendido na unidade 3.

## Unidade 5

Lições aprendidas na unidade 5

# Referências bibliográficas

## Referência

# [Video de apresentação](https://youtu.be/tAvqrmDL-co "Link do Youtube")

[Voltar ao inicio](#header)

[Voltar à página inicial](https://fgaunb-mds-gm.github.io/2021.2-Delfos/)
