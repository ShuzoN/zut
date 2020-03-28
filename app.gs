function doGet(e) {
  const template = 'index';
  return HtmlService.createTemplateFromFile(template).evaluate();
}

function doPost(e) {
  
  const shibuya_id = 13113;
  const z = UrlFetchApp.fetch('https://zutool.jp/api/getweatherstatus/' + shibuya_id);
  const json = JSON.parse(z);
  
  const lines = json.today.map(function(h) {
    if( h.time < 8 || h.time > 20) {
      return;
    }
  const line = h.time+"時" + "    " +
      getWeatherIcon(h.weather)+ "    " +
      h.temp+"℃"+ "    " +
      h.pressure +"hPa"+ "    " +
      "気圧警戒:" + getPressureLevelIcon(h.pressure_level)
    ;

    
    return line;
  }).filter(v=>v);
  

  var res = ContentService.createTextOutput();

  //Mime TypeをJSONに設定
  res.setMimeType(ContentService.MimeType.JSON);

  //JSONテキストをセットする
  res.setContent(lines.join("\n"));

  return res;
}

function getWeatherIcon(weatherType) {
  if (weatherType === '100') {
    return ':sunny:'; 
  }
  if (weatherType === '200') {
    return ':cloud:'; 
  }
  if (weatherType === '300') {
    return ':umbrella:';
  }
  
  return ':innocent:';
}

function getPressureLevelIcon(pressureLevelType) {
  if (pressureLevelType === '0') {
    return ':ok:'; 
  }
  if (pressureLevelType === '1') {
    return ':ok:'; 
  }
  if (pressureLevelType === '2') {
    return ':arrow_heading_down: '; 
  }
  if (pressureLevelType === '3') {
    return ':warning: ';
  }
  if (pressureLevelType === '4') {
    return ':bomb:';
  }
  
  return ':innocent:';
}
