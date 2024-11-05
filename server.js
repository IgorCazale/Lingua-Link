const http = require('http');
const fs = require('fs');
const path = require('path');
const express = require('express');
const app = express();
const PORT = 8080; // Porta do servidor

// Middleware para processar dados de formulários
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware para permitir CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); // Permite todas as origens
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS'); // Métodos permitidos
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type'); // Cabeçalhos permitidos
    next();
});

// Servir arquivos estáticos da pasta 'html'
app.use(express.static(path.join(__dirname, 'html')));

// Rota de matrícula para exibir a mensagem de sucesso
app.post('/matricula', (req, res) => {
    console.log('Dados da matrícula recebidos:', req.body); // Exibe os dados no console
    res.json('Matrícula realizada com sucesso!' );
});

// Função para lidar com requisições HTTP e arquivos estáticos
const server = http.createServer((req, res) => {
    let filePath = path.join(__dirname, req.url === '/' ? 'html/index.html' : req.url);
    const extname = path.extname(filePath);
    let contentType = 'text/html';

    switch (extname) {
        case '.js':
            contentType = 'text/javascript';
            break;
        case '.css':
            contentType = 'text/css';
            break;
        case '.json':
            contentType = 'application/json';
            break;
        case '.png':
            contentType = 'image/png';
            break;
        case '.jpg':
            contentType = 'image/jpg';
            break;
        case '.gif':
            contentType = 'image/gif';
            break;
        case '.svg':
            contentType = 'image/svg+xml';
            break;
        case '.woff':
            contentType = 'font/woff';
            break;
        case '.woff2':
            contentType = 'font/woff2';
            break;
        case '.ttf':
            contentType = 'font/ttf';
            break;
    }

    fs.readFile(filePath, (error, content) => {
        if (error) {
            if (error.code == 'ENOENT') {
                res.writeHead(404);
                res.end('404 Not Found');
            } else {
                res.writeHead(500);
                res.end('500 Internal Server Error');
            }
        } else {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf-8');
        }
    });
});

// Inicializar o servidor HTTP e o Express
server.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});

app.listen(3000, () => console.log('Servidor Express rodando na porta 3000 para matrículas'));
