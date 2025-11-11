// This file will hold all the info for the "Care" page.
// We're co-locating all the data here for easy management.

// We can re-use the display names map you already created.
const DISPLAY_NAMES = {
    // Arecanut Classes
    'stem cracking': 'Stem Cracking',
    'Stem_bleeding': 'Stem Bleeding',
    'Healthy_Leaf': 'Healthy',
    'yellow leaf disease': 'Yellow Leaf Disease',
    'healthy_foot': 'Healthy Foot',
    'Healthy_Trunk': 'Healthy Trunk',
    'Mahali_Koleroga': 'Mahali (Koleroga)',
    'bud borer': 'Bud Borer (Pest)',
    'Healthy_Nut': 'Healthy Nut',
  
    // Coconut Classes
    'CCI_Caterpillars': 'Caterpillar Infestation',
    'CCI_Leaflets': 'Caterpillar Leaf Damage',
    'Healthy_Leaves': 'Healthy',
    'WCLWD_DryingOfLeaflets': 'Wilt Disease (Leaf Drying)',
    'WCLWD_Flaccidity': 'Wilt Disease (Drooping)',
    'WCLWD_Yellowing': 'Wilt Disease (Yellowing)'
};

// Helper function to get the display name
const getDisplayName = (rawName) => DISPLAY_NAMES[rawName] || rawName;

// --- MASTER CARE DATA ---
// NOTE: I've added placeholder info. You should update this with real information.
export const CARE_DATA = [
    // --- ARECANUT DISEASES ---
    {
        id: 'areca_1',
        type: 'arecanut',
        name: getDisplayName('yellow leaf disease'),
        img: '/images/yellow.jpg', // Use your existing images
        about: 'Caused by a phytoplasma, transmitted by plant hoppers. It leads to yellowing and drooping of leaves.',
        treatment: 'Remove and destroy affected palms. Control plant hopper vectors using recommended insecticides.'
    },
    {
        id: 'areca_2',
        type: 'arecanut',
        name: getDisplayName('Stem_bleeding'),
        img: '/images/stem.jpeg',
        about: 'A fungal disease where a reddish-brown liquid oozes from cracks in the stem, leading to decay.',
        treatment: 'Chisel out the affected tissue and apply a wound dressing like Bordeaux paste or coal tar.'
    },
    {
        id: 'areca_3',
        type: 'arecanut',
        name: getDisplayName('Mahali_Koleroga'),
        img: '/images/mahali.jpg',
        about: 'Also known as fruit rot, this fungal disease causes rotting and dropping of immature nuts during the monsoon.',
        treatment: 'Spray 1% Bordeaux mixture on bunches just before the onset of the monsoon and repeat 2-3 times.'
    },

    // --- COCONUT DISEASES ---
    {
        id: 'coco_1',
        type: 'coconut',
        name: getDisplayName('CCI_Caterpillars'),
        img: 'https://placehold.co/300x200/F1F8E9/2E7D32?text=Caterpillar', // Use your coconut images
        about: 'The coconut black-headed caterpillar is a serious pest that feeds on the green tissues of the leaves.',
        treatment: 'Release parasitic wasps (e.g., Goniozus nephantidis) which are natural enemies. Remove and burn severely infested leaves.'
    },
    {
        id: 'coco_2',
        type: 'coconut',
        name: getDisplayName('WCLWD_Yellowing'),
        img: 'https://placehold.co/300x200/F1F8E9/2E7D32?text=Wilt+(Yellow)',
        about: 'Root (wilt) disease is a complex, debilitating disease. It causes yellowing, drooping, and a reduction in nut yield.',
        treatment: 'There is no cure. Focus on integrated management: apply balanced nutrition, manage soil health, and plant resistant varieties.'
    },
    {
        id: 'coco_3',
        type: 'coconut',
        name: getDisplayName('WCLWD_Flaccidity'),
        img: 'https://placehold.co/300x200/F1F8E9/2E7D32?text=Wilt+(Drooping)',
        about: 'A key symptom of Root (wilt) disease where leaves lose turgidity, droop, and bend, starting from the outer whorls.',
        treatment: 'Manage soil moisture and nutrients. Remove severely affected palms that are beyond recovery.'
    },
    // ... Add all your other diseases here
];