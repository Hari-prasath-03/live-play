import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Hero from "./pages/Hero";
import RoomSetup from "./pages/RoomSetup";
import { Toaster } from "react-hot-toast";
import { GameContextProvider } from "./context/GameContext";
import PlayWithAi from "./pages/PlayWithAi";
import TwoPlayerGameBoard from "./pages/TwoPlayerGameBoard";

function App() {
  const routes = createBrowserRouter([
    {
      path: "/",
      element: <Hero />,
    },
    {
      path: "/room",
      element: <RoomSetup />,
    },
    {
      path: "/play-with-ai",
      element: <PlayWithAi />,
    },
    {
      path: "/player-room",
      element: <TwoPlayerGameBoard />,
    }
  ]);
  return (
    <GameContextProvider>
      <Toaster />
      <RouterProvider router={routes} />
    </GameContextProvider>
  );
}

export default App;
