const expect = require( 'chai' ).expect;
const parse = require( '../src/parser' );


describe( 'kindle clippings parser test', () => {
  it( 'should pass this canary test', () => {
    expect( true ).to.be.true;
  } );

  it( 'should split clipping in title, meta and text', () => {
    const text = `Working Effectively with Legacy Code, First Edition (Michael Feathers)
- Evidenziazione Pos. 2063-64  | Aggiunta il domenica 13 gennaio 19 17:03:49 Ora media di Greenwich

Lag time is the amount of time that passes between a change that you make and the moment that you get real feedback about the change.
    `;

    const clipping = parse( text );

    expect( clipping ).to.have.property( 'title' );
    expect( clipping.title ).to.equal( 'Working Effectively with Legacy Code, First Edition' );
    expect( clipping ).to.have.property( 'author' );
    expect( clipping.author ).to.equal( 'Michael Feathers' );
    expect( clipping ).to.have.property( 'meta' );
    expect( clipping ).to.have.property( 'text' );
    expect( clipping.text ).to.equal( 'Lag time is the amount of time that passes between a change that you make and the moment that you get real feedback about the change.' );
  } );

  it( 'should extract correct position and date for the clipping', () => {
    const clippingText = `Working Effectively with Legacy Code, First Edition (Michael Feathers)
- Evidenziazione Pos. 2063-64  | Aggiunta il domenica 13 gennaio 19 17:03:49 Ora media di Greenwich

Lag time is the amount of time that passes between a change that you make and the moment that you get real feedback about the change.`;

    const clipping = parse( clippingText ),
      meta = clipping.meta;
    expect( meta ).to.be.an( 'object' );
    expect( meta ).to.have.property( 'date' );
    expect( meta.date ).to.be.a( 'date' );
    expect( meta.date.getDate() ).to.equal( 13 );
    expect( meta.date.getMonth() ).to.equal( 0 );
    expect( meta.date.getFullYear() ).to.equal( 2019 );
    expect( meta ).to.have.property( 'position' );
    expect( meta.position ).to.equal( '2063-64' );
  } );

  it( 'should throw error on empty highlighting', () => {
    const clippingText = `Le nuove regole della scrittura: Strategie e strumenti per creare contenuti di sucesso (Italian Edition) (Ann Handley)
- Segnalibro Pos. 2512  | Aggiunto il giovedì 3 novembre 16 18:03:21 Ora media di Greenwich


`;
    const call = () => { parse( clippingText ) };
    expect(call).to.throw(Error, 'Invalid Clipping to parse');
  } );

  it( 'should extract correct date for the clipping', () => {
    const clippingText = `Mastery (Robert Greene)
- Evidenziazione a pagina 47 | Pos. 717-18  | Aggiunta il domenica 1 maggio 16 21:40:19 Ora media di Greenwich

Work is often seen as a means for making money so we can enjoy that second life that we lead. Even if we derive some satisfaction from our careers we still tend to compartmentalize our lives in this way.`;

    const clipping = parse( clippingText ),
      meta = clipping.meta;
    expect( meta ).to.be.an( 'object' );
    expect( meta ).to.have.property( 'date' );
    expect( meta.date ).to.be.a( 'date' );
    expect( meta.date.getDate() ).to.equal( 1 );
    expect( meta.date.getMonth() ).to.equal( 4 );
    expect( meta.date.getFullYear() ).to.equal( 2016 );
  } );

} );
