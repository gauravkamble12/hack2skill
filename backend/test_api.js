const fetch = require('node-fetch');

async function testChat() {
  try {
    const res = await fetch('http://localhost:5000/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: 'What is the current salary and allowance of an Indian Member of Parliament?' })
    });
    const data = await res.json();
    console.log(data.reply);
  } catch (e) {
    console.error('Test failed:', e.message);
  }
}

testChat();
