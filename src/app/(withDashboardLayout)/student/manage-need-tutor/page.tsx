import { Button } from "@/components/ui/button";

const TableComponent = () => {
  const data=[
    { id: 1, heading: "Product A", priceRange: "$10 - $20" },
    { id: 2, heading: "Product B", priceRange: "$15 - $25" },
    { id: 3, heading: "Product C", priceRange: "$20 - $30" },
  ];

 

  return (
    <div className="overflow-x-auto rounded-2xl border border-gray-30">
      <table className="min-w-full border border-gray-300 bg-white rounded-3xl">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-3 text-left">Heading</th>
            <th className="border p-3 text-left">Price-Range</th>
            <th className="border p-3 text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id} className="border">
              <td className="border p-3">{item.heading}</td>
              <td className="border p-3">{item.priceRange}</td>
              <td className="border p-3 text-center">
                <Button
                variant={"outline"}
                 
                  className="  px-3 py-1 rounded-full "
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableComponent;
