# Polvo - Quiz Feature

Esta API consiste nas funcionalidades para o software Polvo, gerenciador de instituição educacional, juntamente a nova feature de realizar quizzes na plataforma


## app.js
### levantamento do server e conexão com o banco de dados
1. CORS: permite requisições de outros domínios
2. express.json(): permite o recebimento e interpretação de corpos de requisição no formato JSON (APIs REST)
3. conexão com o banco
    - /db : conecta ao MongoDB atraves da porta definida 
4. importação das rotas da API
5. Direciona todas as rotas com início "/api" para as rotas da API
6. __ErrorHandler__: verifica o disparo de um erro personalizado (AppError) durante a execução e retorna seu status e mensagem
7. inicialização do servidor e escutas na porta definida

# Arquivos

## /constants
definicao dos códigos e mensagens de erros personalizados que consistirão no tratamento de erros do software

## /models
consiste nas entidades presentes no sistema, que correspondem também as "tabelas" do banco de dados MongoDB:
- Usuário (aluno, professor e adm)
- Disciplina
- Relação entre usuários e disciplinas 
- Quiz
- Respostas do Quiz

## /controllers 
controladores para as respectivas entidades do sistema, nele são executadas as operações de CRUD e Login no caso dos usuários

## /routes 
os arquivos da pasta __routes__ fazem a ponte entre as requisições feitas do frontEnd até as funções requisitadas que são executadas nos controladores

1. __router.js__ é o arquivo inicial que distribui as requisicoes para as demais rotas, específicas por entidade:

    ### Rota de login 
    única rota que pode ser acessada sem um __token__ válido, é a rota que concede o acesso do usuário ao software

    ### checkToken - Middleware de autenticação
    a função checkToken é passada no caminho das rotas de todas as entidades, ela garante a autenticação dos usuários através da verificação de seu __token__, que é adquirido após o login

2. entidadeRouter 
    cada entidade possui seu respectivo __Router__, que direcionará a requisição para a função adequada através dos caminhos das rotas e dos métodos do protocolo HTTP

    ### tryCatch - tratamento de erros
    função passada antes de todas as ações realizadas pelos controllers, afim de capturar e centralizar todos os erros em um ponto
