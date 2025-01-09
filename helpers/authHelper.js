import bcrypt from "bcryptjs";

export const hashPassword = async (pass) => {
  try {
    const salt = 10;
    const hashedPassword = await bcrypt.hash(pass, salt);
    return hashedPassword;
  } catch (error) {
    console.log(error);
  }
};

export const comparePassword = async (pass, hashedPassword) => {
  return bcrypt.compare(pass, hashedPassword);
};
