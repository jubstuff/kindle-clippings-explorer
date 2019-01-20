function parseDateLine( dateTextLine ) {

  const ITALIAN_MONTH_NAMES = {
    'gennaio': '01',
    'febbraio': '02',
    'marzo': '03',
    'aprile': '04',
    'maggio': '05',
    'giugno': '06',
    'luglio': '07',
    'agosto': '08',
    'settembre': '09',
    'ottobre': '10',
    'novembre': '11',
    'dicembre': '12',
  };

  const BASE_YEAR = 2000;

  const dateText = dateTextLine.match( / il (.+)/ )[1];

  const regex = /([A-Za-zì]+) (\d+) ([a-z]*) (\d+) (\d{2}:\d{2}:\d{2})/gm;
  let [full, dayName, day, month, year, hour] = regex.exec( dateText );

  day = parseInt( day );
  month = ITALIAN_MONTH_NAMES[month];
  year = parseInt( year ) + BASE_YEAR;

  return new Date( `${year}-${month}-${day}T${hour}` )
}

module.exports = clippingText => {
  const lines = clippingText.trim().split( /\r?\n/ );

  const metaText = lines[1].trim();
  const metaTextLines = metaText.split( '|' );
  const positionText = metaTextLines[0].trim();

  return {
    'title': lines[0].trim(),
    'meta': {
      'date': parseDateLine( metaTextLines[1].trim() ),
      'position': ''
    },
    'text': lines[3].trim()
  }
};
