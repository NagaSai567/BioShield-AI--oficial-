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

// GET /api/organic-data: Expanded to 54 Crops
app.get('/api/organic-data', (req, res) => {
    const data = {
        crops: [
            // Original 14
            { name: "Rice (Paddy)", diseases: "Blast, Brown Spot, Sheath Blight, Stem Borer", solutions: "Use Pseudomonas fluorescens seed treatment. Neem seed kernel extract (NSKE) 5% for pest control.", manures: "Farmyard Manure (FYM), Green leaf manure, Azolla, Vermicompost." },
            { name: "Wheat", diseases: "Rust (Yellow/Brown), Smut, Aphids, Termites", solutions: "Crop rotation, use of Trichoderma viride. Neem oil spray for aphids.", manures: "Well-rotted FYM, Biofertilizers like Azotobacter and Phosphobacteria." },
            { name: "Cotton", diseases: "Bollworm, Whitefly, Leaf Curl, Root Rot", solutions: "Install pheromone traps, spray Neem oil or Bt formulations. Yellow sticky traps for whiteflies.", manures: "Compost, Vermicompost, and application of Neem cake to soil." },
            { name: "Tomato", diseases: "Late Blight, Leaf Curl, Nematodes, Fruit Borer", solutions: "Companion planting with marigold for nematodes. Copper-based organic sprays for blight. Neem oil.", manures: "Bone meal (for calcium/preventing blossom end rot), Vermicompost, Seaweed extract." },
            { name: "Sugarcane", diseases: "Red Rot, Smut, Shoot Borer, White Fly", solutions: "Set treatment with Trichoderma. Use light traps for borers. Neem formulations for white fly.", manures: "Press mud, Vermicompost, Green manuring with Sesbania." },
            { name: "Maize (Corn)", diseases: "Fall Armyworm, Stalk Rot, Leaf Blight", solutions: "Application of Metarhizium anisopliae. Intercropping with legumes. Neem-based pesticides.", manures: "FYM, Poultry manure, Azospirillum biofertilizer." },
            { name: "Potato", diseases: "Late Blight, Early Blight, Potato Tuber Moth", solutions: "Use healthy seed tubers. Copper fungicides (organic approved). Pheromone traps for moths.", manures: "Well-decomposed FYM, Vermicompost, Wood ash for potassium." },
            { name: "Soybean", diseases: "Yellow Mosaic Virus, Rust, Stem Borer", solutions: "Grow resistant varieties. Yellow sticky traps for whiteflies (virus vectors). Neem seed extract.", manures: "Rhizobium inoculation, FYM, Phosphotica." },
            { name: "Onion", diseases: "Purple Blotch, Thrips, Bulb Rot", solutions: "Crop rotation. Spraying Neem oil + liquid soap for thrips. Proper drainage to prevent rot.", manures: "Vermicompost, Neem cake, Wood ash." },
            { name: "Groundnut (Peanut)", diseases: "Tikka Disease, Rust, White Grub", solutions: "Seed treatment with Trichoderma. Light traps for adult grubs. Neem oil spray.", manures: "Gypsum application, Rhizobium, FYM." },
            { name: "Chilli", diseases: "Leaf Curl Virus, Anthracnose, Fruit Borer, Thrips", solutions: "Yellow sticky traps. Border cropping with tall plants. Spraying of Bt for fruit borer.", manures: "Vermicompost, Sheep/Goat manure, Neem cake." },
            { name: "Mustard", diseases: "White Rust, Aphids, Alternaria Blight", solutions: "Early sowing to avoid aphids. Yellow sticky traps. Neem oil (2%).", manures: "FYM, Azotobacter, Phosphorus solubilizing bacteria (PSB)." },
            { name: "Cabbage", diseases: "Diamondback Moth, Black Rot, Cabbage Butterfly", solutions: "Bt sprays for caterpillars. Intercropping with mustard as trap crop. Neem formulations.", manures: "Heavy application of FYM, Vermicompost, Poultry manure." },
            { name: "Banana", diseases: "Panama Wilt, Bunchy Top, Sigatoka Leaf Spot, Nematodes", solutions: "Plant disease-free suckers. Neem cake application for nematodes. Organic copper sprays.", manures: "FYM, Wood ash (high potassium), Vermicompost, Green leaf manure." },
            
            // 40 New Crops
            { name: "Mango", diseases: "Anthracnose, Powdery Mildew, Mango Hopper, Mealybug", solutions: "Spray neem oil during flowering. Use sticky bands on trunks for mealybugs.", manures: "FYM, Vermicompost, Bone meal, Wood ash." },
            { name: "Apple", diseases: "Apple Scab, Powdery Mildew, Codling Moth, Aphids", solutions: "Dormant oil sprays. Neem extract for aphids. Pheromone traps for moths.", manures: "Well-rotted compost, Fish emulsion, Kelp meal." },
            { name: "Grape", diseases: "Downy Mildew, Powdery Mildew, Mealybugs, Thrips", solutions: "Bordeaux mixture for mildew. Neem oil for thrips. Maintain good canopy airflow.", manures: "Poultry manure, Vermicompost, Potassium-rich organic feeds." },
            { name: "Orange / Citrus", diseases: "Citrus Canker, Gummosis, Citrus Psylla, Aphids", solutions: "Copper-based organic sprays for canker. Neem oil for psylla. Prune infected branches.", manures: "FYM, Neem cake, Seaweed extract." },
            { name: "Lemon", diseases: "Citrus Canker, Leaf Miner, Scab, Mites", solutions: "Neem kernel extract for leaf miners. Sulfur sprays for mites.", manures: "Compost, Bone meal, Vermicompost." },
            { name: "Papaya", diseases: "Papaya Ring Spot Virus, Leaf Curl, Mealybug, Whitefly", solutions: "Control vectors with yellow sticky traps. Spray neem oil. Remove infected plants.", manures: "FYM, Poultry manure, Neem cake." },
            { name: "Watermelon", diseases: "Fusarium Wilt, Powdery Mildew, Aphids, Beetles", solutions: "Crop rotation. Neem oil for aphids. Diatomaceous earth for beetles.", manures: "Compost, Vermicompost, Fish meal." },
            { name: "Cucumber", diseases: "Downy Mildew, Cucumber Beetle, Aphids", solutions: "Spray copper fungicides. Use row covers for beetles. Neem oil.", manures: "Well-rotted FYM, Compost tea, Kelp meal." },
            { name: "Pumpkin", diseases: "Powdery Mildew, Squash Bug, Vine Borer", solutions: "Neem oil for bugs. Wrap stems in foil to prevent vine borers.", manures: "Aged manure, Compost, Bone meal." },
            { name: "Carrot", diseases: "Carrot Rust Fly, Wireworms, Leaf Blight", solutions: "Use floating row covers. Crop rotation. Neem oil for blight.", manures: "Compost (avoid fresh manure), Wood ash for potassium." },
            { name: "Radish", diseases: "Flea Beetles, Root Maggot, Clubroot", solutions: "Diatomaceous earth for flea beetles. Lime soil to prevent clubroot.", manures: "Well-rotted compost, Bone meal." },
            { name: "Beetroot", diseases: "Cercospora Leaf Spot, Aphids, Leaf Miners", solutions: "Neem oil for aphids and miners. Ensure good air circulation.", manures: "Compost, Seaweed extract, Wood ash." },
            { name: "Spinach", diseases: "Downy Mildew, Aphids, Leaf Miners", solutions: "Neem oil. Floating row covers. Adequate plant spacing.", manures: "Nitrogen-rich compost, Blood meal, Vermicompost." },
            { name: "Lettuce", diseases: "Bottom Rot, Aphids, Slugs", solutions: "Beer traps for slugs. Neem oil for aphids. Good drainage.", manures: "Compost, Fish emulsion." },
            { name: "Cauliflower", diseases: "Clubroot, Cabbage Worm, Aphids", solutions: "Bt sprays for worms. Lime soil for clubroot. Neem oil.", manures: "FYM, Vermicompost, Poultry manure." },
            { name: "Broccoli", diseases: "Cabbage Looper, Clubroot, Downy Mildew", solutions: "Bt sprays for caterpillars. Copper fungicides for mildew.", manures: "Compost, Blood meal, Bone meal." },
            { name: "Pea", diseases: "Powdery Mildew, Pea Aphid, Root Rot", solutions: "Neem oil for aphids. Sulfur sprays for mildew. Well-drained soil.", manures: "Compost, Wood ash (avoid high nitrogen)." },
            { name: "Bean", diseases: "Rust, Anthracnose, Aphids, Mexican Bean Beetle", solutions: "Neem oil for beetles and aphids. Copper sprays for rust.", manures: "Compost, Kelp meal." },
            { name: "Chickpea (Gram)", diseases: "Wilt, Blight, Pod Borer", solutions: "Seed treatment with Trichoderma. Bt for pod borer. Pheromone traps.", manures: "FYM, Rhizobium inoculation." },
            { name: "Lentil", diseases: "Wilt, Rust, Aphids", solutions: "Use resistant varieties. Neem oil for aphids. Trichoderma seed treatment.", manures: "Compost, Phosphobacteria." },
            { name: "Pigeon Pea (Tur)", diseases: "Wilt, Sterility Mosaic, Pod Borer", solutions: "Bt spray. Pheromone traps. Crop rotation.", manures: "FYM, Rhizobium, Phosphotica." },
            { name: "Sunflower", diseases: "Alternaria Blight, Rust, Head Borer", solutions: "Neem extract. Copper fungicides. Crop rotation.", manures: "Compost, Vermicompost, Bone meal." },
            { name: "Safflower", diseases: "Alternaria Leaf Spot, Aphids, Wilt", solutions: "Neem oil. Seed treatment with Trichoderma.", manures: "FYM, Compost." },
            { name: "Sesame", diseases: "Phyllody, Leaf Spot, Capsule Borer", solutions: "Remove infected plants (Phyllody). Neem oil for borers.", manures: "Compost, Wood ash." },
            { name: "Castor", diseases: "Seedling Blight, Capsule Borer, Semi-looper", solutions: "Bt formulations for caterpillars. Neem oil.", manures: "FYM, Castor cake." },
            { name: "Linseed (Flax)", diseases: "Rust, Wilt, Bud Fly", solutions: "Neem oil for bud fly. Use resistant varieties for rust.", manures: "Compost, Vermicompost." },
            { name: "Jute", diseases: "Stem Rot, Macrophomina, Bihar Hairy Caterpillar", solutions: "Neem seed kernel extract. Proper drainage.", manures: "FYM, Compost." },
            { name: "Tea", diseases: "Blister Blight, Red Spider Mite, Tea Mosquito Bug", solutions: "Copper fungicides for blight. Neem oil for bugs.", manures: "Compost, Neem cake, Vermicompost." },
            { name: "Coffee", diseases: "Coffee Berry Borer, Coffee Rust, White Stem Borer", solutions: "Bordeaux mixture for rust. Traps for berry borer.", manures: "FYM, Compost, Bone meal." },
            { name: "Rubber", diseases: "Abnormal Leaf Fall, Powdery Mildew, Bark Rot", solutions: "Copper fungicides. Proper tapping hygiene.", manures: "Compost, Rock phosphate, Muriate of potash (organic sources)." },
            { name: "Coconut", diseases: "Bud Rot, Root Wilt, Rhinoceros Beetle, Red Palm Weevil", solutions: "Pheromone traps for beetles. Bordeaux mixture for bud rot.", manures: "Coir pith compost, Neem cake, FYM, Ash." },
            { name: "Arecanut", diseases: "Koleroga (Fruit Rot), Yellow Leaf Disease, Spindle Bug", solutions: "Bordeaux mixture. Neem oil for bugs.", manures: "FYM, Green leaf manure, Compost." },
            { name: "Cashew", diseases: "Tea Mosquito Bug, Stem and Root Borer, Anthracnose", solutions: "Neem oil spray. Remove infested branches.", manures: "Compost, FYM, Vermicompost." },
            { name: "Black Pepper", diseases: "Quick Wilt (Phytophthora), Pollu Beetle, Nematodes", solutions: "Trichoderma enrichment in soil. Neem oil for beetles.", manures: "FYM, Neem cake, Vermicompost." },
            { name: "Cardamom", diseases: "Katte Disease, Capsule Borer, Thrips", solutions: "Neem oil for thrips. Remove virus-infected plants.", manures: "Compost, FYM, Neem cake." },
            { name: "Ginger", diseases: "Rhizome Rot, Shoot Borer, Bacterial Wilt", solutions: "Seed rhizome treatment with Trichoderma. Neem oil.", manures: "FYM, Neem cake, Vermicompost." },
            { name: "Turmeric", diseases: "Rhizome Rot, Leaf Spot, Shoot Borer", solutions: "Trichoderma treatment. Neem oil spray.", manures: "FYM, Vermicompost, Wood ash." },
            { name: "Garlic", diseases: "Purple Blotch, Thrips, Bulb Rot", solutions: "Neem oil. Ensure good drainage.", manures: "Compost, Wood ash, Vermicompost." },
            { name: "Coriander", diseases: "Powdery Mildew, Stem Gall, Aphids", solutions: "Sulfur dust for mildew. Neem oil.", manures: "Compost, FYM." },
            { name: "Cumin", diseases: "Blight, Powdery Mildew, Aphids", solutions: "Neem oil. Organic copper sprays.", manures: "Compost, FYM." },
            { name: "Fenugreek", diseases: "Powdery Mildew, Root Rot, Aphids", solutions: "Trichoderma for root rot. Neem oil.", manures: "Compost, Rhizobium." },
            { name: "Cassava (Tapioca)", diseases: "Cassava Mosaic Disease, Mealybug, Spider Mites", solutions: "Use virus-free planting material. Neem oil for mites.", manures: "FYM, Ash, Compost." },
            { name: "Sweet Potato", diseases: "Sweet Potato Weevil, Vine Borer, Scurf", solutions: "Pheromone traps for weevils. Crop rotation.", manures: "Compost, Wood ash (potassium rich)." },
            { name: "Yam", diseases: "Anthracnose, Nematodes, Scale Insects", solutions: "Neem oil. Clean planting material.", manures: "FYM, Compost." },
            { name: "Taro (Colocasia)", diseases: "Phytophthora Leaf Blight, Aphids, Taro Caterpillar", solutions: "Copper sprays for blight. Neem oil.", manures: "Compost, FYM, Vermicompost." }
        ]
    };
    res.json(data);
});

app.listen(PORT, () => {
    console.log(`BioShield AI Server running on http://localhost:${PORT}`);
});
