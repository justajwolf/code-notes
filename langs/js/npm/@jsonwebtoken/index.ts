import * as jwt from 'jsonwebtoken';
const secretId = 'waterGun';
const secretKey = '#bhVt1QfYD&EiiD$KpzJlSPxYj*k2jv5';
function test(body) {
  const payload = JSON.stringify({
    time: ~~(Date.now() / 1000),
    secretId,
    secretKey,
    body: JSON.stringify(body),
  })
  console.log(payload);
  const sign = jwt.sign(
    payload,
    secretKey,
    { algorithm: 'HS256' },
  );
  console.log(sign);
  const decoded = jwt.verify(sign, secretKey);
  console.log(decoded)
}

test({room_id: 1});
