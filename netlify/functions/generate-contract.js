const fs = require("fs");
const path = require("path");

exports.handler = async (event) => {
  try {
    const { client_name } = JSON.parse(event.body);

    const templatePath = path.join(__dirname, "contract-template.docx");
    const fileBuffer = fs.readFileSync(templatePath);

    return {
      statusCode: 200,
      headers: {
        "Content-Type":
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "Content-Disposition": `attachment; filename=Contract-${client_name}.docx`,
      },
      body: fileBuffer.toString("base64"),
      isBase64Encoded: true,
    };
  } catch (err) {
    return { statusCode: 500, body: err.toString() };
  }
};
