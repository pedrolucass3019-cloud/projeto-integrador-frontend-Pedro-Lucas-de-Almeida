# projeto-integrador-frontend-Pedro-Lucas-de-Almeida

nesse projeto, esta sendo criado uma wiki de avalon le fae o jogo fate grand order.
ele possui 3 botões que guiam para historias, personagens e quais são as regiões.
ele tem a função de guiar o jogador com as informações do mundo dentro do jogo pois geralmente estão sempre em japonês.

CODE REVIEW(SAVIO NATHANNAEL):
#VISÃO GERAL:
Código bem estruturado no geral, com semântica HTML5 correta, uso de aria-labelledby, prefers-reduced-motion e fieldset/legend no formulário.
Uso correto de header, main, section, footer, nav e figure com aria-labelledby ligando cada h2 à sua seção.
Rel noopener noreferrer no link externo, boa prática de segurança.
Media query prefers-reduced-motion implementada, cuidado real com acessibilidade.
Focus-visible estilizado nos botões e campos de formulário.
Caption e scope="col" usados corretamente na tabela.
#SEMANTICA HTML:
Hierarquia de landmarks correta. Header, main e footer estão no nível certo do documento, sem duplicação ou aninhamento errado.
Nav com aria-label="Navegação principal". Isso já diferencia essa nav de outras que possam existir futuramente na página, mesmo havendo só uma agora. Mostra cuidado antecipado.
Ligação aria-labelledby entre cada section e seu respectivo h2. Isso transforma cada section num landmark nomeado de verdade na árvore de acessibilidade, em vez de ser usado como uma div disfarçada, erro comum.
Figure com figcaption agrupando imagem, vídeo e legenda. Isso comunica que os elementos de mídia pertencem ao mesmo conteúdo autocontido, uso correto do elemento.
Fieldset e legend aninhados para o grupo de radio buttons. Separar "Recomendaria este guia" como fieldset próprio dentro do fieldset maior é o padrão correto do HTML para grupos de opções relacionadas, ao invés de usar divs soltas.
Scope="col" no th. Detalhe pequeno, mas garante que leitores de tela anunciem corretamente o nome de cada coluna ao navegar pela tabela.
Uso do elemento caption na tabela, em vez do comum p solto antes da tabela.
#MULTIMIDIA:
A base semântica do projeto está genuinamente acima da média, os elementos são usados pelo que realmente significam e não apenas pela aparência. A multimídia tem boas escolhas de acessibilidade, como o alt rico na imagem e os controles nativos no vídeo, mas falta a camada de rede de segurança: fallback de texto, legendas e dimensões fixas para evitar layout shift. Os pontos de maior prioridade para corrigir são, nessa ordem: dimensões de imagem e vídeo para evitar CLS, fallback e legendas do vídeo, e indicadores visuais de campos obrigatórios no formulário. O restante, como variáveis CSS e seletores genéricos, é mais uma questão de manutenibilidade do que de erro funcional.
Video com atributo controls habilitado. Não é autoplay forçado nem mudo por padrão, respeita a autonomia do usuário.
Source com type="video/mp4" declarado explicitamente. Evita que o navegador precise inferir o formato baixando parte do arquivo, pequena otimização de performance.
Alt descritivo de verdade na imagem do mapa, citando as regiões mostradas (Salisbury, Londinium, Orkney, Cornwall). Não é um alt genérico ou vazio, está no nível de detalhe recomendado pela WCAG para imagens informativas.
Regra global img com max-width 100% e height auto. Garante que qualquer imagem futura já nasce responsiva.
Favicon definido via link rel="icon". Detalhe pequeno, mas frequentemente esquecido.
Preconnect para o Google Fonts antes do link da fonte. Reduz latência de DNS e TLS antes do download real do recurso.
#CONSIDERAÇÃO FINAL:
No geral, este é um código muito bem construído, especialmente para um projeto de fã. Dá pra perceber que houve cuidado real em várias camadas, não só na aparência visual. Além disso, atende a tudo o que o professor pediu e ensinou.

CODE REVIEW ( CAIO VICTOR ):
#VISÃOGERAL
O projeto apresenta uma boa estrutura e uma proposta bem definida, com o objetivo de criar uma wiki informativa sobre Avalon le Fae, uma das histórias presentes em Fate/Grand Order. A página foi desenvolvida para facilitar o acesso dos jogadores às informações do universo do jogo, principalmente porque grande parte do conteúdo original está disponível em japonês.

A navegação é dividida em três categorias principais: Histórias, Personagens e Regiões. Essa separação torna a experiência mais intuitiva, permitindo que o usuário encontre as informações desejadas sem precisar navegar por conteúdos desnecessários.

#SEMÂNTICA HTML:

A estrutura HTML apresenta uma boa organização, utilizando elementos semânticos para separar e identificar corretamente as partes da página.

O uso de elementos como header, main, section, nav e footer contribui para uma estrutura mais organizada e facilita tanto a leitura do código quanto a interpretação do conteúdo pelos mecanismos de busca e tecnologias assistivas.

A utilização de títulos hierarquizados também ajuda a estabelecer uma ordem lógica entre os conteúdos, tornando a página mais compreensível.

Outro ponto positivo é a separação das áreas de navegação e conteúdo, evitando o uso excessivo de elementos genéricos como div quando existem elementos HTML mais adequados para representar aquela informação.

#CSS E ORGANIZAÇÃO VISUAL:
O CSS apresenta uma organização adequada, mantendo a responsabilidade pela aparência visual separada da estrutura HTML. Isso facilita futuras alterações no design sem a necessidade de modificar toda a estrutura da página.
A estilização dos botões principais ajuda a destacar as três categorias da wiki, tornando a navegação mais intuitiva. A utilização de cores, espaçamentos e alinhamentos contribui para uma apresentação visual mais agradável e organizada.
O uso de propriedades como max-width, margin e padding ajuda a manter o conteúdo bem distribuído, evitando que os elementos fiquem muito próximos ou desorganizados.

Também é positivo o cuidado com a responsividade, utilizando recursos como media queries para adaptar a apresentação da página a diferentes tamanhos de tela, permitindo uma experiência mais consistente tanto em computadores quanto em dispositivos móveis.

#ACESSIBILIDADE E USABILIDADE:
A organização dos elementos e a identificação clara dos botões facilitam a utilização da wiki. A estrutura semântica também contribui para que leitores de tela consigam interpretar melhor as diferentes áreas da página.
O projeto busca manter uma navegação simples, sem excesso de informações visuais, permitindo que o jogador encontre rapidamente o conteúdo que procura.
O uso de elementos interativos com identificação adequada e estados visuais de interação também contribui para uma experiência mais acessível.

#ORGANIZAÇÃO DO CONTEÚDO:
A divisão das informações em três categorias é um dos pontos mais fortes do projeto.
A seção de Histórias permite acompanhar os acontecimentos de Avalon le Fae e compreender melhor sua narrativa.
A seção de Personagens reúne informações sobre os indivíduos presentes nesse universo, facilitando o conhecimento de suas características e participações na história.
Já a seção de Regiões apresenta os diferentes territórios de Avalon le Fae, ajudando o jogador a compreender melhor a geografia e a organização desse mundo.
Essa organização permite que o projeto seja expandido futuramente sem comprometer sua estrutura inicial.

#CONSIDERAÇÃO FINAL:

No geral, o projeto apresenta uma boa construção, tanto na organização do conteúdo quanto na estruturação da página. O uso de HTML semântico demonstra preocupação com a organização e a acessibilidade, enquanto o CSS contribui para uma apresentação visual agradável, organizada e adaptável a diferentes dispositivos.
A separação entre Histórias, Personagens e Regiões atende bem à proposta principal da wiki, tornando a consulta de informações mais rápida e intuitiva.
Além da parte técnica, o projeto possui uma finalidade interessante, pois busca solucionar uma dificuldade real enfrentada por jogadores que não compreendem o idioma japonês e desejam conhecer melhor o universo de Fate/Grand Order.
É uma proposta bem pensada, com uma estrutura que permite futuras melhorias e expansões. No geral, é um projeto que cumpre bem seu objetivo e demonstra cuidado tanto com a experiência do usuário quanto com a organização do desenvolvimento.
