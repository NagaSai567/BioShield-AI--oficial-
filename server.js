const express = require('express');
const cors = require('cors');
const axios = require('axios');
const { createClient } = require('@supabase/supabase-js');

const app = express();
const PORT = process.env.PORT || 3000;

const OPENROUTER_API_KEY = "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";
const SUPABASE_URL = "https://jwdpxjhoyieeytwxtdal.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp3ZHB4amhveWllZXl0d3h0ZGFsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODMyNDg4NzIsImV4cCI6MjA5ODgyNDg3Mn0.d29xRojD0ixA2C_1kLSGgNZd3JqX1twyq8_9CaAkrhM";

app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.static('.')); 

let supabase = null;
const getSupabase = () => {
    if (!supabase && SUPABASE_URL && SUPABASE_ANON_KEY) {
        try {
            supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
        } catch (error) {
            console.error('Failed to init Supabase:', error.message);
        }
    }
    return supabase;
};

// GET /api/schemes
let schemesCache = null;
let schemesLastFetch = null;
const CACHE_DURATION_MS = 7 * 24 * 60 * 60 * 1000; 

app.get('/api/schemes', async (req, res) => {
    const now = Date.now();
    if (schemesCache && schemesLastFetch && (now - schemesLastFetch < CACHE_DURATION_MS)) {
        return res.json({ source: 'cache', data: schemesCache, lastUpdated: schemesLastFetch });
    }

    const fetchedSchemes = [
        { id: 1, name: "PM-KISAN (Pradhan Mantri Kisan Samman Nidhi)", description: "Provides income support of ₹6,000 per year to all landholding farmer families.", link: "https://pmkisan.gov.in/" },
        { id: 2, name: "Pradhan Mantri Fasal Bima Yojana (PMFBY)", description: "Crop insurance scheme providing financial support to farmers suffering crop loss/damage arising out of unforeseen events.", link: "https://pmfby.gov.in/" },
        { id: 3, name: "Soil Health Card Scheme", description: "Assists State Governments to issue Soil Health Cards to all farmers in the country.", link: "https://soilhealth.dac.gov.in/" },
        { id: 4, name: "Paramparagat Krishi Vikas Yojana (PKVY)", description: "Promotes organic farming through cluster approach and Participatory Guarantee System (PGS) certification.", link: "https://pgsindia-ncof.gov.in/pkvy/index.aspx" },
        { id: 5, name: "Kisan Credit Card (KCC)", description: "Provides farmers with timely and adequate credit for agricultural expenses.", link: "https://www.rbi.org.in/" },
        { id: 6, name: "National Mission for Sustainable Agriculture (NMSA)", description: "Focuses on enhancing agricultural productivity especially in rainfed areas focusing on integrated farming, water use efficiency, soil health management.", link: "https://nmsa.dac.gov.in/" },
        { id: 7, name: "e-NAM (National Agriculture Market)", description: "A pan-India electronic trading portal which networks the existing APMC mandis to create a unified national market for agricultural commodities.", link: "https://enam.gov.in/" },
        { id: 8, name: "Rashtriya Krishi Vikas Yojana (RKVY)", description: "Incentivizes states to increase public investment in agriculture and allied sectors.", link: "https://rkvy.nic.in/" }
    ];

    schemesCache = fetchedSchemes;
    schemesLastFetch = now;
    res.json({ source: 'fresh', data: schemesCache, lastUpdated: schemesLastFetch });
});

// GET /api/organic-data: Restructured by crop (14+ Crops)
app.get('/api/organic-data', (req, res) => {
    const data = {
        crops: [
            {
                name: "Rice (Paddy)",
                diseases: "Blast, Brown Spot, Sheath Blight, Stem Borer",
                solutions: "Use Pseudomonas fluorescens seed treatment. Neem seed kernel extract (NSKE) 5% for pest control.",
                manures: "Farmyard Manure (FYM), Green leaf manure, Azolla, Vermicompost."
            },
            {
                name: "Wheat",
                diseases: "Rust (Yellow/Brown), Smut, Aphids, Termites",
                solutions: "Crop rotation, use of Trichoderma viride. Neem oil spray for aphids.",
                manures: "Well-rotted FYM, Biofertilizers like Azotobacter and Phosphobacteria."
            },
            {
                name: "Cotton",
                diseases: "Bollworm, Whitefly, Leaf Curl, Root Rot",
                solutions: "Install pheromone traps, spray Neem oil or Bt formulations. Yellow sticky traps for whiteflies.",
                manures: "Compost, Vermicompost, and application of Neem cake to soil."
            },
            {
                name: "Tomato",
                diseases: "Late Blight, Leaf Curl, Nematodes, Fruit Borer",
                solutions: "Companion planting with marigold for nematodes. Copper-based organic sprays for blight. Neem oil.",
                manures: "Bone meal (for calcium/preventing blossom end rot), Vermicompost, Seaweed extract."
            },
            {
                name: "Sugarcane",
                diseases: "Red Rot, Smut, Shoot Borer, White Fly",
                solutions: "Set treatment with Trichoderma. Use light traps for borers. Neem formulations for white fly.",
                manures: "Press mud, Vermicompost, Green manuring with Sesbania."
            },
            {
                name: "Maize (Corn)",
                diseases: "Fall Armyworm, Stalk Rot, Leaf Blight",
                solutions: "Application of Metarhizium anisopliae. Intercropping with legumes. Neem-based pesticides.",
                manures: "FYM, Poultry manure, Azospirillum biofertilizer."
            },
            {
                name: "Potato",
                diseases: "Late Blight, Early Blight, Potato Tuber Moth",
                solutions: "Use healthy seed tubers. Copper fungicides (organic approved). Pheromone traps for moths.",
                manures: "Well-decomposed FYM, Vermicompost, Wood ash for potassium."
            },
            {
                name: "Soybean",
                diseases: "Yellow Mosaic Virus, Rust, Stem Borer",
                solutions: "Grow resistant varieties. Yellow sticky traps for whiteflies (virus vectors). Neem seed extract.",
                manures: "Rhizobium inoculation, FYM, Phosphotica."
            },
            {
                name: "Onion",
                diseases: "Purple Blotch, Thrips, Bulb Rot",
                solutions: "Crop rotation. Spraying Neem oil + liquid soap for thrips. Proper drainage to prevent rot.",
                manures: "Vermicompost, Neem cake, Wood ash."
            },
            {
                name: "Groundnut (Peanut)",
                diseases: "Tikka Disease, Rust, White Grub",
                solutions: "Seed treatment with Trichoderma. Light traps for adult grubs. Neem oil spray.",
                manures: "Gypsum application, Rhizobium, FYM."
            },
            {
                name: "Chilli",
                diseases: "Leaf Curl Virus, Anthracnose, Fruit Borer, Thrips",
                solutions: "Yellow sticky traps. Border cropping with tall plants. Spraying of Bt for fruit borer.",
                manures: "Vermicompost, Sheep/Goat manure, Neem cake."
            },
            {
                name: "Mustard",
                diseases: "White Rust, Aphids, Alternaria Blight",
                solutions: "Early sowing to avoid aphids. Yellow sticky traps. Neem oil (2%).",
                manures: "FYM, Azotobacter, Phosphorus solubilizing bacteria (PSB)."
            },
            {
                name: "Cabbage",
                diseases: "Diamondback Moth, Black Rot, Cabbage Butterfly",
                solutions: "Bt sprays for caterpillars. Intercropping with mustard as trap crop. Neem formulations.",
                manures: "Heavy application of FYM, Vermicompost, Poultry manure."
            },
            {
                name: "Banana",
                diseases: "Panama Wilt, Bunchy Top, Sigatoka Leaf Spot, Nematodes",
                solutions: "Plant disease-free suckers. Neem cake application for nematodes. Organic copper sprays.",
                manures: "FYM, Wood ash (high potassium), Vermicompost, Green leaf manure."
            }
        ]
    };
    res.json(data);
});

app.listen(PORT, () => {
    console.log(`BioShield AI Server running on http://localhost:${PORT}`);
});
