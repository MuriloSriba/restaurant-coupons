const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');
const path = require('path');

const dbPath = path.join(__dirname, 'database.sqlite');
const schemaPath = path.join(__dirname, 'schema-fixed.sql');

// Conecta ao banco de dados (cria o arquivo se não existir)
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Erro ao abrir o banco de dados:', err.message);
    return;
  }
  console.log('Conectado ao banco de dados SQLite.');
});

// Lê o arquivo SQL
const schema = fs.readFileSync(path.join(__dirname, 'schema-final.sql'), 'utf-8');

// Executa o script SQL para criar tabelas e popular os dados
db.exec(schema, (err) => {
  if (err) {
    console.error('Erro ao executar o schema SQL:', err.message);
  } else {
    console.log('Banco de dados inicializado e populado com sucesso.');
  }

  // Fecha a conexão com o banco de dados
  db.close((err) => {
    if (err) {
      console.error('Erro ao fechar o banco de dados:', err.message);
    }
    console.log('Conexão com o banco de dados fechada.');
  });
});