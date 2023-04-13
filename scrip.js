class Validator {
    constructor() {
      this.validations = [
        'data-min-length',
        'data-max-length',
        'data-only-letters',
        'data-email-validate',
        'data-required',
        'data-equal',
        'data-password-validate',
      ]
    }  
    validate(form) {
      let currentValidations = document.querySelectorAll('form .error-validation');
      if(currentValidations.length) {
        this.cleanValidations(currentValidations);
      }
      let inputs = form.getElementsByTagName('input');
      let inputsArray = [...inputs];
      inputsArray.forEach(function(input, obj) {
        for(let i = 0; this.validations.length > i; i++) {
          if(input.getAttribute(this.validations[i]) != null) {
            let method = this.validations[i].replace("data-", "").replace("-", "");
            let value = input.getAttribute(this.validations[i])
            this[method](input,value);
          }
        }
      }, this);
    }
    minlength(input, minValue) {
      let inputLength = input.value.length;
      let errorMessage = `O campo precisa ter pelo menos ${minValue} caracteres`;
      if(inputLength < minValue) {
        this.printMessage(input, errorMessage);
      }
    }
    maxlength(input, maxValue) {
      let inputLength = input.value.length;
      let errorMessage = `O campo precisa ter menos que ${maxValue} caracteres`;
      if(inputLength > maxValue) {
        this.printMessage(input, errorMessage);
      }
    }
    onlyletters(input) {
      let re = /^[A-Za-z]+$/;;
      let inputValue = input.value;
      let errorMessage = `Este campo não aceita números nem caracteres especiais`;
      if(!re.test(inputValue)) {
        this.printMessage(input, errorMessage);
      }
    }
    emailvalidate(input) {
      let re = /\S+@\S+\.\S+/;
      let email = input.value;
      let errorMessage = `Insira um e-mail no padrão example@outlook.com`;
      if(!re.test(email)) {
        this.printMessage(input, errorMessage);
      }
    }
    equal(input, inputName) {
      let inputToCompare = document.getElementsByName(inputName)[0];
      let errorMessage = `Este campo precisa estar igual ao ${inputName}`;
      if(input.value != inputToCompare.value) {
        this.printMessage(input, errorMessage);
      }
    }
    required(input) {
     let inputValue = input.value;
      if(inputValue === '') {
        let errorMessage = `Este campo é obrigatório`;
        this.printMessage(input, errorMessage);
      }
    }
    passwordvalidate(input) {
      let charArr = input.value.split("");
      let uppercases = 0;
      let numbers = 0;
      for(let i = 0; charArr.length > i; i++) {
        if(charArr[i] === charArr[i].toUpperCase() && isNaN(parseInt(charArr[i]))) {
          uppercases++;
        } else if(!isNaN(parseInt(charArr[i]))) {
          numbers++;
        }
      }
      if(uppercases === 0 || numbers === 0) {
        let errorMessage = `A senha precisa um caractere maiúsculo e um número`;
  
        this.printMessage(input, errorMessage);
      }
    }
    printMessage(input, msg) {
      let errorsQty = input.parentNode.querySelector('.error-validation');
      if(errorsQty === null) {
        let template = document.querySelector('.error-validation').cloneNode(true);
        template.textContent = msg;
        let inputParent = input.parentNode;
        template.classList.remove('template');
        inputParent.appendChild(template);
      }
    }
      cleanValidations(validations) {
        validations.forEach(el => el.remove());
      }
    }
    let form = document.getElementById('register-form');
    let submit = document.getElementById('btn-submit');

submit.addEventListener('click', function(e) {
  e.preventDefault();

  // Coletar os dados do formulário
  let email = document.getElementById('email').value;
  let name = document.getElementById('name').value;
  let lastname = document.getElementById('lastname').value;

  // Criar uma instância do Validator
  let validator = new Validator();

  // Chamar o método validate() para realizar a validação
  validator.validate(form);
    
      // Gerar número de sorteio aleatório entre 10 e 99999
      let numeroSorteio = Math.floor(Math.random() * (99999 - 10 + 1)) + 10;
    
      // Enviar uma solicitação para a API da Mailgun
fetch('https://api.mailgun.net/v3/Dads/messages', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Basic ${btoa('api:<2b9835d10b88f1fa5f75f613237753c1-2cc48b29-0a3ccaa6>')}`
  },
  body: JSON.stringify({
    from: 'noreply@<dads>',
    to: email,
    subject: 'Sorteio',
    text: `Parabéns ${name} ${lastname}, seu cadastro foi um sucesso! O seu número do sorteio é: ${numeroSorteio}`
  })
})
.then(response => response.text())
.then(result => console.log(result))
.catch(error => console.error(error));
    });
