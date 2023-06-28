# BioReino Website
BioReino é uma plataforma online fictícia de cursos de biologia, possuindo diversos cursos nos planos PROFESSIONAL e SCHOLAR.
<br>
Se encontra disponível em: https://bioreino.vercel.app/

## Como executar o projeto localmente
### Requisitos
1. Node;
2. NPM *(gerenciador de pacotes do node, vem junto com o node em sua instalação padrão)*;

### Passo a passo

1. Clone este repositório;
2. Abra a raiz do projeto <code>/bioreino</code> no terminal;
3. Execute o comando <code>npm install</code> para instalar todas as dependências do projeto que estão dentro do package-json *(será criada a pasta node_modules)*;
4. Em caso de erro, acesse no terminal a pasta <code>client/</code> e execute o comando <code>npm install</code>;
5. Em seguida, no terminal, volte para a raiz do projeto <code>/bioreino</code>;
6. Crie o arquivo <code>.env</code>, e cole as variáveis de desenvolvimento a seguir: <br>
<code>NODE_ENV = development
DB = bioreino
DB_USER = Visitante
DB_PASS = NLTnH30orrMLaW7z
TOKEN_SECRET = mfcoi32jc8903jm,v90835MJVCJTM3cfmkpowVM<.</code>
7. Por fim, execute no terminal o comando <code>npm run start_dev</code>;
8. Pronto, agora é só ir no navegador e colar a seguinte url: <code>http://localhost:5173/</code>;
