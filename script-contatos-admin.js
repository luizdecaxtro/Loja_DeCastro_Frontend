<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Administração de Contatos | DeCastro</title>
    <style>
        body {
            background-color: #3e3e3e;
            color: #ffffff;
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            text-align: center;
        }
        .cabecalho {
            background-color: #2e2e2e;
            color: #ffb703;
            padding: 1rem 2rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        .cabecalho h1 {
            margin: 0;
        }
        .menu-navegacao a {
            color: #ffffff;
            text-decoration: none;
            margin-left: 2rem;
        }
        main {
            padding: 2rem;
        }
        h2 {
            color: #ffb703;
        }
        #contatos-container {
            display: flex;
            flex-direction: column;
            gap: 1rem;
            max-width: 800px;
            margin: 0 auto;
            text-align: left;
        }
        .mensagem-card {
            background-color: #4a4a4a;
            padding: 1.5rem;
            border-radius: 8px;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
        }
        .mensagem-card h3 {
            margin: 0 0 0.5rem 0;
            color: #fff;
        }
        .mensagem-card p {
            margin: 0.5rem 0;
        }
        .mensagem-card p.email {
            color: #bbb;
        }
        .mensagem-card p.data {
            font-size: 0.8em;
            color: #999;
            text-align: right;
        }
        .loading-message {
            font-size: 1.5rem;
            color: #ffb703;
        }
    </style>
</head>
<body>
    <header class="cabecalho">
        <h1>DeCastro</h1>
        <nav class="menu-navegacao">
            <a href="index.html">Início</a>
            <a href="produtos.html">Produtos</a>
            <a href="contato.html">Contato</a>
            <a href="sobre.html">Sobre</a>
            <a href="pesquisa.html">Pesquisa</a>
            <a href="carrinho.html">Carrinho</a>
        </nav>
    </header>
    <main>
        <h2>Mensagens de Contato</h2>
        <div id="contatos-container" class="loading-message">
            Carregando Mensagens...
        </div>
    </main>
    <script src="script-contatos-admin.js"></script>
</body>
</html>