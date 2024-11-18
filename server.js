const http = require('http');
const fs = require('fs');
const path = require('path');
const express = require('express');
const nodemailer = require('nodemailer');  // Importando o nodemailer
const jwt = require('jsonwebtoken');  // Importando o jsonwebtoken para sessões
const cookieParser = require('cookie-parser');  // Importando o cookie-parser para lidar com cookies
const app = express();
const PORT = 8080; // Porta do servidor

// Middleware para processar dados de formulários
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());  // Adicionando o middleware de cookie-parser

// Middleware para permitir CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); // Permite todas as origens
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS'); // Métodos permitidos
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type'); // Cabeçalhos permitidos
    next();
});

// Servir arquivos estáticos da pasta 'html'
app.use(express.static(path.join(__dirname, 'html')));

// Carregar usuários do arquivo users.json
const usersPath = path.join(__dirname, 'users.json');
let users = require(usersPath);

// Função para verificar credenciais
const authenticateUser = (username, password) => {
    return users.find(user => user.username === username && user.password === password);
};

// Rota de Login
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Verificar se o usuário existe e as credenciais estão corretas
    const user = authenticateUser(username, password);
    if (!user) {
        return res.status(401).send('Credenciais inválidas');
    }

    // Criar um token JWT com as informações do usuário
    const token = jwt.sign({ username: user.username, turma: user.turma }, 'seu_secret', { expiresIn: '1h' });

    // Salvar o token no cookie
    res.cookie('auth_token', token, { httpOnly: true, secure: false, maxAge: 3600000 }); // 1 hora de expiração

    // Redirecionar para a área do aluno
    res.redirect('/area-do-aluno');
});

// Rota da Área do Aluno (somente acessível se o usuário estiver logado)
app.get('/area-do-aluno', (req, res) => {
    const token = req.cookies.auth_token;

    if (!token) {
        return res.redirect('/login'); // Se o token não estiver presente, redireciona para login
    }

    // Validar o token
    jwt.verify(token, 'seu_secret', (err, decoded) => {
        if (err) {
            return res.redirect('/login'); // Se o token for inválido, redireciona para login
        }

        // Encontrar os dados do usuário com base no username (decoded.username)
        const user = users.find(u => u.username === decoded.username);
        if (!user) {
            return res.redirect('/login'); // Se o usuário não for encontrado, redireciona para login
        }

        // Se o token for válido, exibe a área do aluno com as informações
        res.render('area-do-aluno', { user: user });
    });
});

// Rota de Logout
app.post('/logout', (req, res) => {
    res.clearCookie('auth_token');
    res.redirect('/login');
});

// Rota de Matrícula para exibir a mensagem de sucesso
app.post('/matricula', (req, res) => {
    console.log('Dados da matrícula recebidos:', req.body); // Exibe os dados no console
    res.json('Matrícula realizada com sucesso!' );
});

// Rota para enviar mensagem de contato
app.post('/enviar-mensagem', (req, res) => {
    const { name, email, subject, message } = req.body;

    // Configuração do transportador do Nodemailer
    const transporter = nodemailer.createTransport({
        service: 'gmail',  // Ou outro serviço de e-mail
        auth: {
            user: 'seuemail@gmail.com',  // Seu e-mail
            pass: 'suasenha'  // Sua senha de e-mail (ou senha de aplicativo)
        }
    });

    // Configuração do e-mail
    const mailOptions = {
        from: email,
        to: 'contato@lingualink.com',  // O e-mail de destino
        subject: `Contato: ${subject}`,
        text: `Nome: ${name}\nEmail: ${email}\n\nMensagem:\n${message}`
    };

    // Envia o e-mail
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Erro ao enviar e-mail:', error);
            return res.status(500).json({ message: 'Erro ao enviar mensagem' });
        } else {
            console.log('E-mail enviado:', info.response);
            return res.status(200).json({ message: 'Mensagem enviada com sucesso' });
        }
    });
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

// Inicia o servidor express para matrículas (em outra porta)
app.listen(3000, () => console.log('Servidor Express rodando na porta 3000 para matrículas'));
