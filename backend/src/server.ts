import app from './app';

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📝 Notes API available at http://localhost:${PORT}/notes`);
  console.log(`🏥 Health check at http://localhost:${PORT}/health`);
});
