const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const app = express();

const PORT = process.env.PORT || 3000;
const DATA_FILE = path.join(__dirname, 'data', 'testimonies.json');
const ACTIVE_FILE = path.join(__dirname, 'data', 'active.json');

// Middleware
app.use(express.json());
app.use(express.static('public'));

// Initialize data files
async function initializeDataFiles() {
    try {
        await fs.mkdir(path.join(__dirname, 'data'), { recursive: true });
        
        try {
            await fs.access(DATA_FILE);
        } catch {
            await fs.writeFile(DATA_FILE, JSON.stringify([]));
        }
        
        try {
            await fs.access(ACTIVE_FILE);
        } catch {
            await fs.writeFile(ACTIVE_FILE, JSON.stringify({ id: null }));
        }
    } catch (error) {
        console.error('Error initializing data files:', error);
    }
}

// API Routes

// Get all testimonies
app.get('/api/testimonies', async (req, res) => {
    try {
        const data = await fs.readFile(DATA_FILE, 'utf8');
        res.json({ success: true, data: JSON.parse(data) });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// Add new testimony
app.post('/api/testimonies', async (req, res) => {
    try {
        const { name, text } = req.body;
        
        if (!name || !text) {
            return res.status(400).json({ success: false, error: 'Missing name or text' });
        }
        
        const data = JSON.parse(await fs.readFile(DATA_FILE, 'utf8'));
        
        const newTestimony = {
            id: Date.now().toString() + Math.floor(Math.random() * 1000),
            name: name.trim(),
            text: text.trim(),
            timestamp: new Date().toLocaleTimeString('en-US', { 
                hour: 'numeric', 
                minute: '2-digit', 
                second: '2-digit',
                hour12: true 
            })
        };
        
        data.push(newTestimony);
        await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2));
        
        res.json({ success: true, data: newTestimony });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// Delete testimony
app.delete('/api/testimonies/:id', async (req, res) => {
    try {
        const { id } = req.params;
        
        let data = JSON.parse(await fs.readFile(DATA_FILE, 'utf8'));
        data = data.filter(item => item.id !== id);
        await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2));
        
        // Clear active if deleted testimony was active
        const active = JSON.parse(await fs.readFile(ACTIVE_FILE, 'utf8'));
        if (active.id === id) {
            await fs.writeFile(ACTIVE_FILE, JSON.stringify({ id: null }, null, 2));
        }
        
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// Get active testimony
app.get('/api/active', async (req, res) => {
    try {
        const data = await fs.readFile(ACTIVE_FILE, 'utf8');
        res.json({ success: true, data: JSON.parse(data) });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// Set active testimony
app.post('/api/active', async (req, res) => {
    try {
        const { id, isRainActive } = req.body;
        
        // Read current state first to merge if needed
        let current = {};
        try {
             current = JSON.parse(await fs.readFile(ACTIVE_FILE, 'utf8'));
        } catch {}

        const active = { 
            id: id !== undefined ? id : current.id, 
            isRainActive: isRainActive !== undefined ? isRainActive : (current.isRainActive !== undefined ? current.isRainActive : true)
        };
        
        await fs.writeFile(ACTIVE_FILE, JSON.stringify(active, null, 2));
        res.json({ success: true, data: active });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// Serve HTML pages
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/media', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'media.html'));
});

app.get('/projection', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'projection.html'));
});

// 404 handler
app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'public', '404.html'));
});

// Start server
initializeDataFiles().then(() => {
    app.listen(PORT, () => {
        console.log(`✨ Year-End Testimony Server running on port ${PORT}`);
        console.log(`🌐 Access at: http://localhost:${PORT}`);
    });
});
