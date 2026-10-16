(() => {
  'use strict';

  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const seta = '<svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path d="M7 17 17 7M8 7h9v9"/></svg>';
  const check = '<svg viewBox="0 0 24 24" width="17" height="17" aria-hidden="true"><path d="M5 12.5 10 17l9-10"/></svg>';
  const mais = '<svg viewBox="0 0 24 24" width="23" height="23" aria-hidden="true"><path d="M12 5v14M5 12h14"/></svg>';
  const menos = '<svg viewBox="0 0 24 24" width="23" height="23" aria-hidden="true"><path d="M5 12h14"/></svg>';
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const reduzMovimento = matchMedia('(prefers-reduced-motion: reduce)');

  // Mesmo número de contato da página da 3ADS EDU, com mensagem do time de UX.
  const WHATSAPP = '5562982005986';
  const contato = (msg) => `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`;
  const MSG_PADRAO = 'Olá! Quero conversar com o time de UX da 3ADS sobre uma página para o meu negócio.';

  const CLIENTES = ['Unimed Cerrado', 'Alata', 'IPOG Vitória', 'Grupo Saga', 'CBCO Hospital de Olhos', 'Terral', 'Alexfarma', 'MyBroker'];

  const PROJETOS = {
    'eq-seguros': {
      nome: 'EQ Seguros', area: 'Tecnologia e finanças', tipo: 'Protótipo navegável',
      resumo: 'O novo site de uma seguradora, desenhado e validado como protótipo navegável antes do desenvolvimento.',
      entregas: ['Arquitetura de informação para seguros, crédito e parceiros', 'Estudos de layout para a home', 'Protótipo navegável com páginas internas', 'Versões para desktop e celular'],
    },
    'red-flamboyant': {
      nome: 'Red Flamboyant', area: 'Lazer e experiências', tipo: 'Landing page de campanha',
      descricao: 'Landing page do programa de experiências Red Flamboyant, com quatro direções de layout até a versão final.',
      resumo: 'Uma página com clima de experiência premium, do primeiro scroll ao convite para participar.',
      entregas: ['Landing page de campanha', 'Quatro direções de layout', 'Direção visual escura e editorial', 'Versão para celular'],
    },
    'a2o-sistemas': {
      nome: 'A2O Sistemas', area: 'Tecnologia e B2B', tipo: 'Site institucional',
      descricao: 'Site de uma plataforma de gestão logística, com páginas por produto, cases, blog e contato.',
      resumo: 'Um site de software B2B organizado por solução, para cada perfil de cliente achar o seu produto.',
      entregas: ['Site institucional completo', 'Páginas de produto: TMS, frota, agro e mais', 'Cases, blog e artigo', 'Protótipo navegável'],
    },
    'fr-incorporadora': {
      nome: 'FR Incorporadora', area: 'Imóveis', tipo: 'Landing pages',
      descricao: 'Três lançamentos residenciais em Goiânia no mesmo sistema de página, com formulário de interesse.',
      resumo: 'Um sistema de página para lançamentos imobiliários: cada empreendimento com a sua cara, a mesma estrutura de conversão.',
      entregas: ['Três landing pages de lançamento', 'Sistema visual reaproveitável', 'Formulário de interesse', 'Consentimento de cookies (LGPD)'],
    },
    'opimed-black': {
      nome: 'Opimed · Pré-Black', area: 'Saúde', tipo: 'Landing page de campanha',
      descricao: 'Campanha de Black Friday de aparelhos auditivos, com a oferta logo no topo e contato direto.',
      resumo: 'Oferta clara no primeiro olhar e caminho curto até a avaliação, pensado para o tráfego de campanha.',
      entregas: ['Landing page de campanha', 'Oferta e prova no primeiro scroll', 'Chamadas fixas para WhatsApp no celular', 'Página de obrigado'],
    },
    'barretos': {
      nome: 'Barretos Country Resort', area: 'Turismo', tipo: 'Landing page',
      descricao: 'Página para famílias, com fazendinha, parque aquático e hospedagem, focada em gerar contato para reserva.',
      resumo: 'Uma página que vende o dia em família antes de falar de diária.',
      entregas: ['Landing page de captação', 'Narrativa por experiências', 'Galeria e prova social', 'Página de obrigado'],
    },
    'autorio-feirao': {
      nome: 'Autorio · Feirão Seminovos', area: 'Automotivo', tipo: 'Landing page de campanha',
      descricao: 'Feirão de seminovos com vitrine de veículos, garantia em destaque e contato por modelo.',
      resumo: 'Uma vitrine de feirão em que cada carro tem o seu botão de contato.',
      entregas: ['Landing page de campanha', 'Vitrine de veículos', 'Contato por modelo', 'Versão para celular'],
    },
  };

  const SERVICOS = [
    { nome: 'Landing pages', texto: 'Para campanhas, lançamentos e captação: uma oferta, uma página, um próximo passo claro.', foto: 'honcord', legenda: 'Honcord · LP de doação de sangue' },
    { nome: 'Sites institucionais', texto: 'Para apresentar a empresa, os produtos e os cases de um jeito que o cliente entende rápido.', foto: 'neppo', legenda: 'Neppo · site institucional' },
    { nome: 'Protótipos navegáveis', texto: 'Para validar a ideia com o cliente antes de investir no desenvolvimento.', foto: 'carmem-avila', legenda: 'Carmem Avila · protótipo da home' },
    { nome: 'E-commerce', texto: 'Para lojas e catálogos B2B, da vitrine à página de produto.', foto: 'mais-mendes', legenda: 'Mais Mendes · protótipo de e-commerce' },
    { nome: 'Ferramentas interativas', texto: 'Simuladores, diagnósticos e quizzes que engajam e qualificam o lead.', foto: 'opimed-simulador', legenda: 'Opimed · simulador de aparelho auditivo' },
  ];

  const PERGUNTAS = [
    ['Vocês escrevem os textos da página?', 'Sim. A copy pode ser escrita pelo nosso time a partir do diagnóstico, ou adaptada de um material que você já tenha.'],
    ['Quanto tempo leva para uma página ficar pronta?', 'Depende do escopo e da quantidade de páginas. Depois da conversa inicial, apresentamos um cronograma com cada etapa.'],
    ['Vocês fazem só o design ou também o desenvolvimento?', 'Os dois. O mesmo time cuida da estratégia, do layout e do código até a página estar no ar.'],
    ['A página já sai com pixel e Analytics?', 'Sim. Configuramos os eventos que importam para o seu funil, como envio de formulário e clique no WhatsApp.'],
    ['Em qual plataforma a página é feita?', 'Na maioria dos projetos, em código próprio, leve e rápido. Se a sua empresa já usa uma plataforma, avaliamos o melhor caminho na conversa inicial.'],
    ['Já tenho um site. Vocês conseguem melhorar?', 'Sim. Começamos olhando a página atual e mostramos o que muda primeiro para ela converter mais.'],
    ['Como funciona o investimento?', 'Varia conforme o número de páginas, a complexidade e as integrações. Depois da conversa inicial, enviamos uma proposta.'],
    ['Posso ver mais projetos?', 'Sim. Temos dezenas de páginas em nichos diferentes. Fale com a gente e mostramos as mais próximas do seu negócio.'],
  ];

  // ---------- contato ----------
  for (const a of $$('.js-contato')) {
    a.href = contato(MSG_PADRAO);
    a.target = '_blank';
    a.rel = 'noopener';
  }

  // ---------- vídeo do topo: versão leve no celular, pausa com movimento reduzido ----------
  const video = $('#hero-video');
  if (video) {
    const celular = matchMedia('(max-width: 767px)').matches;
    video.src = celular ? video.dataset.srcMobile : video.dataset.srcDesktop;
    const sincroniza = () => {
      if (reduzMovimento.matches) video.pause();
      else video.play().catch(() => {});
    };
    sincroniza();
    reduzMovimento.addEventListener('change', sincroniza);
  }

  // ---------- cabeçalho e menu ----------
  const header = $('#topo');
  const rolagem = () => header.classList.toggle('is-scrolled', scrollY > 40);
  addEventListener('scroll', rolagem, { passive: true });
  rolagem();

  const toggle = $('#menu-toggle');
  const menu = $('#menu-mobile');
  const abrirMenu = (sim) => {
    menu.hidden = !sim;
    header.classList.toggle('menu-aberto', sim);
    document.body.classList.toggle('travado', sim);
    toggle.setAttribute('aria-expanded', String(sim));
    toggle.setAttribute('aria-label', sim ? 'Fechar menu' : 'Abrir menu');
    toggle.innerHTML = sim
      ? '<svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18"/></svg>'
      : '<svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path d="M4 8h16M4 16h16"/></svg>';
  };
  toggle.addEventListener('click', () => abrirMenu(menu.hidden));
  for (const a of $$('a', menu)) a.addEventListener('click', () => abrirMenu(false));

  // ---------- clientes ----------
  const grupo = (oculto) => `<ul class="clients-marquee-group"${oculto ? ' aria-hidden="true"' : ' aria-label="Marcas da trajetória da 3ADS"'}>` +
    CLIENTES.map((n, i) => `<li><img src="images/clientes/client-${i + 1}.png" alt="${oculto ? '' : esc(n)}" width="140" height="62" loading="lazy" decoding="async"></li>`).join('') +
    '</ul>';
  $('#clientes').innerHTML = grupo(false) + grupo(true);

  // ---------- projetos ----------
  const ordem = Object.keys(PROJETOS);
  $('#projetos-grade').innerHTML = ordem.slice(1).map((slug, i) => {
    const p = PROJETOS[slug];
    return `<button type="button" class="program-card reveal js-projeto" data-projeto="${slug}" style="--reveal-delay:${(i % 2) * 90}ms">
      <img class="program-card-image" src="images/projetos/${slug}-capa.webp" alt="" width="1600" height="1000" loading="lazy" decoding="async">
      <span class="program-meta"><span>${String(i + 2).padStart(2, '0')}</span><span>${esc(p.area)}</span></span>
      <span class="program-card-copy">
        <h3>${esc(p.nome)}</h3>
        <p>${esc(p.descricao)}</p>
        <span class="program-link">Ver projeto ${seta}</span>
      </span>
    </button>`;
  }).join('');

  const modal = $('#modal');
  let voltarFoco = null;
  function abrirProjeto(slug) {
    const p = PROJETOS[slug];
    if (!p) return;
    voltarFoco = document.activeElement;
    $('#modal-meta').textContent = `${String(ordem.indexOf(slug) + 1).padStart(2, '0')} · ${p.area} · ${p.tipo}`;
    $('#modal-titulo').textContent = p.nome;
    $('#modal-resumo').textContent = p.resumo;
    const pagina = $('#modal-pagina');
    pagina.src = `images/projetos/${slug}-pagina.webp`;
    pagina.alt = `Página completa de ${p.nome} no desktop`;
    const cel = $('#modal-celular');
    cel.src = `images/projetos/${slug}-celular.webp`;
    cel.alt = `${p.nome} no celular`;
    $('.projeto-navegador').scrollTop = 0;
    $('#modal-entregas').innerHTML = p.entregas.map((e) => `<li>${check}<span>${esc(e)}</span></li>`).join('');
    $('#modal-contato').href = contato(`Olá! Vi o projeto ${p.nome} no portfólio de UX da 3ADS e quero algo parecido para o meu negócio.`);
    modal.hidden = false;
    document.body.classList.add('travado');
    $('.program-modal-scroll').scrollTop = 0;
    $('#modal-fechar').focus({ preventScroll: true });
    history.replaceState(null, '', `#projeto-${slug}`);
  }
  function fecharProjeto() {
    if (modal.hidden) return;
    modal.hidden = true;
    document.body.classList.remove('travado');
    history.replaceState(null, '', location.pathname + location.search);
    if (voltarFoco) voltarFoco.focus({ preventScroll: true });
  }
  document.addEventListener('click', (e) => {
    const alvo = e.target.closest('.js-projeto');
    if (alvo) abrirProjeto(alvo.dataset.projeto);
  });
  $('#modal-fechar').addEventListener('click', fecharProjeto);
  modal.addEventListener('click', (e) => { if (e.target === modal) fecharProjeto(); });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') { fecharProjeto(); if (!menu.hidden) abrirMenu(false); }
    if (e.key === 'Tab' && !modal.hidden) {
      const focaveis = $$('button, a[href], [tabindex="0"]', modal).filter((n) => n.offsetParent !== null);
      const [primeiro, ultimo] = [focaveis[0], focaveis[focaveis.length - 1]];
      if (e.shiftKey && document.activeElement === primeiro) { e.preventDefault(); ultimo.focus(); }
      else if (!e.shiftKey && document.activeElement === ultimo) { e.preventDefault(); primeiro.focus(); }
    }
  });
  const inicial = location.hash.match(/^#projeto-(.+)$/);
  if (inicial) abrirProjeto(inicial[1]);

  // ---------- serviços ----------
  const lista = $('#servicos-lista');
  let ativo = 0;
  function desenharServicos() {
    lista.innerHTML = SERVICOS.map((s, i) => `<div class="format-row${i === ativo ? ' active' : ''}">
      <h3><button type="button" id="servico-${i}" aria-expanded="${i === ativo}" aria-controls="servico-painel-${i}"><span class="format-index">0${i + 1}</span>${esc(s.nome)}${i === ativo ? menos : mais}</button></h3>
      <div id="servico-painel-${i}" role="region" aria-labelledby="servico-${i}"${i === ativo ? '' : ' hidden'}><p>${esc(s.texto)}</p></div>
    </div>`).join('') + '<p class="format-note"><span class="status-dot"></span>Tudo responsivo, com o celular como ponto de partida.</p>';
    const s = SERVICOS[ativo];
    const foto = $('#servico-foto');
    const nova = foto.cloneNode();
    nova.src = `images/projetos/${s.foto}-capa.webp`;
    nova.alt = s.legenda;
    foto.replaceWith(nova);
    $('#servico-legenda').innerHTML = `<span class="status-dot"></span>${esc(s.legenda)}`;
  }
  lista.addEventListener('click', (e) => {
    const b = e.target.closest('button');
    if (!b) return;
    ativo = +b.id.split('-')[1];
    desenharServicos();
    $(`#servico-${ativo}`).focus({ preventScroll: true });
  });
  desenharServicos();

  // ---------- perguntas ----------
  const faq = $('#faq');
  let aberta = 0;
  function desenharFaq() {
    faq.innerHTML = PERGUNTAS.map(([q, r], i) => `<div class="faq-item${aberta === i ? ' active' : ''}">
      <h3><button type="button" id="faq-${i}" aria-expanded="${aberta === i}" aria-controls="faq-painel-${i}"><span>${esc(q)}</span>${aberta === i ? menos : mais}</button></h3>
      <div id="faq-painel-${i}" role="region" aria-labelledby="faq-${i}"${aberta === i ? '' : ' hidden'}><p>${esc(r)}</p></div>
    </div>`).join('');
  }
  faq.addEventListener('click', (e) => {
    const b = e.target.closest('button');
    if (!b) return;
    const i = +b.id.split('-')[1];
    aberta = aberta === i ? -1 : i;
    desenharFaq();
    $(`#faq-${i}`).focus({ preventScroll: true });
  });
  desenharFaq();

  // ---------- entrada ao rolar ----------
  const io = 'IntersectionObserver' in window ? new IntersectionObserver((itens) => {
    for (const it of itens) if (it.isIntersecting) { it.target.classList.add('visivel'); io.unobserve(it.target); }
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 }) : null;
  for (const el of $$('.reveal')) io ? io.observe(el) : el.classList.add('visivel');
})();
