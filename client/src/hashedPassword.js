import bcrypt from "bcryptjs";

const password = "SecurePassword123";
bcrypt.hash(password, 12).then(hash => {
  console.log('Hashed Password:', hash);
});
