# 📝 Notes Manager

A full-stack notes management application built with React.js frontend, Node.js/Express backend, and optional AWS CDK infrastructure.

## 🚀 Features

- **Create Notes**: Add new notes with title and content
- **View Notes**: List all notes with creation/update timestamps
- **Delete Notes**: Remove notes with confirmation
- **Real-time Validation**: Client-side and server-side validation
- **Responsive Design**: Works on desktop and mobile devices
- **Error Handling**: Comprehensive error handling and user feedback

## 🏗️ Architecture

```
notes_manager/
├── backend/          # Node.js/Express API server
├── frontend/         # React.js frontend application
├── infrastructure/   # AWS CDK infrastructure
│   ├── lib/         # CDK stack definitions
│   ├── bin/         # CDK app entry point
│   └── scripts/     # Deployment scripts
└── README.md
```

## 🛠️ Tech Stack

### Backend
- **Node.js** with **Express.js**
- **TypeScript** for type safety
- **Zod** for validation
- **CORS** for cross-origin requests
- **In-memory storage** (Map-based, resets on restart)

### Frontend
- **React 18** with **TypeScript**
- **Vite** for fast development and building
- **Axios** for API communication
- **CSS3** with modern styling

### Infrastructure (Optional)
- **AWS CDK** with TypeScript
- **ECS Fargate** for backend deployment
- **S3** for frontend hosting

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Git

### 1. Clone the Repository
```bash
git clone https://github.com/iqbalmdev/notes_manager.git
cd notes_manager
```

### 2. Backend Setup
```bash
cd backend
npm install
npm run dev
```
The backend will start on `http://localhost:3001`

### 3. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
The frontend will start on `http://localhost:5173`

### 4. Access the Application
Open your browser and navigate to `http://localhost:5173`

## 📡 API Endpoints

### Base URL: `http://localhost:3001`

| Method | Endpoint | Description | Request Body | Response |
|--------|----------|-------------|-------------|----------|
| `GET` | `/health` | Health check | - | `{ status: "OK", timestamp: "..." }` |
| `POST` | `/notes` | Create a new note | `{ title: string, content: string }` | `Note` object |
| `GET` | `/notes` | Get all notes | - | Array of `Note` objects |
| `GET` | `/notes/:id` | Get note by ID | - | `Note` object or 404 |
| `PUT` | `/notes/:id` | Update a note | `{ title?: string, content?: string }` | Updated `Note` object |
| `DELETE` | `/notes/:id` | Delete a note | - | 204 No Content |

### Data Models

#### Note Object
```typescript
interface Note {
  id: string;           // Auto-generated unique ID
  title: string;        // Note title (max 100 chars)
  content: string;      // Note content
  createdAt: string;    // ISO timestamp
  updatedAt: string;    // ISO timestamp
}
```

#### Validation Rules
- **Title**: Required, 1-100 characters
- **Content**: Required, minimum 1 character

## 🏃‍♂️ Development

### Backend Development
```bash
cd backend
npm run dev          # Start development server with hot reload
npm run build        # Build for production
npm start            # Start production server
```

### Frontend Development
```bash
cd frontend
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
```

## 🚀 Deployment with AWS CDK

### Prerequisites for CDK Deployment
- AWS CLI configured with appropriate permissions
- AWS CDK installed (`npm install -g aws-cdk`)
- Docker (for ECS container deployment)

### 1. Install CDK Dependencies
```bash
cd infrastructure
npm install
```

### 2. Bootstrap CDK (First time only)
```bash
cdk bootstrap
```

### 3. Deploy Infrastructure
```bash
# Deploy all stacks
npm run deploy

# Or use the deployment script
./scripts/deploy.sh
```

### 4. Deploy Frontend to S3
```bash
# Build the frontend
cd ../frontend
npm run build

# Upload to S3 (replace BUCKET_NAME with actual bucket from outputs)
aws s3 sync dist s3://BUCKET_NAME --delete
```

### 5. Access Deployed Application
After deployment, you'll get:
- **Backend API URL**: ECS Fargate service behind Application Load Balancer
- **Frontend URL**: CloudFront distribution URL
- **S3 Bucket**: For manual frontend uploads

### 6. Clean Up (Optional)
```bash
npm run destroy
```

## 🏗️ Infrastructure Architecture

### Backend Stack
- **ECS Fargate** service with auto-scaling
- **Application Load Balancer** for high availability
- **VPC** with public/private subnets
- **CloudWatch Logs** for monitoring
- **Health checks** and auto-recovery

### Frontend Stack
- **S3 Bucket** for static website hosting
- **CloudFront Distribution** with global CDN
- **Origin Access Control** for security
- **SPA routing** support with custom error pages
- **Compression** and caching optimization

## 📁 Project Structure

### Backend Structure
```
backend/
├── src/
│   ├── app.ts              # Express app configuration
│   ├── server.ts           # Server startup
│   ├── types.ts            # TypeScript interfaces
│   ├── validation.ts       # Zod validation schemas
│   ├── notesService.ts     # Business logic
│   └── notesController.ts   # API route handlers
├── package.json
└── tsconfig.json
```

### Frontend Structure
```
frontend/
├── src/
│   ├── components/
│   │   ├── NoteForm.tsx     # Add note form
│   │   ├── NoteItem.tsx     # Individual note display
│   │   └── NotesList.tsx    # Notes list container
│   ├── api/
│   │   └── notesApi.ts      # API client functions
│   ├── types.ts             # TypeScript interfaces
│   ├── App.tsx              # Main application component
│   └── App.css              # Application styles
├── package.json
└── vite.config.ts
```

## 🧪 Testing

### Backend Testing
```bash
cd backend
npm test                    # Run backend tests
```

### Frontend Testing
```bash
cd frontend
npm test                    # Run frontend tests
npm run test:coverage      # Run tests with coverage
```

## 🔧 Configuration

### Environment Variables

#### Backend
- `PORT`: Server port (default: 3001)
- `NODE_ENV`: Environment (development/production)

#### Frontend
- `VITE_API_URL`: Backend API URL (default: http://localhost:3001)

## 🐛 Troubleshooting

### Common Issues

1. **Backend not starting**
   - Check if port 3001 is available
   - Ensure all dependencies are installed
   - Check TypeScript compilation errors

2. **Frontend can't connect to backend**
   - Verify backend is running on port 3001
   - Check CORS configuration
   - Ensure API URL is correct

3. **CDK deployment fails**
   - Verify AWS credentials are configured
   - Check CDK bootstrap status
   - Ensure Docker is running (for containerized deployment)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Iqbal Mdev**
- GitHub: [@iqbalmdev](https://github.com/iqbalmdev)

## 🙏 Acknowledgments

- React team for the amazing framework
- Express.js for the robust backend framework
- AWS CDK for infrastructure as code
- Vite for the lightning-fast build tool
