window.WAF_API_KEY = "qbMb7mJtQWD9BC6pyuR5ZWHOHxZIlYgrnR1D/atBqomPaHvmzI1NvnjXkBNmQIe4maAAf2nG+mSQgK4uFS4Oo55OdrvISXvjTgXGhgYueK3jdoZ5LFPtGopABo0SWFQ/NPPM5ooGcHkmXqQvusTyk2YX7iv+07IncHMbKg+zJt6EsyKO+PfesXdxfutPuvliMlm08xmcswrnU56UmhChrp0P7XouECBANj1q/eFLPA8Vr4zx80u20LYv9t5yhKZ3/va+TIQd1lLDfn7A/OkwJadNJDa5BDa9mSOs7/Z2K+CADVy9eiC4eICjshybEw+UFzVSJA4CghTaCvjjqqhk39VmzFSYOn5PbS1lNW5EqKWkoMaanhgBxrQmuW+/vQ+tLhEStMH3cD+f/TBD12TIWd4/azYJ29Lo8eSKQPd0Y2jgW/kdfk6BMkUy6QDOHS1nJBeafxE+wE6UrQvbkp9HEwj+NHhDQSzeFPUnzOBfUStbLB8OjIbpfPLo3eYaSXjNuCwTyvpb0S43giGlJNgKeRqM4IieGApfqf4v4a+9qSB2O/H4W85gvtnqoGwiDGJyxC8q19uFUwYeMcFYBsY9TskIk49Yrd+rTPQ6elcNXMy4JSdYJg4gU0EFpsMwRNWiecYgRMck4Xt7LRVW0sBHVsQTKP/HyJIq9Uh+Sowxs4w=_0_1"; // Remplacez ceci par votre vraie clé API

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
