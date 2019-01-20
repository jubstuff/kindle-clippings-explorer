const expect = require('chai').expect;
const parse = require('../src/parser');


describe('kindle clippings parser test', () => {
  it('should pass this canary test', () => {
    expect(true).to.be.true;
  });

  it('should split clipping in title, meta and text', () => {
    const text = `
    Title
    Meta
    
    Text
    `;

    const clipping = parse(text);

    expect(clipping).to.have.property('title').with.lengthOf(5);
    expect(clipping).to.have.property('meta').with.lengthOf(4);
    expect(clipping).to.have.property('text').with.lengthOf(4);
  });


});
