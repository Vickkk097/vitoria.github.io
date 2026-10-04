(() => {
  const form = document.querySelector('#volunteer-form');
  if (!form) return;

  const onlyDigits = (value) => value.replace(/\D/g, '');
  const masks = {
    cpf(digits) {
      const value = digits.slice(0, 11);
      return value
        .replace(/^(\d{3})(\d)/, '$1.$2')
        .replace(/^(\d{3})\.(\d{3})(\d)/, '$1.$2.$3')
        .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    },
    telefone(digits) {
      const value = digits.slice(0, 11);
      if (value.length < 3) return value ? `(${value}` : '';
      const areaCode = value.slice(0, 2);
      const subscriber = value.slice(2);
      if (subscriber.length <= 4) return `(${areaCode}) ${subscriber}`;
      if (value.length <= 10) return `(${areaCode}) ${subscriber.slice(0, 4)}-${subscriber.slice(4)}`;
      return `(${areaCode}) ${subscriber.slice(0, 5)}-${subscriber.slice(5)}`;
    },
    cep(digits) {
      const value = digits.slice(0, 8);
      return value.length > 5 ? `${value.slice(0, 5)}-${value.slice(5)}` : value;
    },
  };

  const cpfIsValid = (digits) => {
    if (digits.length !== 11 || /^([0-9])\1{10}$/.test(digits)) return false;
    const numbers = [...digits].map(Number);
    const firstSum = numbers.slice(0, 9).reduce((sum, digit, index) => sum + digit * (10 - index), 0);
    const firstCheck = (firstSum * 10) % 11 % 10;
    const secondSum = numbers.slice(0, 10).reduce((sum, digit, index) => sum + digit * (11 - index), 0);
    const secondCheck = (secondSum * 10) % 11 % 10;
    return numbers[9] === firstCheck && numbers[10] === secondCheck;
  };

  const validationMessage = (field) => {
    const digits = onlyDigits(field.value);
    switch (field.dataset.mask) {
      case 'cpf':
        if (!digits.length) return 'Informe seu CPF com 11 números.';
        if (digits.length !== 11) return 'O CPF precisa ter 11 números.';
        if (!cpfIsValid(digits)) return 'Confira o CPF: os dígitos verificadores não são válidos.';
        return '';
      case 'telefone':
        if (!digits.length) return 'Informe seu celular com DDD.';
        if (digits.length !== 10 && digits.length !== 11) return 'Informe DDD e telefone com 10 ou 11 números.';
        if (/^([0-9])\1+$/.test(digits) || Number(digits.slice(0, 2)) < 11 || Number(digits.slice(0, 2)) > 99) {
          return 'Confira o DDD e o número do celular.';
        }
        return '';
      case 'cep':
        if (!digits.length) return 'Informe seu CEP com 8 números.';
        if (digits.length !== 8) return 'O CEP precisa ter 8 números.';
        if (/^([0-9])\1{7}$/.test(digits)) return 'Confira o CEP informado.';
        return '';
      default:
        return '';
    }
  };

  const renderError = (field, { show = false } = {}) => {
    const message = validationMessage(field);
    field.setCustomValidity(message);
    const error = document.querySelector(`#${field.id}-error`);
    const isComplete = field.dataset.mask === 'cpf'
      ? onlyDigits(field.value).length === 11
      : field.dataset.mask === 'telefone'
        ? [10, 11].includes(onlyDigits(field.value).length)
        : field.dataset.mask === 'cep'
          ? onlyDigits(field.value).length === 8
          : false;
    const shouldShow = show || (isComplete && !!message);

    if (shouldShow && message) {
      field.setAttribute('aria-invalid', 'true');
      if (error) error.textContent = message;
    } else {
      field.removeAttribute('aria-invalid');
      if (error) error.textContent = '';
    }
  };

  form.querySelectorAll('[data-mask]').forEach((field) => {
    const mask = masks[field.dataset.mask];
    const applyMask = () => {
      field.value = mask(onlyDigits(field.value));
      renderError(field);
    };

    field.addEventListener('input', applyMask);
    field.addEventListener('blur', () => renderError(field, { show: field.value.length > 0 }));
    field.addEventListener('invalid', () => renderError(field, { show: true }));
    field.addEventListener('paste', () => requestAnimationFrame(applyMask));
  });

  const messageBox = document.querySelector('#mensagem');
  const messageCount = document.querySelector('#message-count');
  if (messageBox && messageCount) {
    messageBox.addEventListener('input', () => {
      messageCount.textContent = String(messageBox.value.length);
    });
  }

  const feedback = document.querySelector('#form-feedback');
  const submitButton = form.querySelector('.submit-button');

  const showErrorFeedback = () => {
    if (!feedback) return;
    feedback.hidden = false;
    feedback.classList.add('is-error');
    feedback.textContent = 'Confira os campos destacados antes de enviar o cadastro.';
  };

  // O evento invalid não propaga; a captura permite anunciar o erro no formulário.
  form.addEventListener('invalid', showErrorFeedback, true);
  form.addEventListener('input', () => {
    if (feedback) {
      feedback.hidden = true;
      feedback.classList.remove('is-error');
    }
    if (submitButton?.disabled) {
      submitButton.disabled = false;
      const label = [...submitButton.childNodes].find((node) => node.nodeType === Node.TEXT_NODE);
      if (label) label.textContent = 'Enviar meu cadastro ';
    }
  });

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!form.checkValidity()) {
      showErrorFeedback();
      form.reportValidity();
      return;
    }

    if (feedback) {
      feedback.hidden = false;
      feedback.classList.remove('is-error');
      feedback.textContent = 'Tudo certo: seus dados passaram pelas validações. Esta demonstração ainda não está conectada a um sistema de cadastro, então seus dados não foram enviados nem armazenados.';
      feedback.focus();
    }
    if (submitButton) {
      submitButton.disabled = true;
      const label = [...submitButton.childNodes].find((node) => node.nodeType === Node.TEXT_NODE);
      if (label) label.textContent = 'Cadastro validado ';
    }
  });
})();
