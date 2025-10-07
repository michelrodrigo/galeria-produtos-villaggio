<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8" />
  <title>Produtos — Categorias recolhíveis</title>
  <style>
    body { font-family: Arial, sans-serif; padding: 20px; }

    .category-btn {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      padding: 12px 16px;
      background: #003f36;
      color: white;
      border: none;
      border-radius: 8px;
      cursor: pointer;
      font-size: 16px;
      margin: 12px 0 6px;
      box-shadow: 0 2px 6px rgba(0,0,0,0.08);
    }
    .category-btn:focus { outline: 3px solid rgba(40,167,69,0.25); }

    .collapsible {
      max-height: 0;
      overflow: hidden;
      transition: max-height 420ms ease;
      margin-bottom: 12px;
    }

    .produtos-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
      gap: 16px;
      padding: 12px 6px;
    }

    .produto-card { text-align: center; }
    .produto-card img {
      width: 100%;
      height: 140px;
      object-fit: cover;
      border-radius: 8px;
      display:block;
      box-shadow: 0 2px 6px rgba(0,0,0,0.06);
    }
    .produto-name { margin-top: 8px; font-weight: 600; font-size: 14px; color: #222; }

    /* pequeno ícone caret */
    .caret { transition: transform 320ms ease; }
    .category-btn[aria-expanded="true"] .caret { transform: rotate(90deg); }
  </style>
</head>
<body>
  <h1>Nossos Produtos</h1>

  <!-- Botões e containers (ordem: botão, container) -->
  <button class="category-btn" type="button" aria-expanded="false">Frutas <span class="caret">▶</span></button>
  <div class="collapsible" aria-hidden="true">
    <div class="produtos-grid" id="grid-frutas"></div>
  </div>

  <button class="category-btn" type="button" aria-expanded="false">Hortaliças <span class="caret">▶</span></button>
  <div class="collapsible" aria-hidden="true">
    <div class="produtos-grid" id="grid-hortalicas"></div>
  </div>

  <button class="category-btn" type="button" aria-expanded="false">Legumes <span class="caret">▶</span></button>
  <div class="collapsible" aria-hidden="true">
    <div class="produtos-grid" id="grid-legumes"></div>
  </div>

  <script>
    document.addEventListener('DOMContentLoaded', function () {
      // --- suas categorias/URLs ---
      const categorias = {
        frutas: [
          'https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=375,fit=crop/d954JZ89oWugJMoV/tangerina-importada-mv0JObZoWrsBrEMG.png',
          'https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=375,fit=crop/d954JZ89oWugJMoV/ameixa-YrDJeb80OlIkMy9B.png',
          'https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=375,fit=crop/d954JZ89oWugJMoV/uva-verde-Yg2ynQox3vHEqnvp.png',
          'https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=375,fit=crop/d954JZ89oWugJMoV/abacate-AR03xWXqKXC5QrOD.png',
          'https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=375,fit=crop/d954JZ89oWugJMoV/pitaya-d954J925pEiNwznM.png',
          'https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=375,fit=crop/d954JZ89oWugJMoV/coco-seco-mP4MaWb4wzUeQkZQ.png',
          'https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=375,fit=crop/d954JZ89oWugJMoV/uva-rubi-AMq8eW6qEVF8gWWo.png',
          'https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=375,fit=crop/d954JZ89oWugJMoV/abacaxi-mePJ4QoPD3f1l3QM.png',
          'https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=375,fit=crop/d954JZ89oWugJMoV/manga-tomy-AE0rlWjzNXSKaewV.png',
          'https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=375,fit=crop/d954JZ89oWugJMoV/goiaba-YleQ8boZ4EuQVPNX.png',
          'https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=375,fit=crop/d954JZ89oWugJMoV/mamao-papaya-YanJXQojPqFakODj.png',
          'https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=375,fit=crop/d954JZ89oWugJMoV/mamao-formoso-AE0rlWjzbPfr94b8.png',
          'https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=375,fit=crop/d954JZ89oWugJMoV/figo-A3Q7v9bQZnSNOoZL.png',
          'https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=375,fit=crop/d954JZ89oWugJMoV/maca-gala-YbNJQgkNGeFgwoNv.png',
          'https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=375,fit=crop/d954JZ89oWugJMoV/mexerica-pokan-Yg2ynQo2JPHoqqob.png',
          'https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=375,fit=crop/d954JZ89oWugJMoV/banana-terra-AzGN54BnxEIDNEEa.png',
          'https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=375,fit=crop/d954JZ89oWugJMoV/pera-YbNJQgkNzWC80OqY.png',
          'https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=375,fit=crop/d954JZ89oWugJMoV/laranja-pera-rio-YrDJeb8DDVfrNeRP.png',
          'https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=375,fit=crop/d954JZ89oWugJMoV/limao-tahiti-YNq21bWqLjUR6ZnE.png',
          'https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=375,fit=crop/d954JZ89oWugJMoV/banana-prata-A85VW985zgCD1kzn.png',
          'https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=375,fit=crop/d954JZ89oWugJMoV/maca-fuji-A0xj596x90u8RQq1.png',
          'https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=375,fit=crop/d954JZ89oWugJMoV/limao-siciliano-YBgb0wOggjU84ogp.png',
          'https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=375,fit=crop/d954JZ89oWugJMoV/maca-verde-YD0wVoL0bjHK6J1v.png',
          'https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=375,fit=crop/d954JZ89oWugJMoV/coco-verde-AzGN54BnM0t70oxl.png',
          'https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=375,fit=crop/d954JZ89oWugJMoV/manga-palmer-YNq21bW80kU25gkR.png',
          'https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=375,fit=crop/d954JZ89oWugJMoV/banana-caturra-Y4Lvz9wanDUEDOeR.png',
          'https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=375,fit=crop/d954JZ89oWugJMoV/pessego-mk3JPGo3qKcDKLqa.png',
          'https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=375,fit=crop/d954JZ89oWugJMoV/melancia-A3Q7v9bW0ECyWvrV.png',
          'https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=375,fit=crop/d954JZ89oWugJMoV/maracuja-YZ9jqQo4qlfB9Nya.png',
          'https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=375,fit=crop/d954JZ89oWugJMoV/morango-mePJ4QoP8zf4JD0Y.png',
          'https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=375,fit=crop/d954JZ89oWugJMoV/melao-dJobMWzoQRcG2bXZ.png',
          'https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=375,fit=crop/d954JZ89oWugJMoV/kiwi-AoPJMbokWkUG083M.png',
          'https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=375,fit=crop/d954JZ89oWugJMoV/laranja-bahia-mp8JZbl8Mluv2bZK.png'
        ],
        hortalicas: [
			'https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=375,fit=crop/d954JZ89oWugJMoV/cebolete-Y4Lvz9jnabTb44zK.png',
			'https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=375,fit=crop/d954JZ89oWugJMoV/salsa-mP4MaWx63Ks0Z6Q7.png',
			'https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=375,fit=crop/d954JZ89oWugJMoV/coentro-ALpP3W1zeQFMjNyD.png',
			'https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=375,fit=crop/d954JZ89oWugJMoV/alho-poro-AE0rlW89ELuqz2l0.png',
			'https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=375,fit=crop/d954JZ89oWugJMoV/agriao-m5Knqk54pPhXG7ka.png',
			'https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=375,fit=crop/d954JZ89oWugJMoV/alecrim-m7Vb697NkrSpMBKZ.png',
			'https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=375,fit=crop/d954JZ89oWugJMoV/alface-roxa-AoPJMbL77bhvbOaP.png',
			'https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=375,fit=crop/d954JZ89oWugJMoV/salsao-A1a5E9n6PjTX3Elk.png',
			'https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=375,fit=crop/d954JZ89oWugJMoV/mostarda-m2WE79xOwMHKWB04.png',
			'https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=375,fit=crop/d954JZ89oWugJMoV/manjericao-mnlJDbxXaLckRDOP.png',
			'https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=375,fit=crop/d954JZ89oWugJMoV/acelga-YanJXQlG6Zhzy616.png',
			'https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=375,fit=crop/d954JZ89oWugJMoV/alface-americana-dJobMW3p01CQg100.png',
			'https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=375,fit=crop/d954JZ89oWugJMoV/salsa-crespa-mnlJDbxXyWHr0Bz6.png',
			'https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=375,fit=crop/d954JZ89oWugJMoV/radicchio-A85VW9v7JpTw2wjL.png',
			'https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=375,fit=crop/d954JZ89oWugJMoV/rucula-YD0wVoPZvZf9kzO5.png',
			'https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=375,fit=crop/d954JZ89oWugJMoV/chicoria-m5Knqk5OB7IEB44R.png',
			'https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=375,fit=crop/d954JZ89oWugJMoV/couve-YD0wVoPZERSbvZB7.png',
			'https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=375,fit=crop/d954JZ89oWugJMoV/alface-crespa-mp8JZbjOk2TLeG0l.png',
			'https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=375,fit=crop/d954JZ89oWugJMoV/salvia-m7Vb697NKXcrpgJP.png'
        ],
        legumes: [
			'https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=375,fit=crop/d954JZ89oWugJMoV/tomate-andreia-A85VW98RGyiZoZ8V.png',
			'https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=375,fit=crop/d954JZ89oWugJMoV/pimentao-vermelho-mxBXLbeRXqfRZl00.png',
			'https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=375,fit=crop/d954JZ89oWugJMoV/quiabo-A1a5E9WZ6GfD701B.png',
			'https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=375,fit=crop/d954JZ89oWugJMoV/batata-baroa-mxBXLbePRyS24qKx.png',
			'https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=375,fit=crop/d954JZ89oWugJMoV/abobora-moranga-Y4Lvz9wRjEUx2qZj.png',
			'https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=375,fit=crop/d954JZ89oWugJMoV/beterraba-YbNJQgkjvrhnKrx9.png',
			'https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=375,fit=crop/d954JZ89oWugJMoV/mandioca-amarela-Awv9xb3lRysZ4Lo9.png',
			'https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=375,fit=crop/d954JZ89oWugJMoV/tomate-sg-vermelho-AVLaEQoRWluDnzWW.png',
			'https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=375,fit=crop/d954JZ89oWugJMoV/batata-doce-roxa-YD0wVoLJ7vCWnJMV.png',
			'https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=375,fit=crop/d954JZ89oWugJMoV/cebola-miuda-YX4xvVoR2xCpGR5Y.png',
			'https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=375,fit=crop/d954JZ89oWugJMoV/batata-asterix-YKblZWnyb8UZlr6a.png',
			'https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=375,fit=crop/d954JZ89oWugJMoV/batata-bolinha-AzGN54BoNPFqaNWQ.png',
			'https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=375,fit=crop/d954JZ89oWugJMoV/tomate-sg-amarelo-YleQ8boRPKueWgLb.png',
			'https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=375,fit=crop/d954JZ89oWugJMoV/mandioca-cacau-YBgb0wON6gIl976n.png',
			'https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=375,fit=crop/d954JZ89oWugJMoV/pimentao-verde-m2WE79JZavTOkn5v.png',
			'https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=375,fit=crop/d954JZ89oWugJMoV/cenoura-YZ9jqQo168t58plj.png',
			'https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=375,fit=crop/d954JZ89oWugJMoV/cebola-cocao-YD0wVoLRV3TREWNz.png',
			'https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=375,fit=crop/d954JZ89oWugJMoV/pimentao-amarelo-AzGN54Bo08CXXgbo.png',
			'https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=375,fit=crop/d954JZ89oWugJMoV/batata-suja-mxBXLbeg8Lu5kN0N.png',
			'https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=375,fit=crop/d954JZ89oWugJMoV/cebola-AzGN54BogjteMjwD.png',
			'https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=375,fit=crop/d954JZ89oWugJMoV/vagem-YNq21bW0oRSXG837.png',
			'https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=375,fit=crop/d954JZ89oWugJMoV/pepino-dOqDBpJVroSo7L6J.png',
			'https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=375,fit=crop/d954JZ89oWugJMoV/abobrinha-italiana-AzGN54BlzQUolj9l.png',
			'https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=375,fit=crop/d954JZ89oWugJMoV/brocolis-mk3JPGoWyoTz9PEz.png',
			'https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=375,fit=crop/d954JZ89oWugJMoV/berinjela-mnlJDbow5EuvgX9p.png',
			'https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=375,fit=crop/d954JZ89oWugJMoV/batata-doce-branca-A1a5E9WZ6PCGrXRb.png',
			'https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=375,fit=crop/d954JZ89oWugJMoV/batata-inglesa-YD0wVoLW9NCxwgXp.png',
			'https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=375,fit=crop/d954JZ89oWugJMoV/chuchu-A85VW98xDyS4y6y8.png',
			'https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=375,fit=crop/d954JZ89oWugJMoV/repolho-mp8JZblQkRtP3RZZ.png',
			'https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=375,fit=crop/d954JZ89oWugJMoV/repolho-roxo-mnlJDbowByUrXp85.png',
			'https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=375,fit=crop/d954JZ89oWugJMoV/couve-flor-A1a5E9WZVGiX47l5.png',
			'https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=375,fit=crop/d954JZ89oWugJMoV/pepino-japones-YD0wVoLWepSoWxvy.png',
			'https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=375,fit=crop/d954JZ89oWugJMoV/inhame-cara-YbNJQgkEEKfM7VP9.png',
			'https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=375,fit=crop/d954JZ89oWugJMoV/ervilha-Aq2J3bP4vWUnJKWB.png',
			'https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=375,fit=crop/d954JZ89oWugJMoV/cebola-roxa-YanJXQoLOJtDVEPP.png'
        ]
      };

      // mapa com valores já formatados (MAIÚSCULA inicial + acentos corretos)
      const substitutions = {
        "limao": "Limão",
        "limao siciliano": "Limão Siciliano",
        "limao tahiti": "Limão Tahiti",
        "mamao": "Mamão",
        "mamao papaya": "Mamão Papaya",
        "mamao formoso": "Mamão Formoso",
        "acai": "Açaí",
        "melao": "Melão",
        "maracuja": "Maracujá",
        "maca": "Maçã",
        "maca gala": "Maçã Gala",
        "maca fuji": "Maçã Fuji",
        "rucula": "Rúcula",
        "pera": "Pêra",
        "coco": "Coco",
        "coco seco": "Coco Seco",
        "uva": "Uva",
        "uva verde": "Uva Verde",
        "uva rubi": "Uva Rubi",
        "banana": "Banana",
        "banana terra": "Banana Terra",
        "banana prata": "Banana Prata",
        "abacaxi": "Abacaxi",
        "abacate": "Abacate",
        "manga": "Manga",
        "manga tomy": "Manga Tomy",
        "manga palmer": "Manga Palmer",
        "mexerica": "Mexerica",
        "pessego": "Pêssego",
        "melancia": "Melancia",
        "morango": "Morango",
        "kiwi": "Kiwi",
        "laranja": "Laranja",
		"salvia": "Sálvia",
		"chicoria": "Chicória",
		"agriao": "Agrião",
		"alho poro": "Alho Poró",
		"manjericao": "Manjericão",
		"salsao": "Salsão",
		"brocolis": "Brócolis",
		"cebola cocao": "Cebola Cocão",
		"cebola miuda": "Cebola Miúda",
		"inhame cara": "Inhame Cará",
		"pepino japones": "Pepino Japonês",
		"pimentao amarelo": "Pimentão Amarelo",
		"pimentao vermelho": "Pimentão Vermelho",
		"pimentao verde": "Pimentão Verde",
        "laranja perA rio": "Laranja Pera Rio" // note: try to prefer simple lower-case keys; keep this as example
      };

      // função robusta para extrair e formatar nome
      function filenameToName(input) {
        if (!input) return "";

        // aceita tanto URL inteira quanto só o filename
        let s = String(input).split('?')[0].split('#')[0];
        s = s.split('/').pop() || s;               // pegar última parte
        s = s.replace(/\.[^/.]+$/, '');            // remover extensão

        // separar por '-' e remover o último segmento (sufixo aleatório enviado pelo servidor)
        if (s.includes('-')) {
          const parts = s.split('-');
          // remove somente o último segmento (presume-se que seja o sufixo aleatório)
          parts.pop();
          s = parts.join(' ');
        }

        s = decodeURIComponent(s).replace(/[_-]+/g, ' ').trim();

        const lowerAll = s.toLowerCase();

        // 1) checar substituição para todo o nome
        if (substitutions[lowerAll]) return substitutions[lowerAll];

        // 2) caso não, formatar palavra-a-palavra, aplicando substituições individuais
        return s.split(/\s+/).map(word => {
          const lw = word.toLowerCase();
          if (substitutions[lw]) return substitutions[lw];
          // capitaliza a palavra (primeira maiúscula, resto minúsculo)
          return lw.charAt(0).toUpperCase() + lw.slice(1).toLowerCase();
        }).join(' ');
      }

      function buildGrid(images, containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;
        container.innerHTML = '';
        const produtos = images.map(src => ({
          src,
          name: filenameToName(src) // passar a URL completa (a função lida com isso)
        }));
        produtos.sort((a,b) => a.name.localeCompare(b.name, 'pt', {sensitivity:'base'}));
        produtos.forEach(p => {
          const card = document.createElement('div');
          card.className = 'produto-card';
          const img = document.createElement('img');
          img.src = p.src;
          img.alt = p.name || 'Produto';
          img.addEventListener('load', () => {
            const coll = card.closest('.collapsible');
            if (coll && coll.classList.contains('open')) {
              coll.style.maxHeight = coll.scrollHeight + 'px';
            }
          });
          const nome = document.createElement('p');
          nome.className = 'produto-name';
          nome.textContent = p.name;
          card.appendChild(img);
          card.appendChild(nome);
          container.appendChild(card);
        });
      }

      // monta todos os grids
      buildGrid(categorias.frutas, 'grid-frutas');
      buildGrid(categorias.hortalicas, 'grid-hortalicas');
      buildGrid(categorias.legumes, 'grid-legumes');

      // lógica dos botões (toggle com animação suave)
      const buttons = document.querySelectorAll('.category-btn');
      buttons.forEach(btn => {
        btn.addEventListener('click', () => {
          const content = btn.nextElementSibling;
          if (!content) return;

          const isOpen = content.classList.contains('open');

          if (isOpen) {
            content.style.maxHeight = content.scrollHeight + 'px';
            requestAnimationFrame(() => {
              content.style.maxHeight = '0px';
            });
            content.classList.remove('open');
            btn.setAttribute('aria-expanded', 'false');
            content.setAttribute('aria-hidden', 'true');
          } else {
            content.style.maxHeight = content.scrollHeight + 'px';
            content.classList.add('open');
            btn.setAttribute('aria-expanded', 'true');
            content.setAttribute('aria-hidden', 'false');
          }
        });
      });

    }); // DOMContentLoaded end
  </script>
</body>
</html>
