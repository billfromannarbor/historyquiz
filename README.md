# OtherKitten Lost In Time

## Overview

OtherKitten Lost In Time is a history quiz game where players navigate through crucial moments in history, solving puzzles to restore the timeline. The game features a mysterious cat, OtherKitten, who appears in each era to guide or challenge the player.

## Project Organization

- **index.html**: The main HTML file that combines the landing page and game interface.
- **styles.css**: Contains the styling for the game, ensuring a responsive and visually appealing design.
- **game.js**: The JavaScript file that handles game logic, including question display, scoring, and game flow.
- **segments.json**: A JSON file that contains all the historical segments and questions.
- **combineSegments.js**: A Node.js script to combine individual segment JSON files into `segments.json`.
- **segments/**: Directory containing individual segment JSON files (e.g., `segment1.json`, `segment10.json`).
- **images/**: Directory containing images used in the game, including the favicon and segment images.
- **specification.md**: A document detailing the game's specifications and requirements.

## Getting Started

To run the game locally, you'll need to set up a simple HTTP server. Follow these steps:

### Prerequisites

- **Node.js**: Ensure you have Node.js installed on your machine. You can download it from [nodejs.org](https://nodejs.org/).

### Installation

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/yourusername/otherkitten-lost-in-time.git
   cd otherkitten-lost-in-time
   ```

2. **Install http-server**:
   Use npm to install `http-server` globally:
   ```bash
   npm install -g http-server
   ```

### Running the Game

1. **Start the Server**:
   In the project directory, run:
   ```bash
   http-server
   ```

2. **Open the Game**:
   Open your web browser and go to `http://localhost:8080` to start playing OtherKitten Lost In Time.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
