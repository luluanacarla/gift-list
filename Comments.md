# Gift List

# Escolha da tecnologia

Escolhi o [ReactJs](https://reactjs.org/) pois é uma das tecnologias amplamente usada pelos desenvolvedores hoje em dia, então sua comunidade é gigante. Outro fator é a simplicidade da lib. React tem uma API simples e acabamos utilizando muito mais JavaScript do que sintaxe específica.

# Abordagem Técnica

## Base de dados

Escolhi o [myjson](http://myjson.com/) para hospedar a base de dados. Ele fornece uma URL para ser acessada. No projeto, utilizo o [axios](https://github.com/axios/axios) para se comunicar com a base de dados.

## Estrutura das pastas

Para a estruturação das pastas, sempre escolho por separar o estilo do projeto na pasta `assets`, na pasta `components` ficam os componentes da aplicação que podem ser reutizados por varias páginas, na pasta `layouts` na maioria das vezes ficam os componentes que formam as páginas esteticamente como header e footer e na pasta `pages` ficam os componentes das telas da aplicação.

## Boostrap Components

Para a customização, escolhi o [reactstrap](https://reactstrap.github.io/) que é uma library de components utilizando o Boostrap 4. Possui muitos componentes úteis como Spinner, Table, Row, Col.

## Geral

- Padrões de desenvolvimento: DRY e KISS;
- Formatação de código com [Prettier](https://prettier.io/);
- Deploy com [now](https://zeit.co/now);
- Commites: Utilização do [AngularJS's commit message convention](https://github.com/angular/angular.js/blob/master/DEVELOPERS.md#-git-commit-guidelines)
  na mensagem do commit

OBS: Mudei um pouco do que estava no layout original, na parte do subheader, pois achei que daquele jeito não ficaria legal em telas menores. Tente pensar em uma tela totalmente responsiva.
