module.exports = clippingText => {

  const italianMonthNames = {
    'gennaio': 1,
    'febbraio': 2,
    'marzo': 3,
    'aprile': 4,
    'maggio': 5,
    'giugno': 6,
    'luglio': 7,
    'agosto': 8,
    'settembre': 9,
    'ottobre': 10,
    'novembre': 11,
    'dicembre': 12,
  };

  const lines = clippingText.trim().split( /\r?\n/ );

  const metaText = lines[1].trim();
  const metaTextLines = metaText.split( '|' );
  const positionText = metaTextLines[0].trim();
  const dateText = metaTextLines[1].match( / il (.+)/ )[1];

  const regex = /([A-Za-zì]+) (\d+) ([a-z]*) (\d+) (\d{2}:\d{2}:\d{2})/gm;
  const [full, dayName, day, month, year, hour] = regex.exec( dateText );

  return {
    'title': lines[0].trim(),
    'meta': {
      'date': new Date( parseInt(year) + 2000, italianMonthNames[month], day ),
      'time': '',
      'position': ''
    },
    'text': lines[3].trim()
  }
};
