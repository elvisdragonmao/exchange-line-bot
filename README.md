# Exchange Line Bot

A LINE bot that converts currencies to USD and TWD using real-time exchange rates.

## Features

- Converts any supported currency to USD and TWD
- Uses real-time exchange rates from tw.rter.info
- Simple text-based interface

## Setup

1. Clone the repository:
```bash
git clone https://github.com/Edit-Mr/exchange-line-bot.git
cd exchange-line-bot
```

2. Install dependencies:
```bash
pnpm install
```

3. Create a `.env` file in the root directory with your LINE channel credentials:
```
LINE_CHANNEL_ACCESS_TOKEN=your_channel_access_token
LINE_CHANNEL_SECRET=your_channel_secret
PORT=3000
```

4. Start the server:
```bash
node index.js
```

## Usage

1. Add the bot as a friend on LINE
2. Send a currency code (e.g., EUR, JPY, GBP)
3. The bot will reply with the conversion rates to USD and TWD

## Supported Currencies

The bot supports all currencies available through the tw.rter.info API, including:
- EUR (Euro)
- JPY (Japanese Yen)
- GBP (British Pound)
- And many more...

## Development

Built with:
- Node.js
- Express
- LINE Bot SDK
- Axios for API requests 