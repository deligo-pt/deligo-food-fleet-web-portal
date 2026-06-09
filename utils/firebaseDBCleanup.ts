export function cleanupFirebaseDatabases() {
    const dbNames = [
        "firebase-messaging-database",
        "firebase-installations-database",
        "firebase-heartbeat-database",
        "firebaseLocalStorageDb"
    ];

    dbNames.forEach((name) => {
        try {
            const req = indexedDB.deleteDatabase(name);

            req.onsuccess = () => console.log(`[DB Cleanup] Deleted: ${name}`);
            req.onerror = () => console.warn(`[DB Cleanup] Failed: ${name}`);
            req.onblocked = () => console.warn(`[DB Cleanup] Blocked: ${name}`);
        } catch (e) {
            console.warn(`[DB Cleanup] Error deleting ${name}`, e);
        }
    });
}