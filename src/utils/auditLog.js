import { collection, addDoc, serverTimestamp, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebaseConfig';

/**
 * Log admin action ke Firestore
 * @param {string} action - Action type: 'create', 'update', 'delete'
 * @param {string} type - Entity type: 'project', 'tool'
 * @param {string} adminUid - Admin user UID
 * @param {object} data - Data yang di-modify
 * @param {string} oldData - Previous data (untuk update)
 * @returns {Promise<void>}
 */
export const logAdminAction = async (action, type, adminUid, data, oldData = null) => {
  try {

    if (!db) {
      console.warn('[AUDIT] Firestore not initialized');
      return;
    }

    const logEntry = {
      action,           // 'create' | 'update' | 'delete'
      type,             // 'project' | 'tool'
      adminUid,
      timestamp: serverTimestamp(),
      data: sanitizeData(data),
      changes: oldData ? getChanges(oldData, data) : null,
      userAgent: navigator.userAgent,
    };

    await addDoc(collection(db, 'audit_logs'), logEntry);

  } catch (error) {

    console.error('[AUDIT ERROR]', error);
  }
};

/**
 * Get audit logs untuk admin (untuk future audit dashboard)
 * @param {string} adminUid - Filter by admin UID (optional)
 * @param {string} type - Filter by entity type (optional)
 * @param {number} limit - Limit number of records
 * @returns {Promise<Array>}
 */
export const getAuditLogs = async (adminUid = null, type = null, limit = 100) => {
  try {
    let constraints = [];

    if (adminUid) {
      constraints.push(where('adminUid', '==', adminUid));
    }

    if (type) {
      constraints.push(where('type', '==', type));
    }

    const q = constraints.length > 0
      ? query(collection(db, 'audit_logs'), ...constraints)
      : collection(db, 'audit_logs');
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      timestamp: doc.data().timestamp?.toDate?.() || null,
    }));
  } catch (error) {
    console.error('[AUDIT FETCH ERROR]', error);
    return [];
  }
};

/**
 * Sanitize data sebelum disimpan ke audit log
 * Hapus sensitive fields yang tidak perlu di-log
 * @param {object} data
 * @returns {object}
 */
const sanitizeData = (data) => {
  if (!data || typeof data !== 'object') return data;

  const sanitized = { ...data };

  const sensitiveFields = [
    'password',
    'secret',
    'token',
    'apiKey',
    'privateKey',
  ];

  sensitiveFields.forEach(field => {
    if (field in sanitized) {
      delete sanitized[field];
    }
  });

  return sanitized;
};

/**
 * Get the differences antara old dan new data
 * Useful untuk tracking apa yang berubah
 * @param {object} oldData
 * @param {object} newData
 * @returns {object} - Changes object
 */
const getChanges = (oldData, newData) => {
  const changes = {};
  const allKeys = new Set([...Object.keys(oldData), ...Object.keys(newData)]);
  allKeys.forEach(key => {
    const oldVal = oldData[key];
    const newVal = newData[key];
    if (JSON.stringify(oldVal) !== JSON.stringify(newVal)) {
      changes[key] = {
        before: oldVal,
        after: newVal,
      };
    }
  });

  return Object.keys(changes).length > 0 ? changes : null;
};

/**
 * Validate audit logs are being created (untuk production checks)
 * @returns {Promise<boolean>}
 */
export const validateAuditLogging = async () => {
  try {
    const logs = await getDocs(collection(db, 'audit_logs'));
    return logs.size > 0;
  } catch (error) {
    console.error('[AUDIT VALIDATION ERROR]', error);
    return false;
  }
};

/**
 * Clear old audit logs (older than X days)
 * Run via Cloud Scheduler atau manual trigger
 * @param {number} daysToKeep - Keep logs from last X days
 * @returns {Promise<number>} - Number of deleted logs
 */
export const cleanupOldAuditLogs = async (daysToKeep = 90) => {
  try {
    console.warn('[AUDIT] Cleanup should be run via Cloud Function');
    return 0;
  } catch (error) {
    console.error('[AUDIT CLEANUP ERROR]', error);
    return 0;
  }
};
