const OTP_EXPIRY_KEY = "deligo-food-fleet-otp-expiry";

export const setLocalOtpExpiry = (minutes = 5) => {
  const now = new Date();
  now.setMinutes(now.getMinutes() + minutes);
  localStorage.setItem(OTP_EXPIRY_KEY, now.toISOString());
};

export const removeLocalOtpExpiry = () =>
  localStorage.removeItem(OTP_EXPIRY_KEY);

export const getExpiryTime = () => {
  const expiry = localStorage.getItem(OTP_EXPIRY_KEY);

  const now = new Date();

  if (!expiry) {
    return 0;
  }

  const expiryTime = new Date(expiry as string).getTime() - now.getTime();

  if (expiryTime <= 0) {
    removeLocalOtpExpiry();
    return 0;
  }

  return Math.floor(expiryTime / 1000);
};
