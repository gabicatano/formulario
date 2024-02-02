export async function salvarDados() {
    let nome = document.getElementById('floatingNome').value;
    let email = document.getElementById('floatingEmail').value;
    let cep = document.getElementById('floatingCEP').value;
    let rua = document.getElementById('floatingRua').value;
    let numero = document.getElementById('floatingNumero').value;
    let bairro = document.getElementById('floatingBairro').value;
    let cidade = document.getElementById('floatingCidade').value;
    let estado = document.getElementById('floatingEstado').value;
    let complemento = document.getElementById('floatingComplemento').value;
  
    await fetch('http://localhost:3000/usuarios', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        nome: nome,
        email: email,
        cep: cep,
        rua: rua,
        numero: numero,
        complemento: complemento,
        bairro: bairro,
        cidade: cidade,
        estado: estado
      })
    })
    .then(response => response.json())
    .then(data => {
      window.location.href = '../dados-salvos.html';
    })
    .catch(error => {
      console.error('Erro ao enviar dados para o JSON Server:', error);
      // alert('Ops! Seus dados não foram salvos, verifique a conexão e envie novamente!');
    });
  }


