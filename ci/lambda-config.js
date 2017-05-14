module.exports = {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION || "us-east-1",
    handler: 'index.handler',
    functionName: process.env.LAMBDA_NAME,
    timeout: 10,
    memorySize: 128,
    publish: true,
    runtime: 'nodejs4.3'
}