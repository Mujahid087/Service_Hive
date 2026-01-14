import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCreateGigMutation } from "../redux/slices/api/gigSlice";

const CreateGig = () => {
  const navigate = useNavigate();
  const [createGig, { isLoading }] = useCreateGigMutation();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [budget, setBudget] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      await createGig({ title, description, budget }).unwrap();
      navigate("/my-gigs"); // redirect after creation
    } catch (error) {
      alert(error?.data?.message || "Failed to create gig");
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white rounded-lg shadow p-6">
      <h1 className="text-2xl font-semibold mb-6">
        Create New Job
      </h1>

      <form onSubmit={submitHandler} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">
            Job Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border rounded px-3 py-2"
            placeholder="e.g. Build a MERN dashboard"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border rounded px-3 py-2"
            rows="4"
            placeholder="Explain the job requirements..."
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Budget (₹)
          </label>
          <input
            type="number"
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            className="w-full border rounded px-3 py-2"
            placeholder="e.g. 5000"
            required
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 disabled:opacity-50"
        >
          {isLoading ? "Creating..." : "Create Job"}
        </button>
      </form>
    </div>
  );
};

export default CreateGig;
