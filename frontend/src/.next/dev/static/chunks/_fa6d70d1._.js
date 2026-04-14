(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/lib/constants.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "API_BASE_URL",
    ()=>API_BASE_URL,
    "ARMY_RANKS",
    ()=>ARMY_RANKS,
    "BENEFIT_CATEGORIES",
    ()=>BENEFIT_CATEGORIES,
    "DOCUMENT_TYPES",
    ()=>DOCUMENT_TYPES,
    "GRIEVANCE_STATUS",
    ()=>GRIEVANCE_STATUS,
    "INDIAN_STATES",
    ()=>INDIAN_STATES,
    "SLA_DAYS",
    ()=>SLA_DAYS,
    "STATUS_CONFIG",
    ()=>STATUS_CONFIG
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
const API_BASE_URL = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';
const BENEFIT_CATEGORIES = {
    pension: {
        label: 'Pension',
        color: 'blue'
    },
    medical: {
        label: 'Medical (ECHS)',
        color: 'green'
    },
    education: {
        label: 'Education',
        color: 'purple'
    },
    housing: {
        label: 'Housing',
        color: 'orange'
    },
    resettlement: {
        label: 'Resettlement',
        color: 'teal'
    }
};
const STATUS_CONFIG = {
    draft: {
        label: 'Draft',
        color: 'gray'
    },
    submitted: {
        label: 'Submitted',
        color: 'blue'
    },
    under_review: {
        label: 'Under Review',
        color: 'yellow'
    },
    approved: {
        label: 'Approved',
        color: 'green'
    },
    rejected: {
        label: 'Rejected',
        color: 'red'
    },
    escalated: {
        label: 'Escalated',
        color: 'orange'
    }
};
const GRIEVANCE_STATUS = {
    open: {
        label: 'Open',
        color: 'red'
    },
    in_progress: {
        label: 'In Progress',
        color: 'yellow'
    },
    resolved: {
        label: 'Resolved',
        color: 'green'
    },
    escalated: {
        label: 'Escalated',
        color: 'orange'
    },
    closed: {
        label: 'Closed',
        color: 'gray'
    }
};
const DOCUMENT_TYPES = {
    discharge_certificate: 'Discharge Certificate',
    service_record: 'Service Record',
    pension_ppo: 'Pension PPO',
    id_proof: 'ID Proof',
    address_proof: 'Address Proof',
    medical_certificate: 'Medical Certificate',
    other: 'Other'
};
const ARMY_RANKS = [
    {
        value: 'sepoy',
        label: 'Sepoy'
    },
    {
        value: 'naik',
        label: 'Naik'
    },
    {
        value: 'havildar',
        label: 'Havildar'
    },
    {
        value: 'subedar',
        label: 'Subedar'
    },
    {
        value: 'subedar_major',
        label: 'Subedar Major'
    },
    {
        value: 'lieutenant',
        label: 'Lieutenant'
    },
    {
        value: 'captain',
        label: 'Captain'
    },
    {
        value: 'major',
        label: 'Major'
    },
    {
        value: 'lt_colonel',
        label: 'Lt. Colonel'
    },
    {
        value: 'colonel',
        label: 'Colonel'
    },
    {
        value: 'brigadier',
        label: 'Brigadier'
    },
    {
        value: 'major_general',
        label: 'Major General'
    },
    {
        value: 'lt_general',
        label: 'Lt. General'
    },
    {
        value: 'general',
        label: 'General'
    }
];
const INDIAN_STATES = [
    'Andhra Pradesh',
    'Arunachal Pradesh',
    'Assam',
    'Bihar',
    'Chhattisgarh',
    'Goa',
    'Gujarat',
    'Haryana',
    'Himachal Pradesh',
    'Jharkhand',
    'Karnataka',
    'Kerala',
    'Madhya Pradesh',
    'Maharashtra',
    'Manipur',
    'Meghalaya',
    'Mizoram',
    'Nagaland',
    'Odisha',
    'Punjab',
    'Rajasthan',
    'Sikkim',
    'Tamil Nadu',
    'Telangana',
    'Tripura',
    'Uttar Pradesh',
    'Uttarakhand',
    'West Bengal',
    'Delhi',
    'Jammu & Kashmir',
    'Ladakh'
];
const SLA_DAYS = {
    pension: 30,
    medical: 15,
    education: 21,
    housing: 45,
    resettlement: 30
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/utils.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "capitalize",
    ()=>capitalize,
    "clearTokens",
    ()=>clearTokens,
    "cn",
    ()=>cn,
    "formatDate",
    ()=>formatDate,
    "formatDateTime",
    ()=>formatDateTime,
    "formatIPFSHash",
    ()=>formatIPFSHash,
    "formatStatus",
    ()=>formatStatus,
    "formatTxHash",
    ()=>formatTxHash,
    "getAccessToken",
    ()=>getAccessToken,
    "isValidEmail",
    ()=>isValidEmail,
    "isValidServiceNumber",
    ()=>isValidServiceNumber,
    "setTokens",
    ()=>setTokens,
    "timeAgo",
    ()=>timeAgo,
    "truncate",
    ()=>truncate
]);
function cn(...classes) {
    return classes.filter(Boolean).join(' ');
}
function formatDate(dateStr) {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
    });
}
function formatDateTime(dateStr) {
    const date = new Date(dateStr);
    return date.toLocaleString('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}
function timeAgo(dateStr) {
    const now = new Date();
    const date = new Date(dateStr);
    const diff = Math.floor((now.getTime() - date.getTime()) / 1000);
    if (diff < 60) return 'Just now';
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    return `${Math.floor(diff / 86400)}d ago`;
}
function truncate(str, length) {
    return str.length > length ? str.slice(0, length) + '...' : str;
}
function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}
function formatStatus(status) {
    return status.replace(/_/g, ' ').replace(/\b\w/g, (c)=>c.toUpperCase());
}
function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
function isValidServiceNumber(sn) {
    return /^[0-9]{7,8}[A-Z]$/.test(sn.toUpperCase());
}
function getAccessToken() {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    return localStorage.getItem('access_token');
}
function setTokens(access, refresh) {
    localStorage.setItem('access_token', access);
    localStorage.setItem('refresh_token', refresh);
}
function clearTokens() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
}
function formatIPFSHash(hash) {
    if (!hash || hash.length < 10) return hash;
    return `${hash.slice(0, 8)}...${hash.slice(-4)}`;
}
function formatTxHash(hash) {
    if (!hash || hash.length < 10) return hash;
    return `${hash.slice(0, 6)}...${hash.slice(-4)}`;
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/api.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/axios/lib/axios.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/constants.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils.ts [app-client] (ecmascript)");
;
;
;
const api = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].create({
    baseURL: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["API_BASE_URL"],
    headers: {
        'Content-Type': 'application/json'
    }
});
api.interceptors.request.use((config)=>{
    const token = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAccessToken"])();
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
}, (error)=>Promise.reject(error));
api.interceptors.response.use((response)=>response, async (error)=>{
    if (error.response?.status === 401) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clearTokens"])();
        window.location.href = '/login';
    }
    return Promise.reject(error);
});
const __TURBOPACK__default__export__ = api;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/auth.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getCurrentUser",
    ()=>getCurrentUser,
    "loginUser",
    ()=>loginUser,
    "logoutUser",
    ()=>logoutUser,
    "registerVeteran",
    ()=>registerVeteran,
    "resendOTP",
    ()=>resendOTP,
    "sendOTP",
    ()=>sendOTP,
    "verifyOTP",
    ()=>verifyOTP
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/api.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils.ts [app-client] (ecmascript)");
;
;
async function registerVeteran(data) {
    await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].post('/auth/register/', data);
}
async function sendOTP(email) {
    await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].post('/auth/send-otp/', {
        email
    });
}
async function verifyOTP(data) {
    await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].post('/auth/verify-otp/', data);
}
async function loginUser(data) {
    const response = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].post('/auth/login/', data);
    const { access, refresh, user } = response.data;
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["setTokens"])(access, refresh);
    return {
        tokens: {
            access,
            refresh
        },
        user
    };
}
function logoutUser() {
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clearTokens"])();
    window.location.href = '/login';
}
async function getCurrentUser() {
    const response = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].get('/auth/me/');
    return response.data;
}
async function resendOTP(email) {
    await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].post('/auth/send-otp/', {
        email
    });
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/store/authStore.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useAuthStore",
    ()=>useAuthStore
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$react$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/zustand/esm/react.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$middleware$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/zustand/esm/middleware.mjs [app-client] (ecmascript)");
;
;
const useAuthStore = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$react$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["create"])()((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$middleware$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["persist"])((set)=>({
        user: null,
        isLoggedIn: false,
        isLoading: false,
        setUser: (user)=>set({
                user,
                isLoggedIn: true
            }),
        clearUser: ()=>set({
                user: null,
                isLoggedIn: false
            }),
        setLoading: (loading)=>set({
                isLoading: loading
            })
    }), {
    name: 'veerseva-auth',
    partialize: (state)=>({
            user: state.user,
            isLoggedIn: state.isLoggedIn
        })
}));
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/ui/Button.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Button
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils.ts [app-client] (ecmascript)");
;
;
function Button({ variant = 'primary', size = 'md', loading = false, children, className, disabled, ...props }) {
    const base = 'inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
    const variants = {
        primary: 'bg-green-700 hover:bg-green-800 text-white focus:ring-green-600',
        secondary: 'bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500',
        danger: 'bg-red-600 hover:bg-red-700 text-white focus:ring-red-500',
        ghost: 'bg-transparent hover:bg-gray-100 text-gray-700 focus:ring-gray-400',
        outline: 'border-2 border-green-700 text-green-700 hover:bg-green-50 focus:ring-green-600'
    };
    const sizes = {
        sm: 'px-3 py-1.5 text-sm',
        md: 'px-5 py-2.5 text-sm',
        lg: 'px-6 py-3 text-base'
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])(base, variants[variant], sizes[size], className),
        disabled: disabled || loading,
        ...props,
        children: [
            loading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                className: "animate-spin -ml-1 mr-2 h-4 w-4",
                fill: "none",
                viewBox: "0 0 24 24",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                        className: "opacity-25",
                        cx: "12",
                        cy: "12",
                        r: "10",
                        stroke: "currentColor",
                        strokeWidth: "4"
                    }, void 0, false, {
                        fileName: "[project]/components/ui/Button.tsx",
                        lineNumber: 48,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                        className: "opacity-75",
                        fill: "currentColor",
                        d: "M4 12a8 8 0 018-8v8H4z"
                    }, void 0, false, {
                        fileName: "[project]/components/ui/Button.tsx",
                        lineNumber: 53,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/ui/Button.tsx",
                lineNumber: 43,
                columnNumber: 9
            }, this),
            children
        ]
    }, void 0, true, {
        fileName: "[project]/components/ui/Button.tsx",
        lineNumber: 37,
        columnNumber: 5
    }, this);
}
_c = Button;
var _c;
__turbopack_context__.k.register(_c, "Button");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/ui/Input.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Input
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils.ts [app-client] (ecmascript)");
;
;
function Input({ label, error, hint, className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "w-full",
        children: [
            label && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                className: "block text-sm font-medium text-gray-700 mb-1.5",
                children: [
                    label,
                    props.required && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-red-500 ml-1",
                        children: "*"
                    }, void 0, false, {
                        fileName: "[project]/components/ui/Input.tsx",
                        lineNumber: 21,
                        columnNumber: 30
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/ui/Input.tsx",
                lineNumber: 19,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('w-full px-4 py-2.5 rounded-lg border text-sm transition-colors duration-200', 'focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent', 'placeholder:text-gray-400', error ? 'border-red-400 bg-red-50' : 'border-gray-300 bg-white hover:border-gray-400', className),
                ...props
            }, void 0, false, {
                fileName: "[project]/components/ui/Input.tsx",
                lineNumber: 24,
                columnNumber: 7
            }, this),
            error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "mt-1.5 text-xs text-red-600",
                children: error
            }, void 0, false, {
                fileName: "[project]/components/ui/Input.tsx",
                lineNumber: 37,
                columnNumber: 9
            }, this),
            hint && !error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "mt-1.5 text-xs text-gray-500",
                children: hint
            }, void 0, false, {
                fileName: "[project]/components/ui/Input.tsx",
                lineNumber: 40,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/ui/Input.tsx",
        lineNumber: 17,
        columnNumber: 5
    }, this);
}
_c = Input;
var _c;
__turbopack_context__.k.register(_c, "Input");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/(auth)/login/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>LoginPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Shield$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/shield.js [app-client] (ecmascript) <export default as Shield>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$eye$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Eye$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/eye.js [app-client] (ecmascript) <export default as Eye>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$eye$2d$off$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__EyeOff$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/eye-off.js [app-client] (ecmascript) <export default as EyeOff>");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/auth.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$store$2f$authStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/store/authStore.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$Button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/Button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$Input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/Input.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
;
;
;
function LoginPage() {
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const { setUser, setLoading } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$store$2f$authStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuthStore"])();
    const [form, setForm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        email: '',
        password: ''
    });
    const [showPassword, setShowPassword] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [loading, setLoadingLocal] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    async function handleSubmit(e) {
        e.preventDefault();
        setError('');
        setLoadingLocal(true);
        setLoading(true);
        try {
            const { user } = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["loginUser"])(form);
            setUser(user);
            // Redirect based on role
            if (user.role === 'officer' || user.role === 'ministry') {
                router.replace('/officer/dashboard');
            } else {
                router.replace('/dashboard');
            }
        } catch (err) {
            setError(err.response?.data?.detail || err.response?.data?.message || 'Invalid email or password');
        } finally{
            setLoadingLocal(false);
            setLoading(false);
        }
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen bg-linear-to-br from-green-50 to-blue-50 flex items-center justify-center p-7",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "w-full max-w-md",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "text-center mb-8",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "inline-flex items-center justify-center w-16 h-16 bg-green-700 rounded-2xl mb-4 shadow-lg",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Shield$3e$__["Shield"], {
                                size: 32,
                                className: "text-white"
                            }, void 0, false, {
                                fileName: "[project]/app/(auth)/login/page.tsx",
                                lineNumber: 56,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/(auth)/login/page.tsx",
                            lineNumber: 55,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                            className: "text-2xl font-bold text-gray-900",
                            children: "VeerSeva"
                        }, void 0, false, {
                            fileName: "[project]/app/(auth)/login/page.tsx",
                            lineNumber: 58,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-gray-500 text-sm mt-1",
                            children: "Veterans Benefits Portal"
                        }, void 0, false, {
                            fileName: "[project]/app/(auth)/login/page.tsx",
                            lineNumber: 59,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/(auth)/login/page.tsx",
                    lineNumber: 54,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "bg-white rounded-2xl shadow-xl border border-gray-100 p-8",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            className: "text-xl font-semibold text-gray-800 mb-6",
                            children: "Sign in to your account"
                        }, void 0, false, {
                            fileName: "[project]/app/(auth)/login/page.tsx",
                            lineNumber: 64,
                            columnNumber: 11
                        }, this),
                        error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700",
                            children: error
                        }, void 0, false, {
                            fileName: "[project]/app/(auth)/login/page.tsx",
                            lineNumber: 69,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                            onSubmit: handleSubmit,
                            className: "space-y-9",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$Input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    label: "Email Address",
                                    type: "email",
                                    placeholder: "Enter your email",
                                    required: true,
                                    value: form.email,
                                    onChange: (e)=>setForm({
                                            ...form,
                                            email: e.target.value
                                        })
                                }, void 0, false, {
                                    fileName: "[project]/app/(auth)/login/page.tsx",
                                    lineNumber: 75,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "relative",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$Input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                            label: "Password",
                                            type: showPassword ? 'text' : 'password',
                                            placeholder: "Enter your password",
                                            required: true,
                                            value: form.password,
                                            onChange: (e)=>setForm({
                                                    ...form,
                                                    password: e.target.value
                                                })
                                        }, void 0, false, {
                                            fileName: "[project]/app/(auth)/login/page.tsx",
                                            lineNumber: 85,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            type: "button",
                                            onClick: ()=>setShowPassword(!showPassword),
                                            className: "absolute right-3 top-6 text-gray-400 hover:text-gray-600",
                                            children: showPassword ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$eye$2d$off$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__EyeOff$3e$__["EyeOff"], {
                                                size: 18
                                            }, void 0, false, {
                                                fileName: "[project]/app/(auth)/login/page.tsx",
                                                lineNumber: 98,
                                                columnNumber: 33
                                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$eye$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Eye$3e$__["Eye"], {
                                                size: 18
                                            }, void 0, false, {
                                                fileName: "[project]/app/(auth)/login/page.tsx",
                                                lineNumber: 98,
                                                columnNumber: 56
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/app/(auth)/login/page.tsx",
                                            lineNumber: 93,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/(auth)/login/page.tsx",
                                    lineNumber: 84,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$Button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    type: "submit",
                                    variant: "primary",
                                    size: "lg",
                                    loading: loading,
                                    className: "w-full mt-4 top-1",
                                    children: "Sign In"
                                }, void 0, false, {
                                    fileName: "[project]/app/(auth)/login/page.tsx",
                                    lineNumber: 102,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/(auth)/login/page.tsx",
                            lineNumber: 74,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "mt-6 text-center text-sm text-gray-500",
                            children: [
                                "Don't have an account?",
                                ' ',
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    href: "/register",
                                    className: "text-green-700 font-semibold hover:underline",
                                    children: "Register here"
                                }, void 0, false, {
                                    fileName: "[project]/app/(auth)/login/page.tsx",
                                    lineNumber: 115,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/(auth)/login/page.tsx",
                            lineNumber: 113,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/(auth)/login/page.tsx",
                    lineNumber: 63,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-center text-xs text-gray-400 mt-6",
                    children: "Ministry of Defence — Government of India"
                }, void 0, false, {
                    fileName: "[project]/app/(auth)/login/page.tsx",
                    lineNumber: 124,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/(auth)/login/page.tsx",
            lineNumber: 51,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/(auth)/login/page.tsx",
        lineNumber: 50,
        columnNumber: 5
    }, this);
}
_s(LoginPage, "IPdH+3dNgYhadHpUqsSNZ9C21Bw=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$store$2f$authStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuthStore"]
    ];
});
_c = LoginPage;
var _c;
__turbopack_context__.k.register(_c, "LoginPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=_fa6d70d1._.js.map