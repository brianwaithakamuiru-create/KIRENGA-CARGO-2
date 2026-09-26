const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();
const db = admin.firestore();

const DEFAULT_ADMIN_EMAIL = 'admin@kirenga.com';

exports.bootstrapAdmin = functions.https.onCall(async (data) => {
  const email = (data.email || DEFAULT_ADMIN_EMAIL).toLowerCase().trim();
  const password = data.password || '';
  const displayName = data.displayName || 'Administrator';

  if (!password || password.length < 8) {
    throw new functions.https.HttpsError('invalid-argument', 'Password must be at least 8 characters.');
  }

  const existingAdmins = await db.collection('users').where('role', '==', 'admin').limit(1).get();
  if (!existingAdmins.empty) {
    throw new functions.https.HttpsError('failed-precondition', 'An administrator already exists. Use the normal login page.');
  }

  let userRecord;
  try {
    userRecord = await admin.auth().getUserByEmail(email);
  } catch {
    userRecord = await admin.auth().createUser({
      email,
      password,
      displayName,
      emailVerified: true,
    });
  }

  const now = new Date().toISOString();
  await db.collection('users').doc(userRecord.uid).set(
    {
      email,
      displayName,
      role: 'admin',
      status: 'active',
      mustChangePassword: false,
      createdAt: now,
      updatedAt: now,
    },
    { merge: true }
  );

  await db.collection('auditLogs').add({
    userId: userRecord.uid,
    userName: displayName,
    action: 'BOOTSTRAP_ADMIN',
    resource: 'users',
    resourceId: userRecord.uid,
    details: { email },
    createdAt: now,
  });

  return { success: true, email, uid: userRecord.uid, message: 'Admin created. You can sign in at /login.' };
});

exports.needsBootstrap = functions.https.onCall(async () => {
  const existingAdmins = await db.collection('users').where('role', '==', 'admin').limit(1).get();
  return { needsBootstrap: existingAdmins.empty };
});

exports.createUserProfile = functions.https.onCall(async (data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError('unauthenticated', 'Must be signed in.');
  }
  const callerDoc = await db.collection('users').doc(context.auth.uid).get();
  if (!callerDoc.exists || callerDoc.data().role !== 'admin') {
    throw new functions.https.HttpsError('permission-denied', 'Only admins can create users.');
  }
  const { uid, email, displayName, role, phone } = data;
  if (!uid || !email || !role) {
    throw new functions.https.HttpsError('invalid-argument', 'uid, email and role required.');
  }
  await db.collection('users').doc(uid).set({
    email,
    displayName: displayName || '',
    role,
    phone: phone || '',
    status: 'active',
    mustChangePassword: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  });
  return { success: true, uid };
});

exports.updateShipmentStatus = functions.https.onCall(async (data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError('unauthenticated', 'Must be signed in.');
  }
  const { shipmentId, status, location } = data;
  if (!shipmentId || !status) {
    throw new functions.https.HttpsError('invalid-argument', 'shipmentId and status required.');
  }
  const userDoc = await db.collection('users').doc(context.auth.uid).get();
  if (!userDoc.exists) {
    throw new functions.https.HttpsError('permission-denied', 'User profile missing.');
  }
  const role = userDoc.data().role;
  if (!['admin', 'operations', 'dispatch', 'logistics', 'driver'].includes(role)) {
    throw new functions.https.HttpsError('permission-denied', 'Not authorized.');
  }
  const shipmentRef = db.collection('shipments').doc(shipmentId);
  const shipment = await shipmentRef.get();
  if (!shipment.exists) {
    throw new functions.https.HttpsError('not-found', 'Shipment not found.');
  }
  if (role === 'driver' && shipment.data().driverId !== context.auth.uid) {
    throw new functions.https.HttpsError('permission-denied', 'Not your assignment.');
  }
  const update = { status, updatedAt: new Date().toISOString() };
  if (location) {
    update.currentLocation = { ...location, updatedAt: new Date().toISOString() };
  }
  await shipmentRef.update(update);
  return { success: true };
});

exports.health = functions.https.onRequest((req, res) => {
  res.json({ status: 'ok', service: 'kirenga-cargo-2' });
});
