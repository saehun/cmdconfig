const encode = (data: any): string => {
  const buff = Buffer.from(JSON.stringify(data));
  return buff.toString("base64");
};

const decode = (base64String: string): any => {
  const buff = Buffer.from(base64String, "base64");
  return JSON.parse(buff.toString("ascii"));
};

export const base64 = {
  encode,
  decode,
};
