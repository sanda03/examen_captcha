 // Charger la clé API à partir du fichier .env
 fetch('./.env')
 .then(response => response.text())
 .then(data => {
     // Extraire la clé API du fichier .env
     const envVariables = {};
     data.split('\n').forEach(line => {
         const [key, value] = line.split('=');
         if (key && value) {
             envVariables[key.trim()] = value.trim();
         }
     });

     // Définir la clé API dans window.WAF_API_KEY
     window.WAF_API_KEY = envVariables.WAF_API_KEY;

     // Continuer avec le reste du code
     console.log("Clé API chargée :", window.WAF_API_KEY);

     // Fonction pour générer et afficher la séquence "Forbidden"
     function generateSequence(event) {
         event.preventDefault(); // Empêcher le rechargement de la page lors de la soumission du formulaire

         const number = parseInt(document.getElementById("numberInput").value);

         // Vérifier si le nombre est valide (entre 1 et 1000)
         if (isNaN(number) || number < 1 || number > 1000) {
             alert("Veuillez entrer un nombre entre 1 et 1000.");
             return;
         }

         // Masquer le formulaire et afficher la séquence "Forbidden"
         document.getElementById("inputForm").style.display = "none";
         document.getElementById("output").style.display = "block";

         // Générer la séquence "Forbidden"
         let sequenceHtml = "";
         for (let i = 1; i <= number; i++) {
             sequenceHtml += `${i}. Forbidden<br>`;
         }
         document.getElementById("output").innerHTML = `<h2>Generated Sequence:</h2>${sequenceHtml}`;

         // Afficher le Captcha
         showCaptcha();
     }

     // Fonction pour afficher le Captcha
     function showCaptcha() {
         const captchaModal = document.getElementById("captchaModal");
         captchaModal.style.display = "block";

         const container = document.querySelector("#captchaContainer");
         AwsWafCaptcha.renderCaptcha(container, {
             apiKey: window.WAF_API_KEY,
             onSuccess: function(wafToken) {
                 // Lorsque le Captcha est validé, effectuer un traitement si nécessaire
                 console.log("Captcha validé, WAF Token :", wafToken);
                 captchaModal.style.display = "none";
                 alert("Captcha validé avec succès !");
             },
             onError: captchaExampleErrorFunction,
         });
     }

     // Fonction appelée en cas d'erreur du Captcha
     function captchaExampleErrorFunction(error) {
         console.error("Erreur de Captcha:", error);
         alert("Une erreur est survenue avec le Captcha. Veuillez réessayer.");
     }

     // Ajouter un gestionnaire d'événements pour le formulaire
     const inputForm = document.getElementById("inputForm");
     inputForm.addEventListener("submit", generateSequence);

     // Gestion du bouton "Captcha Solved"
     const captchaSolvedButton = document.getElementById("captchaSolved");
     captchaSolvedButton.addEventListener("click", function() {
         alert("Merci d'avoir résolu le Captcha !");
         document.getElementById("captchaModal").style.display = "none";
     });
 })
 .catch(err => console.error("Erreur lors du chargement du fichier .env :", err));
