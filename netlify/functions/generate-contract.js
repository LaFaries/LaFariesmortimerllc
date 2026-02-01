const fs = require("fs");
const path = require("path");

exports.handler = async (event) => {
  try {
    const { client_name, service_fee } = JSON.parse(event.body);

    // Path to your Word template
    const templatePath = path.join(__dirname, "contract-template.docx");

    // Read the docx as a binary buffer (DO NOT convert to string)
    let buffer = fs.readFileSync(templatePath);

    // Convert buffer to string safely for placeholder replacement
    let content = buffer.toString("binary");

    // Replace placeholders
    content = content.replace(/{{client_name}}/g, client_name);
    content = content.replace(/{{service_fee}}/g, service_fee);

    // Convert back to buffer
    const updatedBuffer = Buffer.from(content, "binary");

    return {
      statusCode: 200,
      headers: {
        "Content-Type":
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "Content-Disposition": `attachment; filename="Contract-${client_name}.docx"`,
      },
      body: updatedBuffer.toString("base64"),
      isBase64Encoded: true,
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: error.toString(),
    };
  }
};
