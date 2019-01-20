module.exports = function ( clippingText ) {
  const lines = clippingText.trim().split(/\r?\n/);

  return {
    'title': lines[0].trim(),
    'meta': lines[1].trim(),
    'text': lines[3].trim()
  }
};
