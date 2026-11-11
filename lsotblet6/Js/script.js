const aviso = document.getElementById('aviso-formulario');
const botaoFechar = document.querySelector('#aviso-formulario .botao-fechar');

if (aviso && botaoFechar){
    botaoFechar.addEventListener('click',()=> aviso.classList.add('oculto'));
}