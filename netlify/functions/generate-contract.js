// netlify/functions/generate-contract.js
const fs = require("fs");
const path = require("path");
const PizZip = require("pizzip");
const Docxtemplater = require("docxtemplater");

exports.handler = async (event) => {
  try {
    if (event.httpMethod !== "POST") {
      return { statusCode: 405, body: "Method Not Allowed" };
    }

    const data = JSON.parse(event.body || "{}");

    // Expecting: client_name, service_fee, topic, message, email, name
    const payload = {
      client_name: data.client_name || "",
      service_fee: data.service_fee || "",
      name: data.name || "",
      email: data.email || "",
      topic: data.topic || "",
      message: data.message || "",
      date: new Date().toLocaleDateString(),
    };

    const templatePath = path.join(__dirname, "contract-template.docx");
    const templateBinary = fs.readFileSync(templatePath, "binary");

    const zip = new PizZip(templateBinary);
    const doc = new Docxtemplater(zip, {
      paragraphLoop: true,
      linebreaks: true,
    });

    doc.setData(payload);

    doc.render();

    const outBuffer = doc.getZip().generate({
      type: "nodebuffer",
      compression: "DEFLATE",
    });

    const safeClient = (payload.client_name || "Client")
      .replace(/[^\w\- ]+/g, "")
      .trim()
      .replace(/\s+/g, "-");

    return {
      status
