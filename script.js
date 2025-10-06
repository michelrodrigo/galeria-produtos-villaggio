const substituicoes = {
  'limao': 'Limão',
  'mamao': 'Mamão',
  'acai': 'Açaí',
  'melao': 'Melão',
  'caju': 'Caju',
  'maracuja': 'Maracujá',
  'pera': 'Pêra',
  'goiaba': 'Goiaba',
  'uva': 'Uva',
  'maca': 'Maçã'
};

// === Função para gerar nome amigável ===
function filenameToName(filename) {
  if (!filename) return "";
  filename = filename.split('?')[0].split('#')[0];
  filename = filename.split('/').pop() || filename;
  filename = filename.replace(/\.[^/.]+$/, ''); // remove extensão

  if (filename.includes('-')) {
    filename = filename.split('-').slice(0, -1).join('-');
  }

  filename = decodeURIComponent(filename).replace(/[-_]+/g, ' ').trim();

  Object.keys(substituicoes).forEach(key => {
    const re = new RegExp("\\b" + key + "\\b", "gi");
    filename = filename.replace(re, substituicoes[key]);
  });

  filename = filename.replace(/\b\w/g, c => c.toUpperCase());
  return filename;
}

// === Configuração das categorias ===
const categorias = {
  frutas: ['maca-fuji.png', 'mamao-papaya.png', 'uva-verde.png'],
  verduras: ['alface.png', 'rucula.png', 'espinafre.png'],
  legumes: ['cenoura.png', 'batata.png', 'abobrinha.png']
};

// === Cria as galerias dinamicamente ===
const container = document.getElementById('galerias-container');

Object.entries(categorias).forEach(([categoria, imagens]) => {
  const galeria = document.createElement('div');
  galeria.classList.add('galeria');
  galeria.id = `galeria-${categoria}`;

  imagens.sort().forEach(img => {
    const produtoDiv = document.createElement('div');
    produtoDiv.classList.add('produto');
    produtoDiv.innerHTML = `
      <img src="imagens/${categoria}/${img}" alt="${img}">
      <p>${filenameToName(img)}</p>
    `;
    galeria.appendChild(produtoDiv);
  });

  container.appendChild(galeria);
});

// === Controla exibição suave ===
document.querySelectorAll('.categoria-btn').forEach(botao => {
  botao.addEventListener('click', () => {
    const categoria = botao.getAttribute('data-categoria');
    const galeria = document.getElementById(`galeria-${categoria}`);
    galeria.classList.toggle('show');
  });
});
