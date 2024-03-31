const pickupLines = [
  "Are you a magician? Because whenever I look at you, everyone else disappears!",
  "Do you have a name, or can I call you mine?",
  "Is your name Google? Because you have everything I've been searching for.",
  "Are you made of copper and tellurium? Because you're Cu-Te!",
  "Are you French? Because Eiffel for you!",
  "Do you believe in love at first sight, or should I walk by again?",
  "Is your name Wi-Fi? Because I'm really feeling a connection.",
  "Do you have a map? Because I just got lost in your eyes.",
  "Are you a parking ticket? Because you've got FINE written all over you.",
];

const pickupButton = document.getElementById('pickupButton');
const pickupLine = document.getElementById('pickupLine');

pickupButton.addEventListener('click', () => {
  const randomIndex = Math.floor(Math.random() * pickupLines.length);
  pickupLine.textContent = pickupLines[randomIndex];
});