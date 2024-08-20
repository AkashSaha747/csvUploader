import { ChakraProvider } from "@chakra-ui/react";
import CsvUploader from "./Components/CsvUploader";
function App() {
  return (
    <ChakraProvider>
      <CsvUploader></CsvUploader>
    </ChakraProvider>
  );
}

export default App;
