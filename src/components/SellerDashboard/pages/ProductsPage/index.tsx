import TableThree from "../../components/Tables/TableThree";

const packageData1 = [
  {
    name: "Free package",
    price: 0.0,
    invoiceDate: `Jan 13, 2023`,
    status: "Paid",
  },
  {
    name: "Standard Package",
    price: 59.0,
    invoiceDate: `Jan 13, 2023`,
    status: "Paid",
  },
  // Add other items
];

const ProductsListPage = () => {
  const handleReload = () => {
    console.log("Reload clicked");
    // Implement reload logic
  };

  const handleImport = () => {
    console.log("Import clicked");
    // Implement import logic
  };

  const handleExport = () => {
    console.log("Export clicked");
    // Implement export logic
  };

  return (
    <div>
      <TableThree
        data={packageData1}
        headers={[
          "ID",
          "Logo",
          "Name",
          "Earningis",
          "Products Count",
          "Vendor",
          "Created At",
          "Operations",
        ]} // Custom headers
        createLink="/admin/ecommerce/products/create"
        onReload={handleReload}
        onImport={handleImport}
        onExport={handleExport}
      />
    </div>
  );
};
export default ProductsListPage;
