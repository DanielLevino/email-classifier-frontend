# 📧 Classificador de Emails – Frontend

Interface web para envio e visualização de emails classificados pelo backend.  
Permite inserir texto, enviar arquivos `.pdf`/`.txt`, copiar sugestão de resposta com apenas um clique e visualizar o histórico de classificações salvas no **localStorage**.

---

## 🚀 Funcionalidades
- Envio de emails (texto ou arquivos).  
- Integração com backend em Python para processamento e classificação.
- Botão para copiar os dados para área de transferência de forma rápida.
- Salvamento local (`localStorage`) dos resultados:  
  - Email original;  
  - Classificação (`produtiva` ou `improdutiva`);  
  - Resposta sugerida;  
  - Data/hora.  
- Botão flutuante no canto inferior direito → abre um **modal** com lista de resultados.  
- Botão dentro do modal para **limpar o histórico** do `localStorage`.

---

## 🛠️ Tecnologias
- **HTML5, CSS3, JavaScript**  
- **Bootstrap 5** (UI, modal, botão flutuante)  
- **LocalStorage**  

---

## ▶️ Como usar
1. Abra o arquivo `index.html` no navegador.  
2. Insira o texto ou envie arquivos de email.
3. Copie a resposta para a Área de Transferência.  
4. Clique no botão flutuante para abrir o modal e ver o histórico.  
5. Use o botão **“Limpar histórico”** no modal para zerar os dados do `localStorage`.  

---

## 📜 Licença
Distribuído sob a licença MIT.
