// server-only module
import EventEmitter from "events";

const broadcaster = new EventEmitter();

// Increase default max listeners to avoid warnings in dev
broadcaster.setMaxListeners(100);

export { broadcaster };
