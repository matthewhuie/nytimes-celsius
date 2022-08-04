// Use MutationObserver to watch element that loads with page in DOM
$("section#masthead-bar-one div#masthead-bar-one-widgets").observe('childlist subtree', record => {

  // Main weather widget element
  weather_widget = $("div[data-testid='weather-widget']:contains('°F'):not(.nytimes-celsius)");

  if (weather_widget.length) {
    weather_html = weather_widget.html();

    regex = /[0-9]+°[F]?/g
    temps_f = weather_html.match(regex);

    // Performs unit conversion while maintaining suffixes, if present
    temps_c = temps_f.forEach(temp_f => {
      suffix = temp_f.replace(/^[0-9]+/, '').replace('F', 'C');
      value = temp_f.replace(/°[F]?/, '');

      temp_c = Math.round((value - 32) * 5 / 9);

      weather_html = weather_html.replaceAll(temp_f, temp_c + suffix);
    });

    // Pushes changes to DOM and adds watermark
    weather_widget.html(weather_html);
    weather_widget.addClass('nytimes-celsius');
  }
});
