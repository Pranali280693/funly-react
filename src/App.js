import React, { Component } from 'react';

import Routers from './Routers';

export const getFormUrlEncoded = (toConvert) => {
    const formBody = [];
    for (const property in toConvert){
      const encodedKey = encodeURIComponent(property);
      const encodedValue = encodeURIComponent(toConvert[property]);
      formBody.push(encodedKey + '=' + encodedValue);
    }
    return formBody.join('&');
}

export const apiURL = "https://dev.rlogical.com/funly/api/";

class App extends Component {
  render() {
    return (
     <Routers />
    );
  }
}

export default App;
