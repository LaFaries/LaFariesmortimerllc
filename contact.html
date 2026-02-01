<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
<title>Contact | LaFaries Mortimer LLC</title>

<style>
body{
    font-family: Arial, sans-serif;
    background:#f7f7f7;
    margin:0;
    padding:40px;
}
.card{
    background:white;
    max-width:600px;
    margin:auto;
    padding:30px;
    border-radius:8px;
    box-shadow:0 4px 12px rgba(0,0,0,0.1);
}
h1{
    margin-top:0;
}
label{
    display:block;
    margin-top:15px;
    font-weight:bold;
}
input, textarea{
    width:100%;
    padding:10px;
    margin-top:5px;
    border:1px solid #ccc;
    border-radius:4px;
    font-size:16px;
}
button{
    margin-top:20px;
    padding:12px 20px;
    font-size:16px;
    background:#0a3d62;
    color:white;
    border:none;
    border-radius:4px;
    cursor:pointer;
}
button:hover{
    background:#074172;
}
</style>
</head>

<body>

<div class="card">
    <h1>Send a Request</h1>
    <p>You’ll receive your contract immediately after submission.</p>

    <form id="contractForm">
        <label>Your Name</label>
        <input name="name" required>

        <label>Email Address</label>
        <input type="email" name="email" required>

        <label>What are you reaching out about?</label>
        <input name="topic">

        <label>Message</label>
        <textarea name="message"></textarea>

        <button type="submit">Send Request</button>
    </form>
</div>

<script>
document.getElementById('contractForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = {
        client_name: document.querySelector('input[name="name"]').value,
        service_fee: "0"
    };

    const response = await fetch('/.netlify/functions/generate-contract', {
        method: 'POST',
        body: JSON.stringify(formData),
    });

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Contract-${formData.client_name}.docx`;
    a.click();
});
</script>

</body>
</html>
