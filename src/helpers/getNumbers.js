const getNumbers = () => {
  const element = [];
  for (let i = 1; i <= 126; i++) {
    element.push(i); // ✅ Agrega correctamente cada número al array
  }

  return element; // ✅ Devuelve el array para que pueda usarse
};

export default getNumbers;
