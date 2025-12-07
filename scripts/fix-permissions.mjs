const DIRECTUS_URL = 'http://127.0.0.1:8055';
const EMAIL = 'admin@nugrahalabib.com';
const PASSWORD = 'password123';

async function fixPermissions() {
    console.log('🚀 Fixing Permissions...');

    // 1. Login
    console.log('🔑 Authenticating...');
    let token;
    try {
        const loginRes = await fetch(`${DIRECTUS_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: EMAIL, password: PASSWORD }),
        });

        if (!loginRes.ok) throw new Error(`Login failed: ${loginRes.statusText}`);
        const loginData = await loginRes.json();
        token = loginData.data.access_token;
        console.log('✅ Authenticated!');
    } catch (error) {
        console.error('❌ Authentication Error:', error.message);
        return;
    }

    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
    };

    // 2. Get Public Role ID
    const rolesRes = await fetch(`${DIRECTUS_URL}/roles`, { headers });
    const roles = (await rolesRes.json()).data;
    const publicRole = roles.find(r => r.name === 'Public') || null; // Public role is usually null in permissions, but let's check permissions directly.

    // Actually, for Public permissions, the role is null.
    const PUBLIC_ROLE = null;

    // Helper to grant read access
    async function grantReadAccess(collection) {
        process.stdout.write(`   🔹 Granting READ on ${collection}... `);

        // Check existing permission
        const checkRes = await fetch(`${DIRECTUS_URL}/permissions?filter[role][_null]=true&filter[collection][_eq]=${collection}`, { headers });
        const existing = (await checkRes.json()).data;

        if (existing.length > 0) {
            // Update existing
            const permId = existing[0].id;
            await fetch(`${DIRECTUS_URL}/permissions/${permId}`, {
                method: 'PATCH',
                headers,
                body: JSON.stringify({
                    action: 'read',
                    fields: ['*'], // Grant all fields
                })
            });
            console.log(`✅ Updated.`);
        } else {
            // Create new
            await fetch(`${DIRECTUS_URL}/permissions`, {
                method: 'POST',
                headers,
                body: JSON.stringify({
                    role: PUBLIC_ROLE,
                    collection: collection,
                    action: 'read',
                    fields: ['*'],
                })
            });
            console.log(`✨ Created.`);
        }
    }

    // Grant access to collections
    await grantReadAccess('posts');
    await grantReadAccess('projects');
    await grantReadAccess('blog_highlights');
    await grantReadAccess('blog_highlights_posts');
    await grantReadAccess('seo');
    await grantReadAccess('global'); // Just in case

    console.log('\n✨ Permissions Fixed!');
}

fixPermissions();
