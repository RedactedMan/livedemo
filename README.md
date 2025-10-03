# LSEG St. Louis Technology Unconference 2025

A modern, responsive website for the LSEG St. Louis Technology Unconference taking place on Friday, October 3rd, 2025.

## Overview

This website provides information about the unconference event, including the full day schedule, technical session descriptions, and an interactive voting system for attendees to vote on their favorite presentations.

## Features

- **Event Schedule**: Complete day schedule showing all events across three rooms (Training Room, Board Room, and Cozy Corner)
- **Session Listings**: Detailed descriptions of all 10 technical sessions with presenter information
- **Interactive Voting**: Attendees can vote for sessions in three categories:
  - Most Scary
  - Most Work Related
  - Most Audience Engagement
- **Real-time Results**: Live voting results displayed with vote counts
- **Responsive Design**: Mobile-friendly layout that works on all devices
- **LSEG Branding**: Adheres to official LSEG brand guidelines with proper colors and typography

## Technical Sessions

The unconference features 10 diverse technical sessions covering topics including:
- Code Sanitizers
- Ethical Considerations of GenAI
- Vibe Coding
- Privatizing Your Life
- Evolution of an App
- Developer Success
- Photo Editing Using Lightroom and Photoshop
- The AI Web Stack: From Zero to Hosted
- Secure Coding Standards for C++
- Agentic AI: An Architectural Framework

## Technology Stack

- **HTML5**: Semantic markup for content structure
- **CSS3**: Custom styling with LSEG brand colors (#001EFF blue, #262626 dark gray)
- **JavaScript**: Vanilla JS for voting functionality
- **LocalStorage**: Client-side vote persistence

## Usage

### Running Locally

1. Start a local HTTP server:
   ```bash
   python3 -m http.server 8000
   ```

2. Open your browser and navigate to:
   ```
   http://localhost:8000
   ```

### Voting System

- Each attendee can vote once per category
- Clicking a different session in the same category will change your vote
- Votes are saved locally and persist across page refreshes
- Results update in real-time

## Brand Compliance

This website follows LSEG's official brand guidelines:
- **Colors**: LSEG Blue (#001EFF), Mine Shaft Dark Gray (#262626), White (#FFFFFF)
- **Typography**: LSEG Motto (headings), Proxima Nova (body text)
- **Design**: Clean, professional appearance with consistent branding

## Files

- `index.html` - Main HTML structure
- `styles.css` - All styling and responsive design
- `voting.js` - Voting system logic and results management
- `README.md` - This file

## License

© 2025 LSEG St. Louis Technology Unconference
