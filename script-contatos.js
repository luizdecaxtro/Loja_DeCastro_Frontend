document.addEventListener('DOMContentLoaded', () => {
    // ----------------------------------------------------
    // CORREÇÃO CRÍTICA: URL do Backend no Render
    // SUBSTITUIR PELA SUA URL REAL DO RENDER
    const API_BASE_URL = 'https://loja-decastro-backend.onrender.com'; 
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
        const assunto = document.getElementById('assunto-contato').value; // 'assunto' está sendo coletado
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



