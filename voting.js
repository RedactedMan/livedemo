// Voting system for LSEG Unconference
const votes = {
    scary: {},
    work: {},
    engagement: {}
};

const sessionNames = {
    'code-sanitizers': 'Code Sanitizers',
    'ethical-genai': 'Ethical Considerations of GenAI',
    'vibe-coding': 'Vibe Coding',
    'privatizing-life': 'Privatizing Your Life',
    'evolution-app': 'Evolution of an App',
    'developer-success': 'Developer Success',
    'photo-editing': 'Photo Editing',
    'ai-web-stack': 'The AI Web Stack',
    'secure-cpp': 'Secure Coding Standards for C++',
    'agentic-ai': 'Agentic AI'
};

// Track user votes (one per category)
const userVotes = {
    scary: null,
    work: null,
    engagement: null
};

// Initialize votes
Object.keys(sessionNames).forEach(session => {
    votes.scary[session] = 0;
    votes.work[session] = 0;
    votes.engagement[session] = 0;
});

// Load votes from localStorage
function loadVotes() {
    const savedVotes = localStorage.getItem('unconferenceVotes');
    const savedUserVotes = localStorage.getItem('unconferenceUserVotes');

    if (savedVotes) {
        Object.assign(votes, JSON.parse(savedVotes));
    }

    if (savedUserVotes) {
        Object.assign(userVotes, JSON.parse(savedUserVotes));
    }
}

// Save votes to localStorage
function saveVotes() {
    localStorage.setItem('unconferenceVotes', JSON.stringify(votes));
    localStorage.setItem('unconferenceUserVotes', JSON.stringify(userVotes));
}

// Handle vote button click
function handleVote(event) {
    const button = event.target;
    const category = button.dataset.category;
    const sessionCard = button.closest('.session-card');
    const sessionId = sessionCard.dataset.session;

    // Remove previous vote in this category if exists
    if (userVotes[category]) {
        votes[category][userVotes[category]]--;

        // Remove voted class from previous button
        const prevCard = document.querySelector(`[data-session="${userVotes[category]}"]`);
        if (prevCard) {
            const prevButton = prevCard.querySelector(`[data-category="${category}"]`);
            if (prevButton) {
                prevButton.classList.remove('voted');
            }
        }
    }

    // Add new vote
    votes[category][sessionId]++;
    userVotes[category] = sessionId;
    button.classList.add('voted');

    // Save votes
    saveVotes();

    // Update results display
    updateResults();
}

// Update voting results display
function updateResults() {
    updateCategoryResults('scary', 'scary-results');
    updateCategoryResults('work', 'work-results');
    updateCategoryResults('engagement', 'engagement-results');
}

function updateCategoryResults(category, elementId) {
    const resultsDiv = document.getElementById(elementId);

    // Sort sessions by vote count
    const sortedSessions = Object.entries(votes[category])
        .sort((a, b) => b[1] - a[1])
        .filter(([_, count]) => count > 0);

    if (sortedSessions.length === 0) {
        resultsDiv.innerHTML = '<p style="text-align: center; color: #999; padding: 2rem;">No votes yet</p>';
        return;
    }

    resultsDiv.innerHTML = sortedSessions
        .map(([sessionId, count]) => `
            <div class="result-item">
                <span class="result-name">${sessionNames[sessionId]}</span>
                <span class="result-votes">${count} vote${count !== 1 ? 's' : ''}</span>
            </div>
        `)
        .join('');
}

// Restore voted state on page load
function restoreVotedState() {
    Object.entries(userVotes).forEach(([category, sessionId]) => {
        if (sessionId) {
            const card = document.querySelector(`[data-session="${sessionId}"]`);
            if (card) {
                const button = card.querySelector(`[data-category="${category}"]`);
                if (button) {
                    button.classList.add('voted');
                }
            }
        }
    });
}

// Initialize voting system
document.addEventListener('DOMContentLoaded', () => {
    // Load saved votes
    loadVotes();

    // Add click handlers to all vote buttons
    document.querySelectorAll('.vote-btn').forEach(button => {
        button.addEventListener('click', handleVote);
    });

    // Restore voted button states
    restoreVotedState();

    // Update results display
    updateResults();
});
