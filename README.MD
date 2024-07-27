# Objetivo
Este repositório foi criado para o desafio Full Cycle 3.0, no curso de Docker. O desafio é fazer com que uma aplicação Node JS possa ser acessada através de um proxy reverso que foi levantado com Nginx. Este proxy faz o bind até a aplicação, que acessa um banco de dados, onde uma lista de nomes é inserida e depois impressa na tela.

# Como subir a aplicação
Entre na pasta onde o diretório foi clonado. Esta aplicação usa módulos externos, então depois de realziar o pull, por favor, execute git submodule init, para que a aplicação 'docker-wait-for-it' seja executada e permita que os container subam em ordem correta.

Feito isso, basta executar 'docker compose up -d' para que a aplicação rode em modo deamon e não dependa da console para manter-se de pé. Caso prefira manter 'atachado', execute apenas 'docker compose up'. Assim, quando encerrar o terminal, sua aplicação também cairá.

# Testando a aplicação
Com os passos acima feitos, basta acessar em seu navegador 'http://localhost:8080/'. Caso queira verificar os logs da aplicação, em seu terminal:
- docker logs -f app
- docker logs -f mysql
- docker logs -f nginx
A flag -f permite que você continue vendo o log em tempo de execução. Caso queira verificar apenas uma vez, execute sem esta flag.