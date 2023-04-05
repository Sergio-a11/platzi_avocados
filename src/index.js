/**
 * This file is just a silly example to show everything working in the browser.
 * When you're ready to start on your site, clear the file. Happy hacking!
 **/

console.log('Happy hacking :)');

const baseUrl = 'https://platzi-avo.vercel.app';

const appNode = document.querySelector('#mount_container');

//api de internacionalizacio Intl
//formato para fechas o monedas

const formatPrice = (price) => {
  let newPrice = new window.Intl.NumberFormat(navigator.language, {
    style: 'currency',
    currency: 'COP',
  }).format(price);
  return newPrice;
};

//web api
//conectarnos al servidor
window
  .fetch(`${baseUrl}/api/avo`)
  //procesar la respuesta y convertirla en JSONB
  .then((response) => response.json())
  //rederizar la info en el navegador
  .then((data) => {
    const items = [];
    //aqui en data ya tengo la data en formato JSON, ya luego entro a data
    data.data.forEach((item) => {
      //crear image
      let image = document.createElement('img');
      image.src = baseUrl.concat(item.image);
      //crear titulo
      let title = document.createElement('h2');
      title.textContent = item.name;
      //le digo que todos los elem title van a tener esta clse y haora la defino en css
      /* title.className = 'muy_grande'; */
      //o uso una importada de tailwind o bootstrap
      title.className = 'text-2xl text-red-600 text-center';
      /* title.textContent =*/
      //crear precio
      let price = document.createElement('div');
      price.className = 'text-center';
      price.textContent = formatPrice(item.price);

      //crear un contenedor que tendra todos los elementos
      let container = document.createElement('div');
      container.className = ' m-6 border-r-4 border-b-4 border-green-100';
      //agregar los elementos
      container.append(image, title, price);
      //agregar a un array para hacer una sola carga
      items.push(container);

      console.log(item.name);
    });
    //agregar todos los items a la vez en una sola carga
    appNode.append(...items);
    console.log(data);
  });
