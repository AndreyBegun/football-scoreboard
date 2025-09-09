## Project Notes & Assumptions

- This is a football scoreboard app built with **React**, **TypeScript**, and **Vite**.
- All match data is managed in-memory using React state (no backend/API).
- TypeScript interfaces are used for type safety across components and hooks.
- Jest and React Testing Library are set up for unit testing.
- CSS and assets are handled via Vite; ensure Jest config maps CSS/assets for tests.
- Component and file naming should be consistent (e.g., `MatchInProgress`).

---

## How to Start the Project

1. **Install dependencies:**

```sh
npm install
```

2. **Start the development server:**

```sh
npm run dev
```

3. **Run tests:**

```sh
npm test
```

---

## How to Use the UI

- **Add a Match:** Use the form to enter home and away teams, then start a new match.
- **Update Scores:** Change the score for each team using the input fields in the match list.
- **Finish Match:** Click the "Finish" button to remove a match from the scoreboard.
- **Summary:** The match list is sorted by total score, then by most recent start time.

---

## Additional Notes

- If you encounter Jest errors with TypeScript/JSX, check your Jest and Babel config for correct transformers and module mappings.
- For production, consider persisting match data to a backend or local storage.

---
