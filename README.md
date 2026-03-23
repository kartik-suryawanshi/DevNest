# { } DevNest

DevNest is a modern, high-performance web application designed to help businesses establish a complete and professional digital identity. Built with a focus on stunning aesthetics, smooth animations, and solid architectural principles.

## 🚀 Tech Stack

### Frontend
- **Framework**: React 19 + Vite
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Scroll Effects**: Lenis (Smooth Scrolling)
- **Routing**: React Router DOM
- **Forms & Validation**: React Hook Form + Zod

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Mail Service**: Nodemailer (handles contact form submissions)
- **Utilities**: CORS, Dotenv

## 📁 Project Structure

```text
DevNest/
├── Backend/               # Express backend for form handling and email dispatch
│   ├── index.js           # Main API server
│   ├── package.json       # Backend dependencies
│   └── .env.example       # Example environment variables
├── src/                   # React frontend source code
│   ├── components/        # Reusable UI components and layouts
│   ├── pages/             # Route-level page components
│   ├── App.css            # Global styles and Tailwind imports
│   └── main.tsx           # React application entry point
├── public/                # Static assets (favicons, etc.)
├── package.json           # Frontend dependencies and scripts
├── tailwind.config.js     # Tailwind CSS configuration
└── vite.config.ts         # Vite configuration
```

## 🛠️ Getting Started

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) (v18+ recommended) and `npm` installed.

### 1. Clone the repository
```bash
git clone <your-repo-url>
cd DevNest
```

### 2. Frontend Setup
Install frontend dependencies and start the development server:
```bash
npm install
npm run dev
```
The frontend will be running on `http://localhost:5173` (or the port Vite provides).

### 3. Backend Setup
Open a new terminal window, navigate to the `Backend` directory, and install dependencies:
```bash
cd Backend
npm install
```

Configure the environment variables:
1. Copy `.env.example` to `.env` inside the `Backend` folder.
2. Update the `.env` file with your email credentials (used by Nodemailer):
   ```env
   PORT=5000
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-app-password
   ```

Start the backend server:
```bash
node index.js
```
The backend API will run on `http://localhost:5000`.

## 📜 Available Scripts (Frontend)

- `npm run dev` - Starts the Vite development server.
- `npm run build` - Compiles TypeScript and builds the app for production.
- `npm run lint` - Runs ESLint to find issues in the code.
- `npm run preview` - Previews the production build locally.

## 🤝 Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License
This project is proprietary. All rights reserved.
