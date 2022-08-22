const http = require('http')
const PORT = 3000;
const dbQuery = require('./dbQuery.js');


const getMusicas = () => {
    return new Promise(async (resolve, reject) => {
        const musicas = await dbQuery('SELECT * FROM musicas;');
        const generos = await dbQuery('SELECT * FROM generos;');
        for (let i = 0; i < musicas.length; i++) {
            for (let j = 0; j < generos.length; j++) {
                if (musicas[i].generos_id === generos[j].id) {
                    musicas[i] = {
                        musica: musicas[i].nome,
                        artista: musicas[i].artista,
                        album: musicas[i].album,
                        genero: generos[j].descricao,
                    }
                }
            }
        }
        resolve(musicas)
    })
}

function api(musicas) {
    http.createServer((request, response) => {
      
        let payload = "";

        request.on('data', (buffer) => {
            payload += buffer;
        })

        request.on("end", async () => {

            payload = payload ? JSON.parse(payload) : {};

            const url = request.url;

            const segments = url.split('/').filter((segment) => Boolean(segment));

            let status = 200;

            let data = {};

            const head = {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
                'Access-Control-Allow-Headers': 'X-Requested-With,content-type',
                'Access-Control-Allow-Credentials': true 
            };

            if (segments.length === 0) {

                data = { message: "musicas" };

            } else if (segments[0] === 'musicas' && segments.length === 1) {
                
                data = musicas

            } else {

                data = { error: "Pagina não Encontrada" };
                status = 404;

            }
            response.writeHead(status, head, { 'Content-type': 'application/json; charset=utf8' });
            response.write(JSON.stringify(data));
            response.end();

        });
    }).listen(PORT, () => {
        console.log(`Server started at http://localhost:${PORT}/`);
    });
};
getMusicas().then((musicas) => {
    api(musicas);
});




