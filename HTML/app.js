// app.js — cria array 'musicas' e renderiza as cards semânticas

const musicas = [
  { titulo: 'Solar Flare', artista: 'Aurora', capaUrl: 'https://picsum.photos/seed/album1/400' },
  { titulo: 'Noite em SP', artista: 'Banda Exemplo', capaUrl: 'https://picsum.photos/seed/album2/400' },
  { titulo: 'Café da Manhã', artista: 'Trio Demo', capaUrl: 'https://picsum.photos/seed/album3/400' }
];

function escapeHtml(str) {
  return String(str).replace(/[&<>\"']/g, function (s) {
    return ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":"&#39;"})[s];
  });
}

/**
 * Renderiza o array `musicas` injetando o HTML de cada música dentro da div
 * com id "lista-de-musicas".
 */
/**
 * Renderiza a lista de músicas. Se `query` for fornecido, filtra por título ou artista.
 * @param {string} [query]
 */
function renderListaDeMusicas(query) {
  const container = document.getElementById('lista-de-musicas');
  if (!container) return;

  const q = query ? String(query).trim().toLowerCase() : '';
  const lista = q
    ? musicas.filter(m => (m.titulo + ' ' + m.artista).toLowerCase().includes(q))
    : musicas;

  container.innerHTML = lista.map(m => {
    return `
      <article class="musica-card" aria-label="Música ${escapeHtml(m.titulo)} por ${escapeHtml(m.artista)}">
        <figure class="thumb">
          <img src="${m.capaUrl}" alt="Capa de ${escapeHtml(m.titulo)}">
        </figure>
        <div class="info">
          <h3 class="titulo">${escapeHtml(m.titulo)}</h3>
          <p class="artista">${escapeHtml(m.artista)}</p>
        </div>
        <button class="play-btn" type="button" aria-label="Tocar ${escapeHtml(m.titulo)}">
          <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false"><path d="M8 5v14l11-7L8 5z" fill="#fff"/></svg>
        </button>
      </article>
    `;
  }).join('');
}

// Theme toggle: remember preference in localStorage
// Theme is permanently dark; removed dynamic toggle per user request.

function initSearch() {
  const input = document.getElementById('search-music');
  if (!input) return;
  input.addEventListener('input', e => {
    renderListaDeMusicas(e.target.value);
  });
}

// DOM ready — initialize search and render list
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => { renderListaDeMusicas(); initSearch(); });
} else {
  renderListaDeMusicas(); initSearch();
}

// Exports for console debugging
window.musicas = musicas;
window.renderListaDeMusicas = renderListaDeMusicas;
