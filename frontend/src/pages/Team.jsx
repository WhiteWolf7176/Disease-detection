export default function Team() {
  const teamMembers = [
    {
      name: "Siddesh M",
      photo: "/images/team/Siddesh.jpeg"
    },
    {
      name: "Mohammed Wayiz",
      photo: "/images/team/Wayiz.jpeg"
    },
    {
      name: "Nischit",
      photo: "/images/team/Nischith.jpeg"
    },
    {
      name: "Prajwal",
      photo: "/images/team/Prajwal.jpeg"
    },
  ];

  return (
    <div className="min-h-screen bg-white py-10 px-6 text-center text-gray-800">
      <h1 className="text-3xl font-bold mb-10 text-green-700">👨‍💻 Meet Our Team</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 justify-items-center">
        {teamMembers.map((member, index) => (
          <div key={index} className="bg-white shadow-lg rounded-xl p-6 w-60 hover:shadow-2xl transition-all">
            <img
              src={member.photo}
              alt={member.name}
              className="w-32 h-32 rounded-full mx-auto mb-4 object-cover border-4 border-green-200"
            />
            <h2 className="text-xl font-semibold">{member.name}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}
