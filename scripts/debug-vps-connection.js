const { createDirectus, rest, readItems } = require('@directus/sdk');

// Coba URL lokal (Docker) dan URL publik (Nginx)
const URLS = [
    'http://localhost:8055',
    'https://admin.nugrahalabib.com'
];

async function checkData() {
    console.log('--- DEBUGGING VPS DATA CONNECTION ---');

    for (const url of URLS) {
        console.log(`\nTesting URL: ${url}`);
        try {
            const client = createDirectus(url).with(rest());

            // Cek Blog Categories (Fitur Baru)
            console.log('Fetching blog_categories...');
            try {
                const categories = await client.request(readItems('blog_categories'));
                console.log(`✅ SUCCESS! Found ${categories.length} categories.`);
                console.log('Sample:', categories.map(c => c.name).join(', '));
            } catch (e) {
                console.log(`❌ FAILED to fetch categories: ${e.message}`);
                // Jika 403 Forbidden, berarti tabel ada tapi permission public belum dibuka
                // Jika 404 Not Found, berarti tabel TIDAK ADA (Database Salah!)
            }

        } catch (error) {
            console.log(`⚠️ Connection Failed: ${error.message}`);
        }
    }
    console.log('\n--- END DEBUG ---');
}

checkData();
