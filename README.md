# BloodLine 🩸: A Centralized Blood Bank Management System

BloodLine is a comprehensive platform designed to streamline blood bank operations, connecting donors, hospitals, and blood banks for efficient blood management.

##
![GitHub stars](https://img.shields.io/github/stars/Jahnavi-verma/blood-bank?style=social)
![GitHub forks](https://img.shields.io/github/forks/Jahnavi-verma/blood-bank?style=social)
![GitHub issues](https://img.shields.io/github/issues/Jahnavi-verma/blood-bank)
![GitHub pull requests](https://img.shields.io/github/issues-pr/Jahnavi-verma/blood-bank)
![GitHub last commit](https://img.shields.io/github/last-commit/Jahnavi-verma/blood-bank)

![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![NodeJS](https://img.shields.io/badge/node.js-%2343853D.svg?style=for-the-badge&logo=node.js&logoColor=white)

## 📋 Table of Contents

- [About](#about)
- [Features](#features)
- [Quick Start](#quick-start)
- [Installation](#installation)
- [Usage](#usage)
- [Configuration](#configuration)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [Testing](#testing)
- [Deployment](#deployment)
- [Support](#support)(NA)
- [Acknowledgments](#acknowledgments)

## About

BloodLine aims to solve the critical challenge of efficient blood management by providing a centralized platform that connects blood banks of hospitals. This system helps to streamline the process of blood storage, and distribution, ultimately saving lives by ensuring timely access to blood for those in need.

The project targets blood banks looking to modernize their operations, hospitals seeking a reliable source of blood supply. BloodLine utilizes TypeScript for a robust and scalable backend, ensuring data integrity and efficient performance. The architecture is designed to be modular and extensible, allowing for future enhancements and integrations.

The unique selling point of BloodLine is its integrated approach, inventory tracking, and request processing into a single, user-friendly platform. This eliminates the need for multiple systems and manual processes, reducing errors and improving overall efficiency.

## ✨ Features


- ⚡ **Inventory Tracking**: Real-time monitoring of blood inventory levels, including blood type and expiration dates.
- 🔒 **Secure Data Handling**: Secure storage and management of sensitive donor and patient information.
- 🎨 **User-Friendly Interface**: Intuitive interface for easy navigation and efficient task management.
- 📱 **Responsive Design**: Accessible on various devices, ensuring seamless user experience.
- 🛠️ **Extensible Architecture**: Modular design for easy integration of new features and functionalities.



### Screenshots (NA)
![Dashboard](screenshots/dashboard.png)
*BloodLine dashboard showing key metrics and quick actions*

![Inventory Management](screenshots/inventory.png)
*Inventory management screen displaying blood types and quantities*

## 🚀 Quick Start

Clone and run in 3 steps:
bash
git clone https://github.com/Jahnavi-verma/blood-bank.git
cd blood-bank
npm install && npm start


Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## 📦 Installation

### Prerequisites
- Node.js 18+ and npm
- Git
- A database system (e.g., PostgreSQL, MySQL)

### Option 1: From Source
bash
# Clone repository
git clone https://github.com/Jahnavi-verma/blood-bank.git
cd blood-bank
#dependencies used
next (15.5.5)
react (19.1.0)
react-dom (19.1.0)
gsap (^3.13.0)
motion (^12.23.24)
animejs (^4.2.2)
@react-three/fiber (^9.4.0)
@react-three/drei (^10.7.6)
three (^0.180.0)
ogl (^1.0.11)
recharts (^3.3.0)
@react-icons/all-files (^4.1.0)
@types/animejs (^3.1.13)

# Install dependencies
npm install
npm install gsap
npm install motion
npx shadcn@latest add @react-bits/Beams-TS-CSS

# Build project
npm run build

# Start development server
npm run dev


## 💻 Usage

### Basic Usage
typescript
// Example: Fetching blood inventory
import { getInventory } from './src/services/inventoryService';

async function displayInventory() {
  const inventory = await getInventory();
  console.log(inventory);
}

displayInventory();


### Advanced Examples
// More complex usage scenarios, such as processing blood requests and updating inventory.

## ⚙️ Configuration

### Environment Variables
Create a `.env` file in the root directory:

env
# Database Configuration(not applicable yet)
DATABASE_URL=postgresql://user:password@host:port/database
NODE_ENV=development

# Server Configuration
PORT=3000


### Configuration File
json
{
  "appName": "BloodLine",
  "version": "1.0.0",
  "settings": {
    "theme": "light",
    "language": "en"
  }
}


## 📁 Project Structure(Till Now)
BLOOD_BANK/
├── 📁src/
│   ├── 📁app/
│   │   ├──📁 admin/                      # Administrator Interface Route
│   │   │   ├──📁 dashboard/              # Admin Dashboard Sub-route
│   │   │   │   ├── BlurText.tsx
│   │   │   │   ├── Dashboard.css
│   │   │   │   └── page.tsx
│   │   │   ├── 📁notification/           # Admin Notifications Sub-route
│   │   │   │   ├── notifications.css
│   │   │   │   └── page.tsx
│   │   │   ├── 📁request/                # Admin Request Management Sub-route
│   │   │   │   ├── page.tsx
│   │   │   │   └── request.css 
│   │   │   ├── global.css              
│   │   │   ├── layout.tsx              # Layout for the Admin module the Side-Nav-Pannel
|   |   ├── 📁 Components/              # Admin and Nurse Component/View
|   |   |   ├──ApprovedRequests.tsx
|   |   |   ├──RequestHistory.tsx
│   │   ├── 📁login/                      # User Authentication Route
│   │   │   ├── login.css
│   │   │   └── page.tsx
│   │   ├── 📁Nurse/                      # Nursing Staff Interface Route
│   │   │   ├── 📁approved/               # Nurse Approved Requests Sub-route
│   │   │   │   ├── approved.css
│   │   │   │   └── page.tsx              
│   │   │   ├── 📁dashboard/              # Nurse Dashboard Sub-route
│   │   │   │   ├── BlurText.tsx
│   │   │   │   ├── dashboard.css
│   │   │   │   └── page.tsx
│   │   │   ├── 📁history/                # Nurse History Sub-route
│   │   │   │   ├── history.css
│   │   │   │   └── page.tsx
│   │   │   ├── 📁request/                # Nurse Request Sub-route
│   │   │   │   ├── page.tsx
│   │   │   │   └── request.css
│   │   │   ├── globals.css             
│   │   │   └── layout.tsx              # Layout for the Nurse module the Side-Nav-Pannel
│   │   ├── Beams.css                   # Root-level component files shared
│   │   ├── beams.tsx
│   │   ├── CardSwap.css
│   │   ├── CardSwap.tsx
│   │   ├── favicon.ico
│   │   ├── layout.tsx                  # Root application layout
│   │   ├── LogoComponent.css
│   │   ├── LogoComponent.tsx
│   │   ├── main.css
│   │   ├── page.tsx                    # Root application page content
│   │   ├── RoatingText.css
│   │   ├── RoatingText.tsx
│   │   ├── RotatingTextWrapper.css
│   │   └── RotatingTextWrapper.tsx
├── .gitignore                          # Git configuration
├── next-env.d.ts                       # TypeScript environment definition
├── next.config.ts                      # Next.js configuration
├── package-lock.json                   # Dependency lock file
├── package.json                        # Project dependencies
├── postcss.config.mjs                  # PostCSS configuration
├── README.md                           # Project documentation
├── tailwind.config.js                  # Tailwind CSS configuration
└── tsconfig.json                       # TypeScript configuration




## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Quick Contribution Steps
1. 🍴 Fork the repository
2. 🌿 Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. ✅ Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. 📤 Push to the branch (`git push origin feature/AmazingFeature`)
5. 🔃 Open a Pull Request

### Development Setup
bash
# Fork and clone the repo
git clone https://github.com/yourusername/blood-bank.git

# Install dependencies
npm install
npm install gsap
npm install motion
npx shadcn@latest add @react-bits/Beams-TS-CSS
# Create a new branch
git checkout -b feature/your-feature-name

# Make your changes and test
npm test

# Commit and push
git commit -m "Description of changes"
git push origin feature/your-feature-name


### Code Style
- Follow existing code conventions
- Run `npm run lint` before committing
- Add tests for new features
- Update documentation as needed

## Testing

To run tests, use the following command:

bash
npm test


## Deployment

Deployment instructions will vary depending on your chosen platform. Common options include:

- **Vercel**: Deploy directly from your GitHub repository.
- **Netlify**: Similar to Vercel, provides easy deployment from Git.
- **Docker**: Containerize the application for deployment on any Docker-compatible platform.


## 💬 Support

- 📧 **Email**: NA
- 🐛 **Issues**: [GitHub Issues](https://github.com/Jahnavi-verma/blood-bank/issues)
- 📖 **Documentation**: [Full Documentation](https://bloodline.example.com/docs)
- 💰 **Sponsor**: NA

## 🙏 Acknowledgments

- 🎨 **Design inspiration**: 
- 📚 **Libraries used**:
  - [React](https://reactjs.org/) - For building the user interface
  - [Node.js](https://nodejs.org/en/) - For backend development
  - [Next.js](https://nextjs.org/) - Web framework for Node.js
- 👥 **Contributors**: Thanks to all [contributors](https://github.com/Jahnavi-verma/blood-bank/contributors)
