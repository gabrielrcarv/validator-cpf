$(document).ready(function () {
  $("#cpf").inputmask("999.999.999-99");
});

function validaCPF() {
  const cpfFormatado = document.getElementById("cpf").value;
  const cpf = limpaFormatacao(cpfFormatado);

  if (cpf.length !== 11) {
    mostraResultado("CPF deve conter 11 dígitos.", "red");
    document.getElementById("cpf").value = "";
    return;
  }

  if (verificaDigitosRepetidos(cpf)) {
    mostraResultado("CPF não pode conter repetição do 1º dígito.", "red");
    document.getElementById("cpf").value = "";
    return;
  }

  const digito1 = calcularDigitoVerificador(cpf, 1);
  const digito2 = calcularDigitoVerificador(cpf, 2);

  if (digito1 && digito2) {
    mostraResultado(`O CPF ${cpfFormatado} é válido.`, "green");
  }else {
      mostraResultado(`O CPF ${cpfFormatado} é inválido`, "red");
    }
  }

function calcularDigitoVerificador(cpf, posicao) {
  const sequencia = cpf.slice(0, 8 + posicao).split("");
  let soma = 0;
  let multiplicador = 9 + posicao;

  for (const numero of sequencia) {
    soma += multiplicador * Number(numero);
    multiplicador--;
  }

  const restoDivisao = (soma * 10) % 11;
  const digito = cpf.slice(8 + posicao, 9 + posicao);

  return restoDivisao == digito;
}

function limpaFormatacao(cpf) {
  cpf = cpf.replace(/\D/g, "");
  return cpf;
}

function mostraResultado(texto, cor) {
  const span = document.getElementById("resultado");
  span.innerHTML = texto;
  span.style.color = cor;
}

function verificaDigitosRepetidos(cpf) {
  return cpf.split("").every((d) => d === cpf[0]);
}
