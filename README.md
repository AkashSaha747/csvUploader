# csvUploader
DEPLOYED LINK-
https://csvupload-64juof82j-akashsaha747s-projects.vercel.app
CSV Data Table Viewer
This project is a web application built with React and Chakra UI that allows users to upload a CSV file, view the data in a table format, and interact with the table through features such as pagination, row selection, and column selection. The application also includes error handling for unsupported file formats and empty CSV files.

Features
CSV File Upload: Users can upload a CSV file, and the data will be parsed and displayed in a responsive table.
Dynamic Table Headers: The table headers are generated dynamically based on the columns in the CSV file.
Pagination: The table data is paginated, displaying 20 rows per page. Users can navigate through different pages using pagination controls.
Row Selection: Users can select individual rows using checkboxes for bulk actions.
Column Selection: Users can select an entire column by clicking on the column header.
Error Handling: The app displays error messages for unsupported file formats and empty CSV files.
Loading Spinner: A spinner is displayed while the CSV file is being processed.
Installation
Prerequisites
Node.js
npm (or yarn)
Setup
Clone the repository:

bash
Copy code
git clone https://github.com/AkashSaha747/csvUploader.git
cd csv-data-table-viewer
Install the dependencies:

bash
Copy code
npm install
# or if you're using yarn
yarn install
Install Chakra UI and its icons:


bash
Copy code
npm start
# or if you're using yarn
yarn start
The app will be available at http://localhost:3000.

Usage
Upload a CSV file: Click on the file input area and upload a CSV file. Make sure the file is in the correct format.

Interact with the Table:

Pagination: Use the pagination controls at the bottom of the table to navigate through different pages.
Row Selection: Use the checkboxes next to each row to select individual rows for bulk actions.
Column Selection: Click on any column header to select the entire column.
Error Handling:

If you upload a file that is not a CSV, an error toast notification will appear.
If the CSV file is empty or only contains headers with no data, an error toast notification will appear.


Dependencies
React - A JavaScript library for building user interfaces.
Chakra UI - A simple, modular, and accessible component library for React.
PapaParse - A powerful CSV parser for JavaScript.
@chakra-ui/icons - Chakra UI icons package.

Acknowledgements
Vara.eco thaks for the opportunity to showcase my skills.
Thanks to the creators of Chakra UI and PapaParse for their amazing tools.

