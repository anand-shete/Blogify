const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");

const client = new S3Client({
  region: process.env.REGION,
  credentials: {
    accessKeyId: process.env.ACCESS_KEY,
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
  },
});

const putObjectForProfile = async () => {
  const command = new PutObjectCommand({
    Bucket: "anandshete-blogify",
    Key: `users/profile/${Math.random()}`,
  });
  return await getSignedUrl(client, command);
};

const putObjectForBlog = async (userId, filename) => {
  const command = new PutObjectCommand({
    Bucket: "anandshete-blogify",
    Key: `users/${userId}/blogs/${filename}`,
  });
  return await getSignedUrl(client, command);
};

module.exports = { putObjectForProfile, putObjectForBlog };
