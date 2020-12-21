const isValidHex = new RegExp('^[0-9a-fA-F]{24}$');

const isValidId = id => {
  return id !== undefined && id !== null && isValidHex.test(id);
};

export default isValidId;
