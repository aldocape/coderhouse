const users = [];

// Unir al usuario a un chat
function userJoin(id, username, room) {
  const user = { id, username, room };

  users.push(user);

  return user;
}

// Obtener usuario actual
function getCurrentUser(id) {
  return users.find((user) => user.id === id);
}

// Un usuario deja el chat
function userLeave(id) {
  const index = users.findIndex((user) => user.id === id);

  if (index !== -1) {
    return users.splice(index, 1)[0];
  }
}

// Obtener salas de usuarios
function getRoomUsers(room) {
  return users.filter((user) => user.room === room);
}

module.exports = {
  userJoin,
  getCurrentUser,
  userLeave,
  getRoomUsers,
};
