// Environment configuration for the frontend
export const config = {
  // API Configuration
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001',
  
  // App Configuration
  appName: import.meta.env.VITE_APP_NAME || 'Notes Manager',
  appVersion: import.meta.env.VITE_APP_VERSION || '1.0.0',
  
  // Environment
  nodeEnv: import.meta.env.VITE_NODE_ENV || 'development',
  
  // Features
  enableLogging: import.meta.env.VITE_ENABLE_LOGGING === 'true',
  enableAnalytics: import.meta.env.VITE_ENABLE_ANALYTICS === 'true',
  
  // AWS Configuration (for deployment)
  awsRegion: import.meta.env.VITE_AWS_REGION || 'us-east-1',
  cloudfrontUrl: import.meta.env.VITE_CLOUDFRONT_URL || '',
  
  // Development helpers
  isDevelopment: import.meta.env.VITE_NODE_ENV === 'development',
  isProduction: import.meta.env.VITE_NODE_ENV === 'production',
};

// Log configuration in development
if (config.isDevelopment && config.enableLogging) {
  console.log('🚀 Frontend Configuration:', {
    appName: config.appName,
    apiBaseUrl: config.apiBaseUrl,
    nodeEnv: config.nodeEnv,
    enableLogging: config.enableLogging,
    enableAnalytics: config.enableAnalytics,
  });
}

export default config;
