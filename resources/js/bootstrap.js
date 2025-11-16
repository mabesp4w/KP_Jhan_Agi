// Bootstrap file for Laravel Breeze
// This file is required by app.jsx

import * as routes from './routes';

// Helper to convert dash-case to camelCase (e.g., 'data-siswa' -> 'dataSiswa')
const toCamelCase = (str) => {
    return str.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
};

// Helper to get nested route (e.g., 'admin.dashboard' -> routes.admin?.dashboard)
const getNestedRoute = (routesObj, path) => {
    const parts = path.split('.');
    let current = routesObj;
    
    for (let i = 0; i < parts.length; i++) {
        let part = parts[i];
        
        if (current && typeof current === 'object') {
            // Special handling for 'admin' - check routesObj.admin directly
            if (i === 0 && part === 'admin' && routesObj.admin) {
                current = routesObj.admin;
                continue;
            }
            
            // Check if it's a direct property
            if (part in current) {
                current = current[part];
            } 
            // Try camelCase version if part contains dash (e.g., 'data-siswa' -> 'dataSiswa')
            else if (part.includes('-')) {
                const camelPart = toCamelCase(part);
                if (camelPart in current) {
                    current = current[camelPart];
                } else {
                    return null;
                }
            }
            // Check if it's a default export (for nested modules like admin)
            else if (current.default && typeof current.default === 'object' && part in current.default) {
                current = current.default[part];
            }
            // Check if current is a function with definition property (Wayfinder route)
            else if (typeof current === 'function' && current.definition) {
                // This is a route function, not a nested object
                return null;
            }
            else {
                return null;
            }
        } else {
            return null;
        }
    }
    
    // Ensure we return a valid route function or null
    if (current && (typeof current === 'function' || (typeof current === 'object' && current.url))) {
        return current;
    }
    
    return null;
};

// Helper to get route function
const getRouteFunction = (name) => {
    if (!name) {
        return null;
    }
    
    // Try to get route directly first
    let routeFunction = routes[name];
    
    // If not found, try nested route (e.g., 'admin.dashboard')
    if (!routeFunction && name.includes('.')) {
        routeFunction = getNestedRoute(routes, name);
    }
    
    // If still not found and name starts with 'admin.', try accessing routes.admin directly
    if (!routeFunction && name.startsWith('admin.')) {
        const remainingPath = name.substring(6); // Remove 'admin.'
        if (routes.admin && typeof routes.admin === 'object') {
            // Split remaining path and navigate through admin object
            const remainingParts = remainingPath.split('.');
            let adminRoute = routes.admin;
            
            for (let i = 0; i < remainingParts.length; i++) {
                let part = remainingParts[i];
                
                if (adminRoute && typeof adminRoute === 'object') {
                    // Try direct property
                    if (part in adminRoute) {
                        adminRoute = adminRoute[part];
                    }
                    // Try camelCase if part contains dash
                    else if (part.includes('-')) {
                        const camelPart = toCamelCase(part);
                        if (camelPart in adminRoute) {
                            adminRoute = adminRoute[camelPart];
                        } else {
                            adminRoute = null;
                            break;
                        }
                    }
                    // If it's a function with definition, we found the route
                    else if (typeof adminRoute === 'function' && adminRoute.definition) {
                        break;
                    }
                    else {
                        adminRoute = null;
                        break;
                    }
                } else {
                    adminRoute = null;
                    break;
                }
            }
            
            if (adminRoute) {
                routeFunction = adminRoute;
            }
        }
    }
    
    return routeFunction;
};

// Setup route helper function for Wayfinder
const routeHelper = (name, params = {}) => {
    // If called without name (undefined, null, or empty string), return object with current method
    if (name === undefined || name === null || name === '') {
        return {
            current: (routeName) => {
                if (!routeName) {
                    return false;
                }
                
                // Handle wildcard pattern (e.g., 'admin.kecamatan.*')
                if (routeName.endsWith('.*')) {
                    const baseRoute = routeName.slice(0, -2); // Remove '.*'
                    const currentPath = window.location.pathname;
                    
                    // Try to get the base route
                    const routeFunction = getRouteFunction(baseRoute + '.index');
                    if (routeFunction && routeFunction.url) {
                        const baseUrl = routeFunction.url();
                        // Check if current path starts with base URL
                        return currentPath.startsWith(baseUrl.replace('/index', ''));
                    }
                    return false;
                }
                
                const currentPath = window.location.pathname;
                const routeFunction = getRouteFunction(routeName);
                
                if (!routeFunction || !routeFunction.url) {
                    return false;
                }
                
                const routeUrl = routeFunction.url();
                return currentPath === routeUrl || currentPath.startsWith(routeUrl + '/');
            }
        };
    }
    
    // Validate name is a string
    if (typeof name !== 'string') {
        console.error(`Route name must be a string, got:`, typeof name, name);
        return '#';
    }
    
    const routeFunction = getRouteFunction(name);
    
    if (!routeFunction) {
        console.error(`Route [${name}] not found.`);
        return '#';
    }
    
    // If routeFunction has a url method, call it
    if (typeof routeFunction.url === 'function') {
        try {
            const url = routeFunction.url(params);
            // Ensure we return a string
            if (typeof url === 'string') {
                return url;
            }
            console.error(`Route [${name}] url() returned non-string:`, typeof url, url);
            return '#';
        } catch (error) {
            console.error(`Error calling route [${name}].url():`, error);
            return '#';
        }
    }
    
    // Otherwise, call the function directly
    if (typeof routeFunction === 'function') {
        try {
            const result = routeFunction(params);
            if (result && typeof result === 'object' && typeof result.url === 'string') {
                return result.url;
            }
            console.error(`Route [${name}] function returned invalid result:`, result);
            return '#';
        } catch (error) {
            console.error(`Error calling route [${name}] function:`, error);
            return '#';
        }
    }
    
    console.error(`Route [${name}] is not a valid route function:`, typeof routeFunction, routeFunction);
    return '#';
};

// Add current method to route helper (for backward compatibility)
routeHelper.current = (name) => {
    if (!name) {
        return false;
    }
    
    const currentPath = window.location.pathname;
    const routeFunction = getRouteFunction(name);
    
    if (!routeFunction || !routeFunction.url) {
        return false;
    }
    
    const routeUrl = routeFunction.url();
    return currentPath === routeUrl || currentPath.startsWith(routeUrl + '/');
};

// Make route helper available globally
window.route = routeHelper;

