const response_body = '<!DOCTYPE html><html><head><meta charset="UTF-8"><title>Honk!</title></head><body><pre>Honk!</pre></body></html>';

exports.handler = (event, context, callback) =>
  callback(null, {
    statusCode: '200',
    // body: JSON.stringify(event),event, context, callback
    body: response_body,
    headers: {
      'Content-Type': 'text/html',
    },
  });
