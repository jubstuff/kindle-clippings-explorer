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
    expect( clipping.title).to.equal('Working Effectively with Legacy Code, First Edition');
    expect( clipping ).to.have.property( 'author' );
    expect( clipping.author).to.equal('Michael Feathers');
    expect( clipping ).to.have.property( 'meta' );
    expect( clipping ).to.have.property( 'text' );
    expect( clipping.text).to.equal('Lag time is the amount of time that passes between a change that you make and the moment that you get real feedback about the change.');
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
  } )


} );
