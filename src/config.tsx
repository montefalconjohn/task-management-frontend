export const config = {
    envMode: import.meta.env,
    appName: import.meta.env.VITE_REACT_APP_NAME || "",
    apiBaseUrl:  import.meta.env.VITE_REACT_APP_API_URL || "",
    enableAuthModule: (import.meta.env.VITE_REACT_APP_ENABLE_AUTH_MODULE && import.meta.env.VITE_REACT_APP_ENABLE_AUTH_MODULE === true) || false
};