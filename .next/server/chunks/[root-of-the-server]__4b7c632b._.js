module.exports = [
"[project]/.next-internal/server/app/(routes)/api/notifications/stream/route/actions.js [app-rsc] (server actions loader, ecmascript)", ((__turbopack_context__, module, exports) => {

}),
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/events [external] (events, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("events", () => require("events"));

module.exports = mod;
}),
"[project]/src/lib/notifications/broadcaster.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// server-only module
__turbopack_context__.s([
    "broadcaster",
    ()=>broadcaster
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$events__$5b$external$5d$__$28$events$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/events [external] (events, cjs)");
;
const broadcaster = new __TURBOPACK__imported__module__$5b$externals$5d2f$events__$5b$external$5d$__$28$events$2c$__cjs$29$__["default"]();
// Increase default max listeners to avoid warnings in dev
broadcaster.setMaxListeners(100);
;
}),
"[project]/src/app/(routes)/api/notifications/stream/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>GET,
    "runtime",
    ()=>runtime
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$notifications$2f$broadcaster$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/notifications/broadcaster.ts [app-route] (ecmascript)");
;
const runtime = "nodejs"; // ensure Node runtime if you need it
async function GET(req) {
    const headers = new Headers({
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache, no-transform",
        Connection: "keep-alive"
    });
    const encoder = new TextEncoder();
    const stream = new ReadableStream({
        start (controller) {
            const onNotify = (payload)=>{
                // SSE message: event: notification\ndata: {...}\n\n
                const data = `event: notification\ndata: ${JSON.stringify(payload)}\n\n`;
                controller.enqueue(encoder.encode(data));
            };
            // keep the connection alive: send a comment every 15s
            const keepAlive = setInterval(()=>{
                controller.enqueue(encoder.encode(":\n\n"));
            }, 15000);
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$notifications$2f$broadcaster$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["broadcaster"].on("notify", onNotify);
            // cancel is called when client disconnects
            this.cancel = ()=>{
                __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$notifications$2f$broadcaster$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["broadcaster"].off("notify", onNotify);
                clearInterval(keepAlive);
                try {
                    controller.close();
                } catch (e) {}
            };
            console.log('Consection Esablished');
        },
        cancel () {
        // fallback cancellation (already bound in start)
        }
    });
    return new Response(stream, {
        headers
    });
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__4b7c632b._.js.map