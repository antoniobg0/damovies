const isObject = (o: any) => {
  return o !== null && typeof o === 'object' && Array.isArray(o) === false;
};

const underScoreCase = (str: string): string =>
  str
    .split(/\.?(?=[A-Z])/)
    .join('_')
    .toLowerCase();

const camelCase = (str: string): string => {
  return str.replace(/[-_]([A-Z|a-z|0-9])/g, (_, char) => char.toUpperCase());
};

export const responseToEntity = <T>(res: any) => {
  const keys = Object.keys(res);
  const castedObject = {} as any;

  keys.forEach(key => {
    if (isObject(res[key])) {
      castedObject[camelCase(key)] = responseToEntity(res[key]);
    } else if (Array.isArray(res[key])) {
      castedObject[camelCase(key)] = res[key].map(responseToEntity);
    } else {
      castedObject[camelCase(key)] = res[key];
    }
  });

  return castedObject as T;
};

export const entityToRequest = (entity: any) => {
  const keys = Object.keys(entity);
  const castedObject = {} as any;

  keys.forEach(key => {
    castedObject[underScoreCase(key)] = entity[key];
  });

  return castedObject;
};
