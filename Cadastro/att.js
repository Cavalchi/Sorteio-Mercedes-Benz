const owner = 'Cavalchi';
const repo = 'Sorteio-Mercedes-Benz';
const path = 'Sorteio-Mercedes-Benz/Cadastro/att.js';
const message = 'mensagem de confirmação';
const token = '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';

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
  });
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error(error));
