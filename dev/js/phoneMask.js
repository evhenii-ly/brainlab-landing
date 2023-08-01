export const phoneMaskInit = () => {
  document.querySelectorAll('.form__field--phone').forEach((input) => {
    let keyCode;
    const mask = (event) => {
      event.keyCode && (keyCode = event.keyCode);
      let pos = input.selectionStart;
      if (pos < 3) event.preventDefault();
      let matrix = '+38(___) ___ __ __',
        i = 0,
        def = matrix.replace(/\D/g, ''),
        val = input.value.replace(/\D/g, ''),
        newValue = matrix.replace(/[_\d]/g, (a) => (i < val.length ? val.charAt(i++) || def.charAt(i) : a));
      i = newValue.indexOf('_');
      if (i !== -1) {
        i < 5 && (i = 3);
        newValue = newValue.slice(0, i);
      }
      let reg = matrix.substr(0, input.value.length).replace(/_+/g, (a) => `\\d{1,${a.length}}`).replace(/[+()]/g, '\\$&');
      reg = new RegExp(`^${reg}$`);
      if (!reg.test(input.value) || input.value.length < 5 || (keyCode > 47 && keyCode < 58)) {
        input.value = newValue;
      }
      if (event.type === 'blur' && input.value.length < 5) {
        input.value = '';
      }
    };

    input.addEventListener('input', mask, false);
    input.addEventListener('focus', mask, false);
    input.addEventListener('blur', mask, false);
    input.addEventListener('keydown', mask, false);
    input.addEventListener('mouseup', (event) => {
      event.preventDefault();
      if (input.value.length < 4) {
        input.setSelectionRange(4, 4);
      } else {
        input.setSelectionRange(input.value.length, input.value.length);
      }
    });
  });
};

export default phoneMaskInit;
