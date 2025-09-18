document.addEventListener('DOMContentLoaded', () => {
    // ----------------------------------------------------
    // ADAPTAÇÃO PARA PRODUÇÃO:
    // Este é o endereço base da sua API no ambiente de hospedagem (ex: Render).
    // VOCÊ DEVE ATUALIZAR ESTA LINHA após o deploy do seu Backend.
    // Exemplo: const API_BASE_URL = 'https://api.sua-loja.com.br';
    const API_BASE_URL = 'http://PLACEHOLDER-SEU-URL-API.com.br';
    // ----------------------------------------------------
    
    // 1. Encontra o formulário e o botão
    const formContato = document.getElementById('form-contato');
    const btnEnviar = document.getElementById('btn-enviar');

    // Verifica se os elementos foram encontrados (para evitar erros)
    if (!formContato || !btnEnviar) {
        console.error('Um ou mais elementos do formulário de contato não foram encontrados.');
        return;
    }

    formContato.addEventListener('submit', async (event) => {
        event.preventDefault();

        // Desabilita o botão e muda o texto para feedback visual
        btnEnviar.disabled = true;
        btnEnviar.textContent = 'Enviando...';

        // 2. EXTRAÇÃO DE TODOS OS CAMPOS PADRONIZADOS
        const nome = document.getElementById('nome-contato').value;
        const email = document.getElementById('email-contato').value;
        const assunto = document.getElementById('assunto-contato').value; 
        const mensagem = document.getElementById('mensagem-contato').value;

        try {
            // ADAPTAÇÃO: Usar o novo URL na chamada fetch
            const response = await fetch(`${API_BASE_URL}/api/contatos`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                // 3. INCLUSÃO DE TODOS OS CAMPOS NO PAYLOAD JSON
                body: JSON.stringify({
                    nome,
                    email,
                    assunto, 
                    mensagem
                })
            });
            
            const result = await response.json();

            if (response.ok) {
                alert('Mensagem enviada com sucesso! Em breve, entraremos em contato.');
                formContato.reset();
            } else {
                // Erro de validação ou do servidor
                alert('Erro ao enviar a mensagem: ' + (result.message || result.error || 'Erro desconhecido.'));
            }
        } catch (error) {
            console.error('Erro de conexão ou ao enviar o formulário:', error);
            alert('Houve um erro de conexão. Por favor, verifique se o servidor está ativo.');
        } finally {
            // Reabilita o botão, independentemente do sucesso ou falha
            btnEnviar.disabled = false;
            btnEnviar.textContent = 'Enviar Mensagem';
        }
    });
});