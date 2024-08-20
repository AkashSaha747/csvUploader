import { useState } from "react";
import Papa from "papaparse";
import {
  Box,
  Button,
  Checkbox,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  useToast,
  Input,
  Spinner,
  Center,
  HStack,
  Text,
  IconButton,
} from "@chakra-ui/react";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
} from "@chakra-ui/icons";

function App() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(20);
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectedColumns, setSelectedColumns] = useState([]);
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const handleFileUpload = (e) => {
    const file = e.target.files[0];

    if (file && file.type === "text/csv") {
      setLoading(true);
      Papa.parse(file, {
        header: true,
        complete: (results) => {
          setLoading(false);

          // Empty checked
          if (
            results.data.length === 0 ||
            (results.data.length === 1 &&
              Object.keys(results.data[0]).every(
                (key) => !results.data[0][key]
              ))
          ) {
            toast({
              title: "Error",
              description: "The CSV file is empty.",
              status: "error",
              duration: 5000,
              isClosable: true,
            });
            return;
          }

          setData(results.data);
          setCurrentPage(1);
          setSelectedRows([]);
          setSelectedColumns([]);

          toast({
            title: "Success",
            description: "CSV file uploaded successfully.",
            status: "success",
            duration: 5000,
            isClosable: true,
          });
        },
        error: () => {
          setLoading(false);
          toast({
            title: "Error",
            description: "Failed to parse the CSV file.",
            status: "error",
            duration: 5000,
            isClosable: true,
          });
        },
      });
    } else {
      toast({
        title: "Error",
        description: "Please upload a valid CSV file.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  // Pagination logic
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = data.slice(indexOfFirstRow, indexOfLastRow);

  const totalPages = Math.ceil(data.length / rowsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleFirstPage = () => {
    setCurrentPage(1);
  };

  const handleLastPage = () => {
    setCurrentPage(totalPages);
  };

  // Handle row selection
  const handleRowSelect = (index) => {
    setSelectedRows((prevSelectedRows) =>
      prevSelectedRows.includes(index)
        ? prevSelectedRows.filter((i) => i !== index)
        : [...prevSelectedRows, index]
    );
  };

  // Handle column selection
  const handleColumnSelect = (header) => {
    setSelectedColumns((prevSelectedColumns) =>
      prevSelectedColumns.includes(header)
        ? prevSelectedColumns.filter((col) => col !== header)
        : [...prevSelectedColumns, header]
    );
  };

  // Get the headers dynamically
  const headers = data.length > 0 ? Object.keys(data[0]) : [];

  return (
    <Box className="App" p={4} h={"100vh"}>
      <Input
        h="10vh"
        w="100%"
        maxW="500px"
        type="file"
        accept=".csv"
        onChange={handleFileUpload}
        p={4}
        bg="teal.500"
        color="white"
        borderRadius="md"
        _hover={{ bg: "teal.600", cursor: "pointer" }}
        _focus={{ boxShadow: "outline" }}
        _active={{ bg: "teal.700" }}
      />

      {loading ? (
        <Center mt={4}>
          <Spinner size="xl" color="teal.500" />
        </Center>
      ) : (
        <>
          {data.length ? (
            <TableContainer maxWidth="100%" overflowX="auto" mt={4}>
              <Table variant="striped" size="sm">
                <Thead>
                  <Tr>
                    <Th>
                      <Checkbox
                        isChecked={selectedRows.length === currentRows.length}
                        onChange={() => {
                          if (selectedRows.length === currentRows.length) {
                            setSelectedRows([]);
                          } else {
                            setSelectedRows(
                              currentRows.map((_, index) => index)
                            );
                          }
                        }}
                      />
                    </Th>
                    {headers.map((header, index) => (
                      <Th
                        key={index}
                        onClick={() => handleColumnSelect(header)}
                        cursor="pointer"
                        bg={
                          selectedColumns.includes(header)
                            ? "gray.200"
                            : "white"
                        }
                      >
                        {header}
                      </Th>
                    ))}
                  </Tr>
                </Thead>
                <Tbody>
                  {currentRows.map((row, rowIndex) => (
                    <Tr key={rowIndex}>
                      <Td>
                        <Checkbox
                          isChecked={selectedRows.includes(rowIndex)}
                          onChange={() => handleRowSelect(rowIndex)}
                        />
                      </Td>
                      {headers.map((header, colIndex) => (
                        <Td key={colIndex}>{row[header]}</Td>
                      ))}
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </TableContainer>
          ) : null}

          {data.length > rowsPerPage && (
            <HStack h={"10vh"} mt={4} justifyContent="center">
              <Text>
                Page {currentPage} of {totalPages}
              </Text>
              <HStack spacing={2}>
                <IconButton
                  icon={<ArrowLeftIcon />}
                  onClick={handleFirstPage}
                  isDisabled={currentPage === 1}
                  aria-label="First Page"
                />
                <IconButton
                  icon={<ChevronLeftIcon />}
                  onClick={handlePrevPage}
                  isDisabled={currentPage === 1}
                  aria-label="Previous Page"
                />
                <IconButton
                  icon={<ChevronRightIcon />}
                  onClick={handleNextPage}
                  isDisabled={currentPage === totalPages}
                  aria-label="Next Page"
                />
                <IconButton
                  icon={<ArrowRightIcon />}
                  onClick={handleLastPage}
                  isDisabled={currentPage === totalPages}
                  aria-label="Last Page"
                />
              </HStack>
            </HStack>
          )}
        </>
      )}
    </Box>
  );
}

export default App;
