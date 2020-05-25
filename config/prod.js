
module.exports = { 
  // Present in Dialog flow settings.
  googleProjectID: process.env.googleProjectID,
  dialogFlowSessionID: process.env.dialogFlowSessionID,
  dialogFlowSessionLanguageCode: "en-us",
  googleClientEmail: process.env.googleClientEmail,
  googlePrivateKey: JSON.parse(process.env.googlePrivateKey)
}