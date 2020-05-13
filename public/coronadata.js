const Http = new XMLHttpRequest();
const url='https://corona.lmao.ninja/v2/countries';
Http.open("GET", url);
Http.send();

Http.onreadystatechange = (e) => {
  var myi = Http.responseText
  console.log(myi);
  
}




