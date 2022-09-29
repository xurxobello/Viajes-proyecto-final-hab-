// en este archivo vamos a crear todas las funciones asíncronas que se encarguen de la comunicación con la base de datos

export const registerUserService = async ({
  name,
  email,
  password,
  nick,
  about_me,
}) => {
  const response = await fetch(
    `${process.env.REACT_APP_BACKEND}/api/accounts`,
    {
      //aqui vamos a enviar datos al servidor,hacemos un fetch a la direccion,y despues le tenemos que mandar el metodo y el tipo de dato que le mandamos,a continuacion postman no recibe objetos por eso pasamos a texto con stringify
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password, nick, about_me }),
    }
  );
  const json = await response.json();
  //pendiente de meterle un error si no deja crearla
};

export const loginUserService = async ({ email, password }) => {
  const response = await fetch(`${process.env.REACT_APP_BACKEND}/api/auth`, {
    //aqui vamos a enviar datos al servidor,hacemos un fetch a la direccion,y despues le tenemos que mandar el metodo y el tipo de dato que le mandamos,a continuacion postman no recibe objetos por eso pasamos a texto con stringify
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });
  const json = await response.json();
  //pendiente de meterle un error si no deja crearla
  return json.accessToken;
};

export const getMyUserDataService = async ({ token }) => {
  //peticion a la bd para detalles del usuario-->id,nick email...
  const response = await fetch(
    `${process.env.REACT_APP_BACKEND}/api/users/detail`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const json = await response.json();

  return json.data;
};

// esta función se encarga de la petición mediante fetch a la base de datos para obtener las recomendaciones creadas
export const getAllRecommendationsService = async () => {
  const response = await fetch(
    `${process.env.REACT_APP_BACKEND}/api/recommendations`
  );
  // gestionamos la respuesta de la base de datos transformándola a json
  const json = await response.json();

  // gestionamos que debemos hacer en caso de que vuelva un error
  if (!response.ok) {
    throw new Error(json.message);
  }
  // en caso de que no haya error obtenemos los datos que necesitamos
  // OJO!!! necesito recuperar más cosas de abajo!!!
  return json.data.recommendations;
};

// esta función se encarga de la petición mediante fetch a la base de datos para obtener la recomendación solicitada
export const getSingleRecommendationService = async (id) => {
  const response = await fetch(
    `${process.env.REACT_APP_BACKEND}/api/recommendations/${id}`
  );

  // gestionamos la respuesta de la base de datos transformándola a json
  const json = await response.json();

  // gestionamos que debemos hacer en caso de que vuelva un error
  if (!response.ok) {
    throw new Error(json.message);
  }
  // en caso de que no haya error obtenemos los datos que necesitamos
  console.log(json.data);
  return json.data;
};

// creamos un servicio que se encargará del envío del formulario de las recomendaciones en el que necesitaremos los datos del formulario (data) y también el token
export const sendRecommendationService = async ({ data, token }) => {
  const response = await fetch(
    // indicamos la ruta a la que debe hacer la petición
    `${process.env.REACT_APP_BACKEND}/api/recommendations`,
    {
      // definimos el método que en este caso es POST
      method: "POST",
      // en el body, al enviar un form-data, no tenemos que procesar de ninguna forma, sino que le pasamos directamente data que contiene los datos del formulario
      body: data,
      // en headers necesitamos enviar el token, al gestionarlo en Backend con la palabra Bearer delante, lo enciamos de la siguiente manera
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  // gestionamos la respuesta de la base de datos transformándola a json
  const json = await response.json();

  // gestionamos que debemos hacer en caso de que vuelva un error
  if (!response.ok) {
    throw new Error(json.message);
  }
  return json;
};
export const commentUserService = async ({ content, id, token }) => {
  const response = await fetch(
    `${process.env.REACT_APP_BACKEND}/api/recommendations/${id}/comments`,
    {
      //aqui vamos a enviar datos al servidor,hacemos un fetch a la direccion,y despues le tenemos que mandar el metodo y el tipo de dato que le mandamos,a continuacion postman no recibe objetos por eso pasamos a texto con stringify
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ content }),
    }
  );
  const json = await response.json();
  //pendiente de meterle un error si no deja crearla
};
export const getAllCommentsService = async ({ id }) => {
  //peticion a la bd para detalles del usuario-->id,nick email...
  const response = await fetch(
    `${process.env.REACT_APP_BACKEND}/api/recommendation/${id}/allcomments`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const json = await response.json();
  return json.data;
};

export const getBuscadorService = async (buscador) => {
  //peticion a la bd para detalles del usuario-->id,nick email...
  const response = await fetch(
    `${process.env.REACT_APP_BACKEND}/api/recommendations?filter=${buscador}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const json = await response.json();

  return json.data;
};
export const likeService = async ({ token, id }) => {
  const response = await fetch(
    `${process.env.REACT_APP_BACKEND}/api/recommendations/${id}/likes`,
    {
      //aqui vamos a enviar datos al servidor,hacemos un fetch a la direccion,y despues le tenemos que mandar el metodo y el tipo de dato que le mandamos,a continuacion postman no recibe objetos por eso pasamos a texto con stringify
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const json = await response.json();
  //pendiente de meterle un error si no deja crearla
};

export const dislikeService = async ({ token, id }) => {
  const response = await fetch(
    `${process.env.REACT_APP_BACKEND}/api/recommendations/${id}/likes`,
    {
      //aqui vamos a enviar datos al servidor,hacemos un fetch a la direccion,y despues le tenemos que mandar el metodo y el tipo de dato que le mandamos,a continuacion postman no recibe objetos por eso pasamos a texto con stringify
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const json = await response.json();
  //pendiente de meterle un error si no deja crearla
};

// esta función se encarga de la petición mediante fetch a la base de datos para obtener las recomendaciones creadas
export const getMoreLikesRecommendationsService = async () => {
  const response = await fetch(
    `${process.env.REACT_APP_BACKEND}/api/recommendation/top10`
  );
  // gestionamos la respuesta de la base de datos transformándola a json
  const json = await response.json();

  // gestionamos que debemos hacer en caso de que vuelva un error
  if (!response.ok) {
    throw new Error(json.message);
  }
  // en caso de que no haya error obtenemos los datos que necesitamos
  // OJO!!! necesito recuperar más cosas de abajo!!!
  console.log(json.data);
  return json.data;
};
