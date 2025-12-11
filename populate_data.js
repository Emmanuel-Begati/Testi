const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, 'data', 'testimonies.json');

const firstNames = [
    "Sarah", "John", "Michael", "Emily", "David", "Jessica", "James", "Jennifer",
    "Robert", "Lisa", "William", "Elizabeth", "Joseph", "Maria", "Charles", "Susan",
    "Thomas", "Margaret", "Daniel", "Patricia", "Matthew", "Dorothy", "Anthony", "Helen",
    "Christopher", "Nancy", "Mark", "Karen", "Paul", "Betty", "Steven", "Sandra",
    "George", "Ashley", "Kenneth", "Kimberly", "Andrew", "Donna", "Edward", "Carol",
    "Joshua", "Ruth", "Brian", "Sharon", "Kevin", "Michelle", "Ronald", "Laura",
    "Jason", "Sarah", "Timothy", "Rebecca", "Jeffrey", "Deborah", "Ryan", "Stephanie"
];

const lastNames = [
    "Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis",
    "Rodriguez", "Martinez", "Hernandez", "Lopez", "Gonzalez", "Wilson", "Anderson", "Thomas",
    "Taylor", "Moore", "Jackson", "Martin", "Lee", "Perez", "Thompson", "White",
    "Harris", "Sanchez", "Clark", "Ramirez", "Lewis", "Robinson", "Walker", "Young",
    "Allen", "King", "Wright", "Scott", "Torres", "Nguyen", "Hill", "Flores",
    "Green", "Adams", "Nelson", "Baker", "Hall", "Rivera", "Campbell", "Mitchell"
];

const subjects = [
    "God provided a new job miraculously",
    "Healed my chronic back pain",
    "Given me peace during final exams",
    "Restored a broken marriage",
    "Blessed us with a beautiful new home",
    "Protected me from a car accident",
    "Answered my prayers for my children",
    "Provided financial breakthrough for rent",
    "Gave me strength in grieving",
    "Showed me His love through a stranger",
    "Freedom from addiction",
    "Found lost community",
    "Guidance in career direction",
    "Improvement in health reports",
    "Safety during the storm",
    "Reconciliation with my father",
    "Provision for tuition fees",
    "New opportunities at work",
    "Healing from anxiety",
    "A supportive church family"
];

const openings = [
    "I just want to thank God for His goodness.",
    "This year has been tough, but God is faithful.",
    "I am overwhelmed by His grace.",
    "Words cannot express my gratitude.",
    "I came into this year with doubt, but leave with faith.",
    "God surely listens to prayers.",
    "I wanted to share this testimony to encourage someone.",
    "The Lord has been my rock.",
    "Just a quick praise report!",
    "Miracles still happen today."
];

const details = [
    "I didn't know how things would work out, but He made a way.",
    "Unexpectedly, everything fell into place perfectly.",
    "After months of praying, the answer finally came.",
    "It was truly a moment only God could orchestrate.",
    "My family and I have seen His hand moving.",
    "I felt His presence so strongly in the mist of it all.",
    "He provided exactly what I needed at the right time.",
    "I learned to trust Him more through this process.",
    "Every door that was closed suddenly opened.",
    "It was a reminder that He is always in control."
];

const closings = [
    "To God be the glory!",
    "Praise the Lord forever.",
    "He is so good to me.",
    "Thank you Jesus!",
    "May His name be praised.",
    "God is good, all the time.",
    "I will never stop praising Him.",
    "Blessed be His holy name.",
    "Amen!",
    "Hallelujah!"
];

function getRandomItem(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

function generateTestimony(id) {
    const firstName = getRandomItem(firstNames);
    const lastName = getRandomItem(lastNames);
    const subject = getRandomItem(subjects);
    const opening = getRandomItem(openings);
    const detail = getRandomItem(details);
    const closing = getRandomItem(closings);

    return {
        id: Date.now().toString() + Math.floor(Math.random() * 10000) + id,
        name: `${firstName} ${lastName}`,
        text: `${subject}. ${opening} ${detail} ${closing}`,
        timestamp: new Date().toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit',
            second: '2-digit',
            hour12: true
        })
    };
}

const currentData = [];
// Generate 50 items
for (let i = 0; i < 50; i++) {
    currentData.push(generateTestimony(i));
}

// Ensure directory exists
const dir = path.dirname(DATA_FILE);
if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
}

fs.writeFileSync(DATA_FILE, JSON.stringify(currentData, null, 2));
console.log('✅ Successfully generated 50 unique diverse testimonies!');
