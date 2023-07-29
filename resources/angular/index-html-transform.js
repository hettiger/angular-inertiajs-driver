module.exports = (targetOptions, indexHtml) => {
  if (targetOptions.target === 'serve') {
    return indexHtml;
  }

  return indexHtml
    .replace(/styles(\.[a-z\d]+)?\.css/i, "{{ asset('angular/styles$1.css') }}")
    .replace('assets/favicons/favicon.ico', "{{ asset('angular/assets/favicons/favicon.ico') }}")
    .replaceAll(/assets\/favicons\/favicon-([x\d]+)?\.png/g, "{{ asset('angular/assets/favicons/favicon-$1.png') }}")
    .replaceAll(/src="([^"]+)"/g, `src="{{ asset('angular/$1') }}"`);
};
