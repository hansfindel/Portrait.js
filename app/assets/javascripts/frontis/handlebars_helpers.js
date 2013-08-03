Handlebars.registerHelper('numberToCurrency', function(number) {
    var str = ""
    while(Math.floor(number/1000) > 0)
    {  
      str = "." + addZero((number%1000),3) + str
      number = Math.floor(number/1000)
    }
    str = "$" + number + str;
    return new Handlebars.SafeString(str);
}); 