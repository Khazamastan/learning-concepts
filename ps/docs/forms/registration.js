const form = document.getElementById('registration');
const output = document.getElementById('output');

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const formData = new FormData(form);
  const entries = Array.from(formData.entries());
  const record = entries.reduce((acc, [key, value]) => {
    acc[key] = value;
    return acc;
  }, {});

  output.textContent = JSON.stringify(record, null, 2);
  alert('Form Submitted Successfully');
});
