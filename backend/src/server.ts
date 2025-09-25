import 'dotenv/config';
import app from './app';

const PORT = process.env.PORT || 3001;
const NODE_ENV = process.env.NODE_ENV || 'development';

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`🌍 Environment: ${NODE_ENV}`);
  console.log(`📝 Notes API available at http://localhost:${PORT}/notes`);
  console.log(`🏥 Health check at http://localhost:${PORT}/health`);
});
