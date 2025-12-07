const DIRECTUS_URL = 'http://localhost:8055';
const EMAIL = 'admin@nugrahalabib.com';
const PASSWORD = 'password123';

async function setup() {
    console.log('🚀 Starting CMS Setup...');

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

    // Helper to create collection
    async function createCollection(name, options = {}) {
        console.log(`📦 Creating collection: ${name}...`);
        try {
            // Check if exists
            const checkRes = await fetch(`${DIRECTUS_URL}/collections/${name}`, { headers });
            if (checkRes.ok) {
                console.log(`   ⚠️ Collection ${name} already exists. Skipping.`);
                return;
            }

            const res = await fetch(`${DIRECTUS_URL}/collections`, {
                method: 'POST',
                headers,
                body: JSON.stringify({ collection: name, schema: {}, meta: {}, ...options }),
            });

            if (!res.ok) {
                const err = await res.json();
                throw new Error(err.errors[0].message);
            }
            console.log(`   ✅ Collection ${name} created.`);
        } catch (error) {
            console.error(`   ❌ Error creating ${name}:`, error.message);
        }
    }

    // Helper to create field
    async function createField(collection, field, type, interfaceType = null, options = {}) {
        console.log(`   🔹 Creating field ${field} in ${collection}...`);
        try {
            // Check if exists (simple check by trying to create, Directus errors if exists)
            // Better to check first to avoid error logs
            const checkRes = await fetch(`${DIRECTUS_URL}/fields/${collection}/${field}`, { headers });
            if (checkRes.ok) {
                console.log(`      ⚠️ Field ${field} already exists. Skipping.`);
                return;
            }

            const payload = {
                field,
                type,
                meta: {
                    interface: interfaceType,
                    special: options.special || null,
                    options: options.interfaceOptions || null,
                    note: options.note || null
                },
                schema: {
                    is_unique: options.unique || false,
                }
            };

            const res = await fetch(`${DIRECTUS_URL}/fields/${collection}`, {
                method: 'POST',
                headers,
                body: JSON.stringify(payload),
            });

            if (!res.ok) {
                const err = await res.json();
                throw new Error(err.errors[0].message);
            }
            console.log(`      ✅ Field ${field} created.`);
        } catch (error) {
            console.error(`      ❌ Error creating field ${field}:`, error.message);
        }
    }

    // --- 2. Create Collections ---

    // Posts
    await createCollection('posts', {
        meta: { icon: 'newspaper', note: 'Blog posts and articles' }
    });

    // Projects
    await createCollection('projects', {
        meta: { icon: 'rocket', note: 'Portfolio projects' }
    });

    // Journey
    await createCollection('journey', {
        meta: { icon: 'briefcase', note: 'Professional experience and history' }
    });

    // Global (Singleton)
    await createCollection('global', {
        meta: { icon: 'globe', note: 'Global site settings', singleton: true }
    });


    // --- 3. Create Fields ---

    // POSTS
    await createField('posts', 'title', 'string', 'input');
    await createField('posts', 'slug', 'string', 'input', { unique: true });
    await createField('posts', 'content', 'text', 'input-rich-text-html'); // WYSIWYG
    await createField('posts', 'image', 'uuid', 'file-image'); // Image
    await createField('posts', 'date_published', 'dateTime', 'datetime');
    // SEO Section
    await createField('posts', 'seo_title', 'string', 'input', { note: 'SEO Title (Meta)' });
    await createField('posts', 'seo_description', 'text', 'input-multiline', { note: 'SEO Description (Meta)' });
    await createField('posts', 'seo_keywords', 'string', 'tags', { note: 'Comma separated keywords' });

    // PROJECTS
    await createField('projects', 'title', 'string', 'input');
    await createField('projects', 'description', 'text', 'input-multiline');
    await createField('projects', 'image', 'uuid', 'file-image');
    await createField('projects', 'link', 'string', 'input');
    await createField('projects', 'category', 'string', 'select-dropdown', {
        interfaceOptions: {
            choices: [
                { text: "AI & Engineering", value: "AI & Engineering" },
                { text: "Content & Business", value: "Content & Business" },
                { text: "Architecture & Design", value: "Architecture & Design" }
            ]
        }
    });
    await createField('projects', 'tech_stack', 'json', 'tags'); // Tags/CSV stored as JSON

    // JOURNEY
    await createField('journey', 'role', 'string', 'input');
    await createField('journey', 'company', 'string', 'input');
    await createField('journey', 'start_date', 'date', 'date');
    await createField('journey', 'end_date', 'date', 'date');
    await createField('journey', 'description', 'text', 'input-multiline');

    // GLOBAL
    await createField('global', 'hero_headline', 'string', 'input');
    await createField('global', 'hero_subheadline', 'string', 'input');
    await createField('global', 'status_text', 'string', 'input');
    await createField('global', 'available_for_hire', 'boolean', 'boolean');

    // --- 4. Make Collections Public (Optional/Advanced - usually done via Roles, but we'll skip complex permission setup via script for now as it requires role ID fetching. User can set Public role in UI easily) ---
    console.log('⚠️ Note: Don\'t forget to set "Public" role permissions in Directus Admin Panel for these collections to be accessible via API without token if needed.');

    console.log('✨ CMS Setup Complete!');
}

setup();
