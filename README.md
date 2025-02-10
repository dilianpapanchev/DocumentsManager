<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Репортирай проблем - Универсално</title>
  <style>
    /* Основни стилове за по-добър външен вид */
    body {
      font-family: Arial, sans-serif;
      margin: 20px;
      background-color: #f4f4f4;
    }
    .container {
      max-width: 400px;
      margin: 0 auto;
      background: #fff;
      padding: 20px;
      border: 1px solid #ddd;
      border-radius: 4px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      text-align: center;
    }
    h2 {
      margin-top: 0;
    }
    p {
      margin: 15px 0;
    }
    button {
      width: 100%;
      padding: 12px;
      font-size: 16px;
      background-color: #d9534f;
      border: none;
      color: #fff;
      border-radius: 4px;
      cursor: pointer;
    }
    button:hover {
      background-color: #c9302c;
    }
  </style>
  
  <!-- Зареждане на Office.js – ако кодът се изпълнява в Outlook -->
  <script src="https://appsforoffice.microsoft.com/lib/1/hosted/office.js"></script>
  
  <script>
    // Функция, която се извиква при зареждане на Office (ако е наличен) или веднага, ако Office не е наличен
    function initialize() {
      // Добавяме обработчик на събитието за бутона
      document.getElementById("reportButton").addEventListener("click", reportProblem);
    }

    // Ако Office е наличен, изчакваме да е готов
    if (window.Office) {
      Office.onReady(initialize);
    } else {
      // Ако Office не е наличен (например в стандартен браузър), инициализираме веднага
      document.addEventListener("DOMContentLoaded", initialize);
    }

    // Функция за репортиране на проблема
    function reportProblem() {
      // Проверяваме дали сме в Outlook среда (Office контекстът е наличен)
      if (window.Office && Office.context && Office.context.mailbox) {
        // Извличаме текущия имейл
        var item = Office.context.mailbox.item;
        // Опитваме се да вземем получателите от полето "До"
        var recipients = item.to;

        // Ако няма получатели в "До", използваме подателя
        if (!recipients || recipients.length === 0) {
          recipients = [item.from];
        }

        // Подготвяме детайлите за новото съобщение
        var messageDetails = {
          toRecipients: recipients,
          subject: "Report Problem",
          htmlBody: "<p>Моля, опишете подробно проблема:</p>"
        };

        // Отваряме нов прозорец за писане на имейл с предварително попълнените детайли
        Office.context.mailbox.displayNewMessageForm(messageDetails);
      } else {
        // Fallback – ако не сме в Outlook: използваме mailto: линк с предварително зададени получател, тема и съдържание.
        // Тук можете да смените support@example.com с желания от вас email адрес.
        var defaultRecipient = "support@example.com";
        var subject = encodeURIComponent("Report Problem");
        var body = encodeURIComponent("Моля, опишете подробно проблема:");
        window.location.href = "mailto:" + defaultRecipient + "?subject=" + subject + "&body=" + body;
      }
    }
  </script>
</head>
<body>
  <div class="container">
    <h2>Репортирай проблем</h2>
    <p>Натиснете бутона, за да отворите нов прозорец за писане на имейл за репортиране на проблема.<br>
       В Outlook ще се използват получателите от оригиналния имейл, а в други среди ще се използва предварително зададен адрес.</p>
    <button id="reportButton">Репортирай проблем</button>
  </div>
</body>
</html>
