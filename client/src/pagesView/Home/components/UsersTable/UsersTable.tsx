interface UsersTable {
  data: {
    id: string;
    firstName: string;
    age: number;
  }[];
}

const UsersTable = ({ data }: UsersTable) => (
  <table className="w-full max-w-[600px]">
    <thead>
      <tr className="border-b border-black p-4">
        <th className="w-14 text-start p-2.5">ID</th>
        <th className="text-start p-2.5">Name</th>
        <th className="text-start p-2.5">Age</th>
      </tr>
    </thead>
    <tbody>
      {data?.map(({ id, firstName, age }) => (
        <tr className="w-full" key={id}>
          <td className="p-2.5">{id}</td>
          <td className="p-2.5">{firstName}</td>
          <td className="p-2.5">{age}</td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default UsersTable;
