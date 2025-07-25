const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");

const client = new S3Client({
  region: "ap-south-1",
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

const putObjectForBlog = async () => {
  const command = new PutObjectCommand({
    Bucket: "anandshete-blogify",
    Key: `users/blogs/${Math.random()}`,
  });
  return await getSignedUrl(client, command);
};

module.exports = { putObjectForProfile, putObjectForBlog };
