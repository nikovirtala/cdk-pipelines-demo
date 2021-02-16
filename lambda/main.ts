const response_body = '<!DOCTYPE html><html><head><meta charset="UTF-8"><title>Honk!</title></head><body><pre>Honk!</pre></body></html>';

exports.handler = (event, callback) =>
  callback(null, {
    statusCode: '200',
    // body: JSON.stringify(event),
    body: response_body,
    headers: {
      'Content-Type': 'text/html',
    },
  });
