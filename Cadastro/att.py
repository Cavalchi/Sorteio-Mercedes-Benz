import base64
import json
import os

import requests

owner = 'Cavalchi'
repo = 'Sorteio-Mercedes-Benz'
path = 'Sorteio-Mercedes-Benz/Cadastro/att.js'
message = 'mensagem de confirmação'
token = os.environ['GITHUB_TOKEN']

# Obter o conteúdo atual do arquivo
response = requests.get(
    f'https://api.github.com/repos/{owner}/{repo}/contents/{path}',
    headers={'Authorization': f'token {token}'}
)
data = response.json()

# Decodificar o conteúdo do arquivo de base64
content = base64.b64decode(data['content']).decode('utf-8')

# Coletar os valores dos campos do formulário
email = input('Email: ')
name = input('Nome: ')
lastname = input('Sobrenome: ')
phone = input('Telefone: ')

# Formatar os dados do formulário
form_data = f'{email} {name} {lastname} {phone}'

# Adicionar os novos dados do formulário
content += f'\n{form_data}'

# Codificar o conteúdo atualizado em base64
content = base64.b64encode(content.encode('utf-8')).decode('utf-8')

# Atualizar o conteúdo do arquivo
response = requests.put(
    f'https://api.github.com/repos/{owner}/{repo}/contents/{path}',
    headers={
        'Authorization': f'token {token}',
        'Content-Type': 'application/json'
    },
    data=json.dumps({'message': message, 'content': content})
)

if response.ok:
    # Exibir uma mensagem de sucesso
    print('Dados salvos com sucesso!')
else:
    # Exibir uma mensagem de erro
    print('Ocorreu um erro ao salvar os dados.')
