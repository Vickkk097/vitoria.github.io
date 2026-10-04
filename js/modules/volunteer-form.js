import { getVolunteerRecords, saveVolunteer } from './storage.js';

const digitsOnly = (value) => value.replace(/\D/g, '');

function applyMask(type, value) {
  const digits = digitsOnly(value);
  if (type === 'cpf') {
    return digits.slice(0, 11).replace(/^(\d{3})(\d)/, '$1.$2').replace(/^(\d{3})\.(\d{3})(\d)/, '$1.$2.$3').replace(/(\d{3})(\d{1,2})$/, '$1-$2');
  }
  if (type === 'cep') {
    const cep = digits.slice(0, 8);
    return cep.length > 5 ? `${cep.slice(0, 5)}-${cep.slice(5)}` : cep;
  }
  if (type === 'telefone') {
    const phone = digits.slice(0, 11);
    if (phone.length < 3) return phone ? `(${phone}` : '';
    const ddd = phone.slice(0, 2);
    const number = phone.slice(2);
    if (number.length <= 4) return `(${ddd}) ${number}`;
    return phone.length <= 10 ? `(${ddd}) ${number.slice(0, 4)}-${number.slice(4)}` : `(${ddd}) ${number.slice(0, 5)}-${number.slice(5)}`;
  }
  return value;
}

function validCpf(value) {
  const digits = digitsOnly(value);
  if (digits.length !== 11 || /^(\d)\1{10}$/.test(digits)) return false;
  const check = (length) => {
    const sum = [...digits.slice(0, length)].reduce((total, digit, index) => total + Number(digit) * (length + 1 - index), 0);
    return (sum * 10) % 11 % 10;
  };
  return Number(digits[9]) === check(9) && Number(digits[10]) === check(10);
}

export function initVolunteerForm(root = document) {
  const form = root.querySelector('#volunteer-form');
  if (!form) return;
  const feedback = form.querySelector('#form-feedback');
  const submitButton = form.querySelector('.submit-button');
  const savedHistory = form.querySelector('#saved-history');
  const savedRecords = getVolunteerRecords();
  if (savedHistory && savedRecords.length) {
    savedHistory.hidden = false;
    savedHistory.textContent = `Há ${savedRecords.length} cadastro${savedRecords.length === 1 ? '' : 's'} salvo${savedRecords.length === 1 ? '' : 's'} neste navegador. Os dados pessoais não são reapresentados automaticamente.`;
  }

  form.querySelectorAll('[data-mask]').forEach((field) => {
    const validate = () => {
      const digits = digitsOnly(field.value);
      let message = '';
      if (field.dataset.mask === 'cpf' && !digits.length && field.dataset.touched === 'true') message = 'Informe seu CPF com 11 números.';
      if (field.dataset.mask === 'cpf' && digits.length && !validCpf(field.value)) message = 'Confira o CPF e os dígitos verificadores.';
      if (field.dataset.mask === 'telefone' && !digits.length && field.dataset.touched === 'true') message = 'Informe seu celular com DDD.';
      if (field.dataset.mask === 'telefone' && digits.length && (![10, 11].includes(digits.length) || Number(digits.slice(0, 2)) < 11 || /^([0-9])\1+$/.test(digits))) message = 'Confira o DDD e informe um telefone com 10 ou 11 números.';
      if (field.dataset.mask === 'cep' && !digits.length && field.dataset.touched === 'true') message = 'Informe seu CEP com 8 números.';
      if (field.dataset.mask === 'cep' && digits.length && (digits.length !== 8 || /^([0-9])\1{7}$/.test(digits))) message = 'Confira o CEP: ele precisa ter 8 números válidos.';
      field.setCustomValidity(message);
      const error = root.querySelector(`#${field.id}-error`);
      const shouldShow = field.dataset.touched === 'true' && Boolean(message);
      if (shouldShow) {
        field.setAttribute('aria-invalid', 'true');
        if (error) error.textContent = message;
      } else {
        field.removeAttribute('aria-invalid');
        if (error) error.textContent = '';
      }
      return message;
    };
    field.addEventListener('input', () => {
      field.value = applyMask(field.dataset.mask, field.value);
      validate();
    });
    field.addEventListener('blur', () => {
      field.dataset.touched = 'true';
      validate();
    });
    field.addEventListener('invalid', () => {
      field.dataset.touched = 'true';
      validate();
      field.setAttribute('aria-invalid', 'true');
    });
  });

  const message = form.querySelector('#mensagem');
  const count = form.querySelector('#message-count');
  if (message && count) message.addEventListener('input', () => { count.textContent = String(message.value.length); });

  const showFeedback = (text, isError = false, shouldFocus = false) => {
    if (!feedback) return;
    feedback.hidden = false;
    feedback.classList.toggle('is-error', isError);
    feedback.textContent = text;
    if (shouldFocus) feedback.focus();
  };

  form.addEventListener('invalid', () => showFeedback('Confira os campos destacados antes de enviar o cadastro.', true), true);
  form.addEventListener('input', () => {
    if (feedback) feedback.hidden = true;
    if (submitButton?.disabled) submitButton.disabled = false;
  });
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!form.reportValidity()) {
      showFeedback('Confira os campos destacados antes de enviar o cadastro.', true);
      return;
    }

    const data = Object.fromEntries(new FormData(form).entries());
    delete data.cpf; // CPF não fica salvo no navegador neste protótipo.
    delete data.consentimento;
    const stored = saveVolunteer(data);
    if (!stored) {
      showFeedback('Não foi possível salvar neste navegador. Verifique o espaço disponível ou as permissões.', true);
      return;
    }
    showFeedback('Cadastro validado e salvo neste navegador. Seus dados não foram enviados para um servidor.', false, true);
    if (submitButton) submitButton.disabled = true;
  });
}
