// Utilizo el puerto de escucha 8080 para desarrollo y process.env.PORT para producción en glitch.com
const PORT: number | string = process.env.PORT || 8080;

// Variable booleana para indicar si el usuario es o no un Administrador
const isAdmin: boolean = false;

export { PORT, isAdmin };
