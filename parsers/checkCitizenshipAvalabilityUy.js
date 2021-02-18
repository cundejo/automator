const cheerio = require('cheerio');
const querystring = require('querystring');
const axios = require('../utils/axios');
const slack = require('../utils/slack');
const common = require('../utils/common');

const URL = 'https://sae.corteelectoral.gub.uy/sae/agendarReserva/Paso1.xhtml';

const checkAvailability = async () => {
  const response1 = await axios.get(`${URL}?e=1&a=1&r=1`);
  if (response1.status === 200) {
    const setCookieHeader = response1.headers['set-cookie'][0];
    const sessionIdString = setCookieHeader.split(';')[0].split('=')[1];
    const html1 = response1.data;
    // console.log("------- HTML -------");
    const $ch1 = cheerio.load(html1);
    const viewState = $ch1('input[name="javax.faces.ViewState"]').attr('value');
    // console.log(viewState);

    await common.sleep(1000);

    // SEND by post this form data
    const data = querystring.stringify({
      form: 'form',
      'form:e': 1,
      'form:a': 1,
      'form:recursoId': 1,
      'form:botonElegirHora': 'Elegir día y hora ▶',
      'javax.faces.ViewState': viewState,
    });

    const config = {
      headers: {
        Accept:
          'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
        'Content-Type': 'application/x-www-form-urlencoded',
        Cookie: `JSESSIONID=${sessionIdString}; _ga=GA1.3.1351659378.1597261568; _gid=GA1.3.2117986852.1604331297`,
        Host: 'sae.corteelectoral.gub.uy',
        Origin: 'https://sae.corteelectoral.gub.uy',
        Referer: 'https://sae.corteelectoral.gub.uy/sae/agendarReserva/Paso1.xhtml',
      },
    };
    const response2 = await axios.post(URL, data, config);
    const html2 = response2.data;
    const $ch2 = cheerio.load(html2);
    if ($ch2.text().includes('En la oficina seleccionada no hay cupos disponibles')) {
      console.log('No hay cupos');
      return;
    }

    console.log('HAY CUPOS DISPONIBLES');

    await slack.postNotification(`@Oliver HAY CUPOS DISPONIBLES \n${URL}`);
  }
};

module.exports = checkAvailability;
