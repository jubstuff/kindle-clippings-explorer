const parseDateLine = ( dateTextLine ) => {

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

  day = day.padStart(2, '0');
  month = ITALIAN_MONTH_NAMES[month];
  year = parseInt( year ) + BASE_YEAR;

  return new Date( `${year}-${month}-${day}T${hour}` )
};

const parsePositionLine = ( positionTextLine ) => {
  return positionTextLine.match( /(Pos\.) (.+)/ )[2].trim()
};

const parseTitleLine = ( titleTextLine ) => {
  return titleTextLine.trim().match( /(.*) \((.*)\)/ );
};

const getMetaPieces = ( metaTextLine ) => {
  const pieces = metaTextLine.trim().split( '|' );
  if( pieces.length === 2 ) {
    // only with position
    return {
      'positionText': pieces[0].trim(),
      'dateText': pieces[1].trim()
    }
  }

  // with pages
  return {
    'pageText': pieces[0].trim(),
    'positionText': pieces[1].trim(),
    'dateText': pieces[2].trim()
  }

};

module.exports = clippingText => {
  const lines = clippingText.trim().split( /\r?\n/ );
  if( lines.length < 4 ) {
    throw new Error('Invalid Clipping to parse')
  }

  const metaPieces = getMetaPieces(lines[1]);

  const [full, title, author] = parseTitleLine( lines[0] );

  return {
    'title': title,
    'author': author,
    'meta': {
      'position': parsePositionLine( metaPieces.positionText ),
      'date': parseDateLine( metaPieces.dateText )
    },
    'text': lines[3].trim()
  }
};
