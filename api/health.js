async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  const envStatus = {
    FIREBASE_TYPE: !!process.env.FIREBASE_TYPE,
    FIREBASE_PROJECT_ID: !!process.env.FIREBASE_PROJECT_ID,
    FIREBASE_PRIVATE_KEY_ID: !!process.env.FIREBASE_PRIVATE_KEY_ID,
    FIREBASE_PRIVATE_KEY: !!process.env.FIREBASE_PRIVATE_KEY,
    FIREBASE_CLIENT_EMAIL: !!process.env.FIREBASE_CLIENT_EMAIL,
    FIREBASE_CLIENT_ID: !!process.env.FIREBASE_CLIENT_ID,
    FIREBASE_AUTH_URI: !!process.env.FIREBASE_AUTH_URI,
    FIREBASE_TOKEN_URI: !!process.env.FIREBASE_TOKEN_URI,
    FIREBASE_AUTH_PROVIDER_X509_CERT_URL: !!process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
    FIREBASE_CLIENT_X509_CERT_URL: !!process.env.FIREBASE_CLIENT_X509_CERT_URL,
    FIREBASE_UNIVERSE_DOMAIN: !!process.env.FIREBASE_UNIVERSE_DOMAIN,
    GEMINI_API_KEY: !!process.env.GEMINI_API_KEY,
  };

  res.status(200).json({
    message: 'Environment variables status',
    status: envStatus,
    timestamp: new Date().toISOString()
  });
}

module.exports = handler;
