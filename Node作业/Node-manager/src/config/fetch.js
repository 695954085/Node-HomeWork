const axios = require('axios');

export const fetch = async (url = '', data = {}, type = 'GET', method = 'fetch') => {
  type = type.toUpperCase();
  //url = 'http://localhost:3000' + url;
  if (type == 'GET') {
    try {
      var listItems = await axios.get(url);
      return listItems;
    } catch (e) {
       throw e;
    }
  }else if(type == 'POST'){
    try{
      // var axios.post(url,data)
    }catch(e){
      throw e;
    }
  }
}

// axios.get('/user?ID=12345')
//   .then(function (response) {
//     console.log(response);
//   })
//   .catch(function (error) {
//     console.log(error);
//   });
