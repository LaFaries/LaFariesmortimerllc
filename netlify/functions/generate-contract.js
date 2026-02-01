const fs = require("fs");
const path = require("path");

exports.handler = async (event) => {
  try {
    const { client_name, service_fee } = JSON.parse(event.body);

    const templatePath = path.join(__dirname, "contract-template.docx");
    const fileBuffer = fs.readFileSync(templatePath);

    let content = fileBuffer.toString("binary");

    content = content.replace(/{{client_name}}/g, client_name);
    content = content.replace(/{{service_fee}}/g, service_fee);

    const updatedBuffer = Buffer.from(content, "binary");

    return {
      statusCode: 200,
      headers: {
        "Content-Type":
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "Content-Disposition": `attachment; filename=Contract-${client_name}.docx`,
      },
      body: updatedBuffer.toString("base64"),
      isBase64Encoded: true,
    };
  } catch (error) {
    return { statusCode: 500, body: error.toString() };
  }
};
