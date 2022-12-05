const between = (min, max) => {
  return Math.floor(Math.random() * (max - min) + min + 1);
};

class Color {
  constructor() {
    this.color = {
      rojo: between(0, 255),
      verde: between(0, 255),
      azul: between(0, 255),
    };
  }

  getColor() {
    return this.color;
  }
}

export default Color;
