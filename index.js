const express = require('express');
const app = express();
const path = require('path');
require('dotenv').config();

app.use(express.static(path.join(__dirname, 'public')));

app.get('/guilds', async (req, res) => {
  const response1 = await fetch(`https://discord.com/api/v10/guilds/1241780952846565386?with_counts=true`, { headers: { 'Content-Type': 'application/json', 'Authorization': `Bot ${process.env.TOKEN}` }});
  const response2 = await fetch(`https://discord.com/api/v10/guilds/1241780952846565386/channels`, { headers: { 'Content-Type': 'application/json', 'Authorization': `Bot ${process.env.TOKEN}` }});
  const responseData = await response1.json();
  const channelData = await response2.json();
  return res.json({
    channels: channelData?.length,
    members: responseData.approximate_member_count,
    actives: responseData.approximate_presence_count
  });
});

app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'pages/index.html')));
app.get('/images', (req, res) => res.sendFile(path.join(__dirname, 'pages/images.html')));
app.get('/partners', (req, res) => res.sendFile(path.join(__dirname, 'pages/partners.html')));
app.use((req, res) => res.sendFile(path.join(__dirname, 'pages/404.html')));

app.listen(process.env.PORT);