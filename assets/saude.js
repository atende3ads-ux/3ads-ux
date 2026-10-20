(() => {
  'use strict';

  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const mais = '<svg viewBox="0 0 24 24" width="23" height="23" aria-hidden="true"><path d="M12 5v14M5 12h14"/></svg>';
  const menos = '<svg viewBox="0 0 24 24" width="23" height="23" aria-hidden="true"><path d="M5 12h14"/></svg>';
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

  // Mesmo WhatsApp da página principal (assets/main.js). Cada botão abre com a mensagem do seu pacote.
  const WHATSAPP = '5562982005986';
  const MENSAGENS = {
    diagnostico: 'Olá! Sou da área da saúde e quero o diagnóstico grátis do meu site. Meu site ou Instagram é: ',
    procedimento: 'Olá! Tenho interesse na Página de Procedimento (R$ 1.497) da 3ADS UX.',
    consultorio: 'Olá! Tenho interesse no Site Consultório (R$ 3.497) da 3ADS UX.',
    clinica: 'Olá! Tenho interesse no Site Clínica da 3ADS UX para a minha clínica.',
    cuidado: 'Olá! Quero saber mais sobre o Cuidado Contínuo (R$ 297/mês) da 3ADS UX.',
    duvida: 'Olá! Tenho uma dúvida sobre os sites para médicos da 3ADS UX.',
  };

  const PERGUNTAS = [
    ['O site segue as regras do CFM?', 'Sim. Seguimos a Resolução CFM 2.336/2023: nome, CRM com a palavra MÉDICO e RQE na página principal, e textos sem promessa de resultado nem sensacionalismo. Para clínicas, entram o registro no CRM e o diretor técnico. Você aprova cada texto antes de ir ao ar.'],
    ['Posso divulgar o valor da consulta?', 'Pode. A resolução permite informar o valor da consulta, as formas de pagamento, os horários e como agendar. Colocamos essas informações se você quiser.'],
    ['Preciso escrever os textos?', 'Não. Escrevemos a partir da conversa inicial e você só revisa. Se já tiver material, aproveitamos.'],
    ['Preciso pagar mensalidade?', 'Não. O Cuidado Contínuo é opcional e sem fidelidade. Sem ele, deixamos a hospedagem e o domínio no seu nome, e você paga direto ao provedor.'],
    ['Quanto tempo eu preciso dedicar?', 'Uma conversa de 30 minutos, o envio de fotos e informações e a revisão da prévia. O resto é com a gente.'],
    ['Já tenho perfil em plataforma de agendamento. Preciso de site?', 'O perfil ajuda, mas é da plataforma e aparece ao lado de outros médicos. O site é só seu, aparece com o seu nome no Google e pode receber anúncios. Os dois podem andar juntos: colocamos o seu link de agendamento no site.'],
    ['Vocês fazem os anúncios também?', 'Fazemos. A gestão de tráfego da 3ADS entra como uma proposta à parte, depois que o site estiver no ar.'],
    ['E se eu não gostar?', 'Você vê a prévia em até 5 dias úteis. Se não aprovar a direção, devolvemos 100% do sinal.'],
  ];

  // ---------- contato ----------
  for (const a of $$('.js-contato')) {
    const tipo = a.dataset.msg || 'diagnostico';
    a.href = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(MENSAGENS[tipo] || MENSAGENS.diagnostico)}`;
    a.target = '_blank';
    a.rel = 'noopener';
    // Se a página ganhar GA4 ou pixel da Meta, o clique já chega como evento.
    a.addEventListener('click', () => {
      if (typeof window.gtag === 'function') window.gtag('event', 'clique_whatsapp', { pacote: tipo });
      if (typeof window.fbq === 'function') window.fbq('track', 'Contact', { content_name: tipo });
    });
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
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && !menu.hidden) abrirMenu(false); });

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
