const axios = require('axios');
const https = require('https');
var qs = require('qs');

class YFinance {
  constructor(ticker) {
    this.yahooTicker = ticker;
    this.userAgent =
      'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36';
  }

  toString() {
    return this.yahooTicker;
  }

  _getYahooCookie() {
    return new Promise((resolve, reject) => {
      const options = {
        hostname: 'fc.yahoo.com',
        path: '/',
        method: 'GET',
        headers: {
          'User-Agent': this.userAgent,
        },
      };

      const req = https.request(options, (res) => {
        let cookies = res.headers['set-cookie'];
        if (!cookies) {
          return reject(new Error('Failed to obtain Yahoo auth cookie.'));
        }

        let cookie = cookies[0].split(';')[0];
        resolve(cookie);
      });

      req.on('error', (error) => {
        reject(error);
      });

      req.end();
    });
  }

  async _getYahooCrumb(cookie) {
    try {
      const crumbResponse = await axios.get(
        'https://query1.finance.yahoo.com/v1/test/getcrumb',
        {
          headers: {
            'User-Agent': this.userAgent,
            'Cookie': cookie,
          },
        }
      );

      return crumbResponse.data;
    } catch (error) {
      throw new Error('Failed to retrieve Yahoo crumb.');
    }
  }

  async getInfo() {
    const cookie = await this._getYahooCookie();
    const crumb = await this._getYahooCrumb(cookie);

    const yahooModules =
      'financialData,quoteType,defaultKeyStatistics,assetProfile,summaryDetail';

    const url = `https://query1.finance.yahoo.com/v10/finance/quoteSummary/${
      this.yahooTicker
    }?${qs.stringify({
      modules: yahooModules,
      ssl: true,
      crumb: crumb,
    })}`;

    try {
      const infoResponse = await axios.get(url, {
        headers: {
          'User-Agent': this.userAgent,
          'Cookie': cookie,
        },
      });

      const info = infoResponse.data.quoteSummary.result[0];
      const ret = {};

      for (const mainKeys in info) {
        for (const key in info[mainKeys]) {
          if (
            typeof info[mainKeys][key] === 'object' &&
            info[mainKeys][key] !== null
          ) {
            ret[key] = info[mainKeys][key].raw || info[mainKeys][key];
          } else {
            ret[key] = info[mainKeys][key];
          }
        }
      }

      return ret;
    } catch (error) {
      throw new Error('Failed to retrieve information.');
    }
  }
}
module.exports = YFinance;
