weather_widget = $("div[data-testid='weather-widget']:not(.nytimes-celsius)");

if (weather_widget.length) {
  weather_html = weather_widget.html();

  regex = /[0-9]+°[F]?/g
  temps_f = weather_html.match(regex);

  temps_c = temps_f.forEach(temp_f => {
    suffix = temp_f.replace(/^[0-9]+/, '').replace('F', 'C');
    value = temp_f.replace(/°[F]?/, '');

    temp_c = Math.round((value - 32) * 5 / 9);

    weather_html = weather_html.replaceAll(temp_f, temp_c + suffix);
  });

  weather_widget.html(weather_html);
  weather_widget.addClass('nytimes-celsius');
}
