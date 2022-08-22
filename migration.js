const client = require('./db.js');
const dbQuery = require('./dbQuery.js');
const sql = [
    `DROP TABLE IF EXISTS musicas`,
    `DROP TABLE IF EXISTS generos`,
    `create table  generos (id int not null primary key, descricao  varchar(45) not null);`, // 0
    `create table  musicas (id int not null primary key, nome varchar(45) not null, artista varchar(45) not null, album  varchar(45) not null,generos_id int not null, foreign key(generos_id) references generos(id));`, // 1
    `insert into generos values(1 , 'rock');`,
    `insert into generos values(2 , 'pop');`,
    `insert into generos values(3 , 'funk');`,
    `insert into generos values(4 , 'eletronic');`,
    `insert into generos values(5 , 'mpb');`,
    `insert into generos values(6 , 'samba');`,
    `insert into generos values(7 , 'emo');`,
    `insert into generos values(8 , 'death metal');`,
    `insert into generos values(9 , 'folk');`,
    `insert into generos values(10 , 'grunge');`,
    `insert into musicas Values(1, 'Like a Virgem', 'Maddona', 'Like a Virgin', 2);`,
    `insert into musicas Values(2, 'Candle in the Wind', 'Elton John', 'Goodbye Yellow Brick Road', 1);`,
    `insert into musicas Values(3, 'Vermelho', 'Gloria Groove', 'LadyLest', 3);`,
    `insert into musicas Values(4, 'Silent Path', 'Death Decline', 'The Silent Path', 8);`,
    `insert into musicas Values(5, 'Sugar','Morrom 5', 'Fame on Fire', 2);`,
    `insert into musicas values(6, 'Love Me Two Times', 'The Doors', 'THE DOORS: SPECIAL COLLECTION', 1);`,
    `insert into musicas Values(7, 'YMCA', 'Village People', 'Cruisin', 2);`,
    `insert into musicas Values(8, 'Cruisin', 'Huey Lewis and the News', 'film duet', 2);`,
    `insert into musicas Values(9, 'recomeçar', 'Restart', 'Restart', 7);`,
    `insert into musicas Values(10, 'Uma musica', 'Fresno', 'Redençao', 7);`,
]
async function main() {
    sql.forEach((sql) => {
        dbQuery(sql);
        console.log(sql);
        // let result = await dbQuery(sql);
        // console.log(sql, result);
    });
    let musicas = await dbQuery('SELECT * FROM musicas;');
    let generos  = await dbQuery('SELECT * FROM generos;');
    console.table(musicas);
    console.table(generos);

    client.end();
}

main();