import AuthContextProvider from "./contexts/auth-context";
import { Nav } from "./components/Nav";

function App() {
  return (
    <AuthContextProvider>
      <Nav />
    </AuthContextProvider>
  );
}

export default App;

// const styles = StyleSheet.create({});
