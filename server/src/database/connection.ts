import knex from 'knex';
import path from 'path'; //para ajudar com a resolução de endereçamentos de pastas do projeto.

//migrations - controlam a versão do banco de dados...

const db = knex({
    client: 'sqlite3', //Definindo qual banco irá ser utilizado, importante sempre definir.
    connection: {
        filename: path.resolve(__dirname, 'database.sqlite')//Definindo o endereço onde vai ser criado o arquivo de dados, definindo o nome do banco.
        //path.resolve ajuda a lidar melhor com os endereçamentos já que diferentes S.O usam "/" diferentes.
    },
    useNullAsDefault: true, //Usando o valor nulo como valor padrão dos campos que ainda não foram preenchidos.
});

export default db;