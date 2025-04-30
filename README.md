# O MVP - Desenvolvido para a AL

Este projeto é uma aplicação web para gerenciar a leitura de livros, permitindo aos usuários cadastrar, visualizar e organizar seus livros.

## Como Executar

Siga estas instruções para configurar e executar o projeto no seu ambiente local.

### Pré-requisitos

Certifique-se de que você tem o Node.js e o npm (ou yarn) instalados na sua máquina.

### Passos para Executar

1.  **Clonar o repositório:**
    
    ```
    git clone https://github.com/vhartmann11/o-mvp.git
    cd o-mvp
    ```
    
2.  **Instalar as dependências do servidor:**
    
    ```bash
    cd backend  # Diretório onde o server.js está localizado
    npm install
    ```
    
3.  **Executar o servidor backend:**
    
    ```bash
    node server.js
    ```
    
    O servidor será iniciado em `http://localhost:5000`.
    
4.  **Instalar as dependências do frontend:**
    
    ```bash
    cd ../frontend  # Entre no diretório do frontend
    npm install
    ```
    
5.  **Executar o frontend:**
    
    ```bash
    npm run dev
    ```
    
    A aplicação web será aberta no seu navegador, geralmente em `http://localhost:3000` ou `http://localhost:5173`.

### Dependências Principais

* **Frontend (React):**
    * `react`
    * `react-dom`
    * `react-toastify`
* **Backend (Node.js/Express):**
    * `express`
    * `cors`

### Observações

* Certifique-se de que o servidor backend está em execução antes de iniciar o frontend.
* O frontend se comunica com o backend na porta 5000. Se você alterar a porta do backend, atualize as chamadas de API no frontend correspondentemente.