const owner = 'Cavalchi';
const repo = 'Sorteio-Mercedes-Benz';
const path = 'Sorteio-Mercedes-Benz/Cadastro/att.js';
const message = 'mensagem de confirmação';
const token = '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';
const messageElement = document.createElement('div');
document.body.appendChild(messageElement);  

// Obter o conteúdo atual do arquivo
fetch(`https://api.github.com/repos/${owner}/${repo}/contents/${path}`, {
  headers: {
    'Authorization': `token ${token}`
  }
})
.then(response => response.json())
.then(data => {
  // Decodificar o conteúdo do arquivo de base64
  let content = atob(data.content);
  // Adicionar os novos dados do formulário
  content += '\nnovos dados do formulário';
  // Codificar o conteúdo atualizado em base64
  content = btoa(content);
  // Atualizar o conteúdo do arquivo
return fetch(`https://api.github.com/repos/${owner}/${repo}/contents/${path}`, {
  method: 'PUT',
  headers: {
    'Authorization': `token ${token}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ message, content })
})
.then(response => {
  if (response.ok) {
    // Exibir uma mensagem de sucesso
    messageElement.textContent = 'Dados salvos com sucesso!';
  } else {
    // Exibir uma mensagem de erro
    messageElement.textContent = 'Ocorreu um erro ao salvar os dados.';
  }
})
.catch(error => {
  // Exibir uma mensagem de erro
  messageElement.textContent = 'Ocorreu um erro ao salvar os dados.';
});})
