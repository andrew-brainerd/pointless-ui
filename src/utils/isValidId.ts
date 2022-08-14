const isValidHex = /^[0-9a-fA-F]{24}$/;

const isValidId = (id: string | undefined) => {
  return id !== undefined && id !== null && isValidHex.test(id);
};

export default isValidId;
