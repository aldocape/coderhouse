const chatForm = document.getElementById('chat-form');
const chatMessages = document.querySelector('.chat-messages');

// Obtengo username y sala desde la URL
const { username, room } = Qs.parse(location.search, {
  ignoreQueryPrefix: true,
});

// Hago focus en el input del formulario de chat apenas carga la página
document.getElementById('msg').focus();

const socket = io();

// Entrar a una sala
socket.emit('joinRoom', { username, room });

// Obtener sala y usuarios de esa sala
socket.on('roomUsers', ({ room, users }) => {
  outputRoomName(room);
  outputUsers(users);
});

// Recibo un mensaje (chat) desde el server
socket.on('eventMessage', (message) => {
  console.log(message);
  ouputMessage(message);

  // Para scrollear hacia abajo y ver el mensaje recibido
  chatMessages.scrollTop = chatMessages.scrollHeight;
});

// Mensaje submit
chatForm.addEventListener('submit', (event) => {
  event.preventDefault();

  // Obtiene el texto del campo mensaje del formulario de chat
  const msg = event.target.elements.msg.value;

  // Emite un mensaje al server
  socket.emit('chatMessage', msg);

  // Limpio el input
  event.target.elements.msg.value = '';
  event.target.elements.msg.focus();
});

// Muestro el mensaje de chat en el DOM
function ouputMessage(message) {
  const div = document.createElement('div');
  div.classList.add('message');
  const p1 = document.createElement('p');
  p1.classList.add('meta');
  p1.innerHTML = `${message.username} <span>${message.time}</span>`;
  const p2 = document.createElement('p');
  p2.classList.add('text');
  p2.innerHTML = message.text;

  div.appendChild(p1);
  div.appendChild(p2);
  //   div.innerHTML = `<p class="meta">Brad <span>9:12pm</span></p>
  //   <p class="text">${message}</p>`;
  document.querySelector('.chat-messages').appendChild(div);
}

// Agrego nombre de la sala al DOM
function outputRoomName(room) {
  const h2RoomName = document.getElementById('room-name');
  h2RoomName.innerText = room;
}

function outputUsers(users) {
  const usersList = document.getElementById('users');
  let list = '';
  users.forEach((user) => {
    // const li = document.createElement('li');
    list += `<li>${user.username}</li>`;
    // usersList.appendChild(li);
  });
  usersList.innerHTML = list;
}
