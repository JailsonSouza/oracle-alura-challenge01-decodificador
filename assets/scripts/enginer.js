let copyButtonClicked = false;

function copiarTexto(textoCriptografado) {
    copyButtonClicked = true;
    console.log(copyButtonClicked);
    let inputTemporario = document.createElement("textarea");
    inputTemporario.value = textoCriptografado;
    
    document.body.appendChild(inputTemporario);
    inputTemporario.select();
    inputTemporario.setSelectionRange(0, 99999);
    document.execCommand("copy");
    document.body.removeChild(inputTemporario);
}

function criptografar() {
    let texto = document.querySelector(".main__section__textarea__box").value;
    copyButtonClicked = false;
    console.log(copyButtonClicked);
    if (texto.trim() === "") {
        let secaoResultado = document.querySelector(".main__aside");
        secaoResultado.className = "main__aside";
        secaoResultado.innerHTML = "O campo de texto está vazio. Por favor, informe o texto que deseja criptografar.";
    } else {
        let textoCriptografado = '';
        
        for (let caractere = 0; caractere < texto.length; caractere++) {
            let caractereCriptografado = texto.charCodeAt(caractere);
            caractereCriptografado += 3;
            textoCriptografado += String.fromCharCode(caractereCriptografado);
        }
        
        let secaoResultado = document.querySelector(".main__aside");
        secaoResultado.className = "main__aside";
        secaoResultado.innerHTML = textoCriptografado;
        
        
        let botaoCopiar = document.createElement("a");
        botaoCopiar.className = "main__section__buttons__button__copy";
        botaoCopiar.innerHTML = "Copiar";
        botaoCopiar.addEventListener("click", function() {
            copiarTexto(textoCriptografado);
        });
        
        document.querySelector(".main__aside").appendChild(botaoCopiar);
        document.querySelector(".main__section__textarea__box").value = "";
        document.getElementsByClassName('main__section__buttons__button__descriptografar')[0].style.pointerEvents = 'auto';
        document.getElementsByClassName('main__section__buttons__button__criptografar')[0].style.pointerEvents = 'none';
    }
}

function descriptografar() {
    let textoTextArea = document.querySelector(".main__section__textarea__box").value;
    console.log(copyButtonClicked);
    if (textoTextArea !== '') {
        let textoDescriptografado = '';
        for (let i = 0; i < textoTextArea.length; i++) {
            let charCode = textoTextArea.charCodeAt(i);
            charCode = charCode - 3;
            textoDescriptografado += String.fromCharCode(charCode);
        }
        document.querySelector(".main__aside").textContent = textoDescriptografado;
    } else {
        navigator.clipboard.readText().then(textoCriptografado => {
            if ((textoCriptografado !== '') && (copyButtonClicked)) {
                console.log("ENTROU NA CONDICAO");
                let textoDescriptografado = '';
                for (let caractere = 0; caractere < textoCriptografado.length; caractere++) {
                    let caractereDescriptografado = textoCriptografado.charCodeAt(caractere);
                    caractereDescriptografado -= 3;
                    textoDescriptografado += String.fromCharCode(caractereDescriptografado);
                }
                document.querySelector(".main__aside").textContent = textoDescriptografado;
            } else {
                console.log("Nenhum texto criptografado encontrado.");
                document.querySelector(".main__aside").textContent = "Nenhum texto criptografado encontrado. Clique no botão COPIAR ou escreva no campo o texto criptografado.";
                document.getElementsByClassName('main__aside')[0].style.color = 'red';   
                document.getElementsByClassName('main__section__buttons__button__descriptografar')[0].style.pointerEvents = 'auto';
            }
        }).catch(error => {
            console.error('Erro ao ler texto da área de transferência:', error);
        });
    }

    document.querySelector(".main__section__textarea__box").value = "";
    document.getElementsByClassName('main__section__buttons__button__descriptografar')[0].style.pointerEvents = 'none';   
    document.getElementsByClassName('main__section__buttons__button__criptografar')[0].style.pointerEvents = 'auto';
}