// lib/notifications/broadcaster.ts
import EventEmitter from "events";

// export type NotificationPayload = {
//   type?: string;
//   id?: string 
//   recipientId?: string 
//   title?: string;
//   message?: string;
//   [k: string]:any ;
// };


export interface Notif {
type?: string;
  id?: string 
  recipientId?: string 
  title?: string;
  message?: string;
}

class Broadcaster {
  private ee = new EventEmitter();

  constructor() {
    // increase default listeners limit to avoid dev warnings
    this.ee.setMaxListeners(200);
  }

  /**
   * Subscribe to all notifications.
   * Returns an unsubscribe function.
   */
  subscribe(handler: (payload: Notif) => void) {
    this.ee.on("notify", handler);
    console.log("[broadcaster] subscribe -> total:", this.ee.listenerCount("notify"));
    return () => {
      this.ee.off("notify", handler);
      console.log("[broadcaster] unsubscribe -> total:", this.ee.listenerCount("notify"));
    };
  }

  /**
   * Subscribe only for a specific recipientId.
   * The handler will only be called when payload.recipientId === userId.
   * Returns an unsubscribe function.
   */
  subscribeForUser(userId: string | number, handler: (payload: Notif) => void) {
    const wrapped = (payload: Notif) => {
      if (payload == null) return;
      // enforce filtering so this only fires for the intended user
      if (payload.recipientId == null) return;
      if (String(payload.recipientId) !== String(userId)) return;
      handler(payload);
    };
    this.ee.on("notify", wrapped);
    console.log(`[broadcaster] subscribeForUser(${userId}) -> total:`, this.ee.listenerCount("notify"));
    return () => {
      this.ee.off("notify", wrapped);
      console.log(`[broadcaster] unsubscribeForUser(${userId}) -> total:`, this.ee.listenerCount("notify"));
    };
  }

  /**
   * Publish a notification payload to all listeners.
   * Payload is deep-cloned before emit to avoid accidental mutation by listeners.
   */
  publish(payload: Notif) {
    try {
      const cloned = JSON.parse(JSON.stringify(payload));
      this.ee.emit("notify", cloned);
    } catch (err) {
      console.error("[broadcaster] publish error:", err);
    }
  }

  /**
   * How many listeners are currently registered for "notify".
   */
  listenerCount() {
    return this.ee.listenerCount("notify");
  }

  /**
   * Remove all listeners (useful in tests / dev hot-reload scenarios).
   */
  clearAll() {
    this.ee.removeAllListeners("notify");
  }

  /**
   * Inspect listeners (rarely needed).
   */
  listeners() {
    return this.ee.listeners("notify");
  }
}

export const broadcaster = new Broadcaster();
export default broadcaster;
