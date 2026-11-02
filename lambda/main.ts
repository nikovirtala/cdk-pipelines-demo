const response_body = `
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Honk!</title>
</head>
<body>
<pre>
                                   ___
                               ,-""   \` .     < Honk! >
                             ,'  _   e )\`-._ /
                            /  ,' \`-._<.===-'
                           /  /
                          /  ;
              _          /   ;
 (\`._    _.-"" ""--..__,'    |
 <_  \`-""                     \\
  <\`-                          :
   (__   <__.                  ;
     \`-.   '-.__.      _.'    /
        \\      \`-.__,-'    _,'
         \`._    ,    /__,-'
            ""._\\__,'< <____
                 | |  \`----.\`.
                 | |        \\ \`.
                 ; |___      \\-\`\`
                 \\   --<
                  \`.\`.<
                    \`-'
</pre>
</body>
</html>
`;

// Node.js 24 and later only support async handlers, not callbacks
export const handler = async () => ({
  statusCode: 200,
  body: response_body,
  headers: {
    'Content-Type': 'text/html',
  },
});
