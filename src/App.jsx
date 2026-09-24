import AppFrame from "./components/AppFrame.jsx";
import { useFlow } from "./flow.jsx";
import { SCREENS } from "./screens/index.js";

export default function App() {
  const { step } = useFlow();
  const Screen = SCREENS[step];
  return (
    <AppFrame>
      <Screen />
    </AppFrame>
  );
}
