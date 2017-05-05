export const FormErrorMessages = {

  'required': (field) => {return (field + ': obrigatório')},
  'invalid': (field) => {return (field + ': inválido')},
  'minlength': (field, value) => {return (field + ': mínimo ' + value + ' caracteres')},
  'maxlength': (field, value) => {return (field + ': máximo ' + value + ' caracteres')},
  'exactLength': (field, value) => {return (field + ': deve conter ' + value + ' caracteres')},
  'pattern': {
    'onlyNumbers': (field) => {return (field + ': apenas números')},
    'onlyLetters': (field) => {return (field + ': apenas letras')},
    'month': (field) => {return (field + ': de 01 a 12')},
  },
  'passwordsMatch': () => {return ('As senhas não são iguais')},
}
