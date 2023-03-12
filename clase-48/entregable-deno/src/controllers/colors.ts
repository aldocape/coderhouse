import { Context } from '../../deps.ts';

// Inicializo array de colores
const colors: string[] = [];

// Endpoint: http://localhost:8080/colors, método: GET
export const getColors = async (ctx: Context) => {
  const { response } = ctx;

  try {
    await ctx.render('index.eta', { colors }); //Show view
  } catch (err) {
    response.status = 500;
    response.body = {
      success: false,
      msg: err.toString(),
    };
  }
};

// Endpoint: http://localhost:8080/colors, método: POST
export const addColor = async (ctx: Context) => {
  const { response, request } = ctx;
  try {
    const color = await request.body().value;

    // Pregunto si el 'post' viene desde Postman, o desde el Form
    // En el primer caso, request.body().value contendrá el objeto 'limpio'
    // Ejemplo:
    // {
    //   "color": "blue"
    // }

    // Pregunto si es un objeto con la propiedad "color"
    // deno-lint-ignore no-prototype-builtins
    if (color.hasOwnProperty('color')) {
      // Verifico que el campo no venga vacío
      if (color.color != '') colors.push(color.color);
    } else {
      // En el segundo caso, si no vengo desde postman, entonces vengo del submit del form
      // con la info en formato multipart/form-data
      // y hay que acceder a los values del formulario, por medio de 'forEach'

      // deno-lint-ignore no-explicit-any
      color.forEach((element: any) => {
        // Verifico que el input del form no venga vacío
        if (element != '') colors.push(element);
      });
    }

    // Renderizo la vista con el array de colores actualizado
    await ctx.render('index.eta', { colors }); //Show view
    // ctx.response.body = colors;
  } catch (err) {
    response.status = 500;
    response.body = {
      success: false,
      msg: err.toString(),
    };
  }
};
