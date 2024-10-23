// compartilhamento
document.getElementById("shareButton").addEventListener("click", function () {
    let linkSite = window.location.href;
    navigator.clipboard.writeText(linkSite);
    // Verifica se a API de compartilhamento está disponível no navegador
    if (navigator.share) {
        navigator.share({
            title: 'O Último Projeto',
            text: 'Presencie o último projeto da primeira turma SENAI - Ferraz de Vasconcelos',
            url: window.location.href // URL atual do site
        });
    } else {
        alert('A API de compartilhamento não é suportada neste dispositivo.');
    }
});





// iniciar video Saiba Mais
document.getElementById('btnSaibaMais').addEventListener('click', function (e) {
    const iframe = document.getElementById('youtubeVideo');

    const videoSrc = iframe.src + "&autoplay=1";
    iframe.src = videoSrc;
});





// copiar endereço
document.getElementById("copyAdress").addEventListener("click", function () {
    let endereco = "SESI - Ferraz de Vasconcelos, R. Francisco A Zeiler, 20 - Jardim Juliana, Ferraz de Vasconcelos - SP, 08502-310";
    navigator.clipboard.writeText(endereco);
});









