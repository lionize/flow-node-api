// @flow

export function parseProduce(input: any): boolean {
  const requirements = [
    { key: "name", type: "string" },
    { key: "quantity", type: "number" },
    { key: "price", type: "number" }
  ];
  return requirements.every(req => {
    return input.hasOwnProperty(req.key) && typeof input[req.key] === req.type;
  });
}
