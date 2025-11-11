import React, { useState } from "react";

const PLANT_EXAMPLES = {
  arecanut: [
    { name: "Healthy Trunk", img: "/images/healthy-trunk.jpg" }, // Use your existing images
    { name: "Stem Bleeding", img: "/images/stem.jpeg" },
    { name: "Yellow Leaf", img: "/images/yellow.jpg" },
    { name: "Mahali (Koleroga)", img: "/images/mahali.jpg" },
  ],
  coconut: [
    // TODO: Add your coconut example images to /public/images/
    { name: "Caterpillar Damage", img: "https://placehold.co/150x150/F1F8E9/2E7D32?text=Caterpillar" },
    { name: "Wilt (Yellowing)", img: "https://placehold.co/150x150/F1F8E9/2E7D32?text=Wilt" },
    { name: "Healthy Coconut", img: "https://placehold.co/150x150/F1F8E9/2E7D32?text=Healthy" },
    { name: "Bud Rot", img: "https://placehold.co/150x150/F1F8E9/2E7D32?text=Bud+Rot" },
  ]
};

function IdentifyPage() {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null); // <-- NEW: For image preview
  const [cropType, setCropType] = useState("arecanut"); // Default to arecanut
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null); // <-- NEW: For handling errors
  const [loading, setLoading] = useState(false); // <-- NEW: Loading state

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file)); // Create preview URL
    }
    setResult(null); // Reset result
    setError(null); // Reset error
  };

  const handleSubmit = async () => {
    if (!image) {
      setError("Please upload an image first.");
      return;
    }

    setLoading(true); // Start loading
    setError(null);
    setResult(null);

    const formData = new FormData();
    formData.append("image", image);
    formData.append("cropType", cropType); // cropType is now dynamic!

    try {
      const res = await fetch("http://127.0.0.1:5000/predict", {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) {
        // Handle server errors (e.g., 500)
        throw new Error(`Server error: ${res.statusText}`);
      }

      const data = await res.json();
      setResult(data);

    } catch (err) {
      console.error(err);
      setError("Prediction failed. Please try again.");
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className="max-w-7xl mx-auto py-12 px-6">

      {/* --- Language Selector --- */}
      <div className="text-right mb-6">
        <select className="border rounded p-2 shadow-sm">
          <option>Select Language</option>
          <option>English</option>
          <option>Kannada</option>
          <option>Hindi</option>
        </select>
      </div>

      {/* --- MODIFICATION 1: Plant Type Selector --- */}
      {/* This layout is cleaner and replaces the one in your screenshot.
          It puts the buttons side-by-side in one group. */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">1. Select Plant Type</h2>
        <div className="flex flex-col sm:flex-row gap-4 p-2 bg-gray-100 rounded-lg">
          {/* Arecanut Button */}
          <button
            onClick={() => setCropType("arecanut")}
            className={`flex-1 p-4 rounded-md text-center font-bold text-xl transition duration-200
              ${cropType === 'arecanut'
                ? 'bg-green-600 text-white shadow-lg'
                : 'bg-white text-gray-700 hover:bg-gray-50'}
            `}
          >
            Arecanut
          </button>

          {/* Coconut Button */}
          <button
            onClick={() => setCropType("coconut")}
            className={`flex-1 p-4 rounded-md text-center font-bold text-xl transition duration-200
              ${cropType === 'coconut'
                ? 'bg-green-600 text-white shadow-lg'
                : 'bg-white text-gray-700 hover:bg-gray-50'}
            `}
          >
            Coconut
          </button>
        </div>
      </div>

      {/* --- NEW: Two-Column Layout --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

        {/* --- COLUMN 1: UPLOAD --- */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">2. Upload Image</h2>
          <div className="flex flex-col items-center">

            {/* --- MODIFICATION 2: Uploader Box Text --- */}
            <label
              htmlFor="upload"
              className="border-2 border-dashed border-gray-400 p-6 w-full h-64 flex flex-col items-center justify-center rounded-lg cursor-pointer text-gray-500 text-center hover:bg-gray-50"
            >
              {preview ? (
                <img src={preview} alt="Preview" className="max-h-full max-w-full object-contain rounded" />
              ) : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16v-4m0 0V7a4 4 0 118 0v5m0 0v4m-4-4h.01" />
                  </svg>
                  {/* This text is now dynamic! */}
                  <p className="font-semibold">Capture or Select</p>
                  <p className="text-xl font-bold text-green-700">
                    {cropType === 'arecanut' ? 'Arecanut Image' : 'Coconut Image'}
                  </p>
                </>
              )}
            </label>
            <input
              type="file"
              id="upload"
              accept="image/*"
              capture="environment"
              onChange={handleImageChange}
              className="hidden"
            />

            <button
              onClick={handleSubmit}
              disabled={loading || !image}
              className="mt-6 w-full bg-green-600 text-white px-6 py-3 rounded-lg text-lg font-bold hover:bg-green-700 disabled:bg-gray-400"
            >
              {loading ? "Classifying..." : "Classify"}
            </button>
          </div>
        </div>

        {/* --- COLUMN 2: RESULT --- */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">3. Get Result</h2>

          {/* NEW: Error Message */}
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-6">
              <strong className="font-bold">Error: </strong>
              <span className="block sm:inline">{error}</span>
            </div>
          )}

          {/* Classification Result (Your existing code) */}
          {result && (
            <div className="bg-gray-50 p-6 rounded-lg shadow-md w-full">
              {/* Image moved to the preview, but we can keep it here too */}
              <img
                src={URL.createObjectURL(image)}
                alt="Uploaded"
                className="w-full h-48 rounded-lg mx-auto mb-4 object-cover border"
              />
              <p className="text-2xl font-bold text-green-700 text-center mb-4">
                {result.disease}
              </p>
              <table className="w-full text-sm border border-gray-300">
                <thead className="bg-green-600 text-white">
                  <tr>
                    <th className="p-2 border-r">Class</th>
                    <th className="p-2">Probability</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(result.scores).map(([label, score]) => (
                    <tr key={label} className="bg-white even:bg-gray-50">
                      <td className="border px-3 py-2 font-medium">{label}</td>
                      <td className="border px-3 py-2 text-right">{(score * 100).toFixed(2)}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Placeholder for when there is no result */}
          {!result && !loading && !error && (
            <div className="border-2 border-dashed border-gray-400 p-6 w-full h-64 flex items-center justify-center rounded-lg text-gray-500">
              <p>Your diagnosis will appear here.</p>
            </div>
          )}

          {/* Loading Spinner */}
          {loading && (
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-green-600"></div>
            </div>
          )}
          
        </div>
      </div>
      {/* --- MODIFICATION 3: NEW Example Gallery --- */}
          {/* We add this *after* the two-column grid */}
          <div className="mt-16">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">
              Common Examples: <span className="text-green-700 font-bold capitalize">{cropType}</span>
            </h2>
            {/* This div handles horizontal scrolling on all screen sizes */}
            <div className="flex overflow-x-auto gap-4 pb-4">
              {/* We dynamically get the correct list of examples */}
              {PLANT_EXAMPLES[cropType].map((example) => (
                <div key={example.name} className="flex-shrink-0 w-48 bg-white rounded-lg shadow-md">
                  <img
                    src={example.img}
                    alt={example.name}
                    className="w-full h-32 object-cover rounded-t-lg"
                  />
                  <div className="p-3 text-center">
                    <p className="font-semibold text-sm text-gray-800">{example.name}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

    </div>
  );
}

export default IdentifyPage;
