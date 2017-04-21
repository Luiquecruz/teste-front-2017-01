# teste-front-2017-01

![home](https://cloud.githubusercontent.com/assets/12043837/25298705/db0c2cf0-26cd-11e7-9141-de48e19b9dd9.png)

## GitHub User Viewer
É um webapp que permite ao usuário fazer buscas através de usernames do github, ter uma visualização de seu perfíl com informações básicas, fazer anotações ou observações sobre cada usuário e navegar por seus repositórios.

### Funções implementadas até o momento.

* Pesquisa por username.
* Visualização de repositórios.
* Pagina 404 para usuário não encontrado.
* Armazenamento local de anotações sobre usuários.

---

### Instalação Básica
#### Requisitos
Ter instalado em seu computador:

* browser de sua preferência
* conexão á internet

---

1. Click no botão de download para baixar o app direto do repositório.
2. Abra o arquivo **index.html**.

---

### Instalação para Desenvolvedores
#### Requisitos
Ter instalado em seu computador:

* git
* node.js
* npm
* gulp.js
* browser de sua preferência
* conexão á internet ( para fazer requisições à API do github )

---

1. Em seu terminal, navegue até a pasta desejada e clone o repositório do app digitando o seguinte comando:

 ```
  git clone https://github.com/Luiquecruz/teste-front-2017-01.git
 ```

2. Após o download do repositório ser finalizado,  instale as dependências necessárias encontradas no arquivo **package.json** digitando:

 ```
  npm install
 ```

3. Para iniciar o modo de produção, após ter instalado as dependências, digite:

 ```
  gulp start
 ```

 ---