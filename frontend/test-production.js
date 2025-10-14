// Test production configuration
console.log('=== PRODUCTION ENVIRONMENT TEST ===');

// Test 1: Check environment variables
console.log('VITE_API_BASE_URL:', import.meta.env.VITE_API_BASE_URL);
console.log('VITE_BACKEND_URL:', import.meta.env.VITE_BACKEND_URL);
console.log('BASE_URL:', import.meta.env.BASE_URL);

// Test 2: Test API connection
const testAPI = async () => {
    const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api';
    console.log('Testing API URL:', API_URL);
    
    try {
        const response = await fetch(`${API_URL}/health`);
        if (response.ok) {
            const data = await response.json();
            console.log('✅ Health check successful:', data);
        } else {
            console.log('❌ Health check failed:', response.status);
        }
    } catch (error) {
        console.log('❌ Health check error:', error.message);
    }
    
    try {
        const response = await fetch(`${API_URL}/projects`);
        if (response.ok) {
            const data = await response.json();
            console.log('✅ Projects API successful, found', data.length, 'projects');
        } else {
            console.log('❌ Projects API failed:', response.status);
        }
    } catch (error) {
        console.log('❌ Projects API error:', error.message);
    }
};

testAPI();
